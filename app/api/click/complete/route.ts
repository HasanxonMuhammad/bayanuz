import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase-admin";
import {
  ClickError,
  expiryFor,
  parseMerchantTransId,
  readWebhook,
  verifyCompleteSign,
} from "@/lib/click";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/// Click "Complete" webhook'i. To'lov haqiqatan amalga oshganidan keyin Click
/// shu URL'ga chaqirib bizga bildiradi.
///
/// 1) `sign_string`ni tekshiramiz (Complete formulasi).
/// 2) `clickTransactions/{click_trans_id}` ni topamiz (prepare bosqichida yozilgan).
/// 3) Subscription bo'lsa — `users/{uid}.premium`ni faollashtiramiz.
///    Donation bo'lsa — `donations` collection'ga yozamiz.
/// 4) Idempotent: ikkinchi marta kelsa, eski natija qaytadi.
///
/// Click webhook'ni GET (URL params) yoki POST (form data) bilan yuborishi
/// mumkin — ikkalasi ham bir xil ishlanadi.
export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}

async function handle(req: NextRequest) {
  const secret = process.env.CLICK_SECRET_KEY;
  const serviceId = process.env.CLICK_SERVICE_ID ?? "104874";
  if (!secret) {
    return NextResponse.json(
      {
        error: ClickError.IncorrectParameter,
        error_note: "Server konfiguratsiyasi yo'q (CLICK_SECRET_KEY)",
      },
      { status: 200 },
    );
  }

  const payload = await readWebhook(req);

  if (payload.service_id !== serviceId) {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: ClickError.IncorrectParameter,
        error_note: "service_id mos kelmadi",
      },
      { status: 200 },
    );
  }

  if (!verifyCompleteSign(payload, secret)) {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: ClickError.SignCheckFailed,
        error_note: "Imzo to'g'ri kelmadi",
      },
      { status: 200 },
    );
  }

  if (payload.error && Number(payload.error) < 0) {
    const db = adminDb();
    await db
      .collection("clickTransactions")
      .doc(payload.click_trans_id)
      .set(
        {
          status: "cancelled",
          cancelledAt: new Date(),
          error: Number(payload.error),
          errorNote: payload.error_note ?? "",
        },
        { merge: true },
      );
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        merchant_confirm_id: Date.now(),
        error: Number(payload.error),
        error_note: payload.error_note ?? "Cancelled",
      },
      { status: 200 },
    );
  }

  const meta = parseMerchantTransId(payload.merchant_trans_id);
  if (!meta) {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: ClickError.IncorrectParameter,
        error_note: "merchant_trans_id formati noto'g'ri",
      },
      { status: 200 },
    );
  }

  const amountUzs = Math.round(Number(payload.amount));
  const db = adminDb();
  const txRef = db.collection("clickTransactions").doc(payload.click_trans_id);
  const txSnap = await txRef.get();

  if (!txSnap.exists) {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: ClickError.TransactionNotFound,
        error_note: "Tranzaksiya topilmadi (prepare bajarilmagan)",
      },
      { status: 200 },
    );
  }

  const existing = txSnap.data() ?? {};
  if (existing.status === "completed") {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id),
        merchant_trans_id: payload.merchant_trans_id,
        merchant_confirm_id: (existing.merchantConfirmId as number) ?? Date.now(),
        error: ClickError.Success,
        error_note: "Already completed",
      },
      { status: 200 },
    );
  }

  const confirmId = Date.now();

  if (meta.kind === "subscription" && meta.plan) {
    if (meta.userId === "anon") {
      return NextResponse.json(
        {
          click_trans_id: Number(payload.click_trans_id) || 0,
          merchant_trans_id: payload.merchant_trans_id,
          error: ClickError.UserNotFound,
          error_note: "Obuna uchun login kerak",
        },
        { status: 200 },
      );
    }
    const planName = meta.plan === "yearly" ? "Yillik" : "Oylik";
    const expiresAt = expiryFor(meta.plan);
    await db
      .collection("users")
      .doc(meta.userId)
      .set(
        {
          premium: {
            isPremium: true,
            planName,
            expiresAt,
            autoRenew: false,
            updatedAt: FieldValue.serverTimestamp(),
          },
        },
        { merge: true },
      );
  } else if (meta.kind === "donation") {
    await db.collection("donations").add({
      clickTransId: payload.click_trans_id,
      amount: amountUzs,
      userId: meta.userId,
      paidAt: new Date(),
    });
  }

  await txRef.set(
    {
      status: "completed",
      completedAt: new Date(),
      merchantConfirmId: confirmId,
    },
    { merge: true },
  );

  return NextResponse.json(
    {
      click_trans_id: Number(payload.click_trans_id),
      merchant_trans_id: payload.merchant_trans_id,
      merchant_confirm_id: confirmId,
      error: ClickError.Success,
      error_note: "Success",
    },
    { status: 200 },
  );
}
