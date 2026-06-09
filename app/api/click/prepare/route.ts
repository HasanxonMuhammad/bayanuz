import { NextRequest, NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase-admin";
import {
  ClickError,
  parseMerchantTransId,
  readWebhookFromForm,
  verifyPrepareSign,
} from "@/lib/click";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/// Click "Prepare" webhook'i. Click foydalanuvchi to'lashga roziligini bildirgach
/// shu yerga keladi va biz "tayyor" javobini qaytarishimiz kerak.
///
/// 1) `sign_string`ni tekshiramiz (MD5).
/// 2) `merchant_trans_id`ni parse qilamiz (uid, plan yoki donation).
/// 3) Firestore'ga "pending" yozuvni qo'shamiz va `merchant_prepare_id`ni qaytaramiz.
/// 4) Idempotent: Click ikkinchi marta yuborsa, eski prepare_id qaytadi.
export async function POST(req: NextRequest) {
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

  const form = await req.formData();
  const payload = readWebhookFromForm(form);

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

  if (!verifyPrepareSign(payload, secret)) {
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
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: Number(payload.error),
        error_note: payload.error_note ?? "Click xatosi",
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
  if (!Number.isFinite(amountUzs) || amountUzs <= 0) {
    return NextResponse.json(
      {
        click_trans_id: Number(payload.click_trans_id) || 0,
        merchant_trans_id: payload.merchant_trans_id,
        error: ClickError.IncorrectAmount,
        error_note: "Summa noto'g'ri",
      },
      { status: 200 },
    );
  }

  if (meta.kind === "subscription") {
    const expected = meta.plan === "yearly" ? 290000 : 35000;
    if (amountUzs !== expected) {
      return NextResponse.json(
        {
          click_trans_id: Number(payload.click_trans_id) || 0,
          merchant_trans_id: payload.merchant_trans_id,
          error: ClickError.IncorrectAmount,
          error_note: "Obuna narxi mos emas",
        },
        { status: 200 },
      );
    }
  }

  const db = adminDb();
  const ref = db.collection("clickTransactions").doc(payload.click_trans_id);
  const existing = await ref.get();

  let prepareId: number;
  if (existing.exists && existing.data()?.preparedAt) {
    prepareId = (existing.data()?.merchantPrepareId as number) ?? Date.now();
  } else {
    prepareId = Date.now();
    await ref.set(
      {
        clickTransId: payload.click_trans_id,
        merchantTransId: payload.merchant_trans_id,
        merchantPrepareId: prepareId,
        amount: amountUzs,
        kind: meta.kind,
        plan: meta.plan ?? null,
        userId: meta.userId,
        status: "prepared",
        preparedAt: new Date(),
      },
      { merge: true },
    );
  }

  return NextResponse.json(
    {
      click_trans_id: Number(payload.click_trans_id),
      merchant_trans_id: payload.merchant_trans_id,
      merchant_prepare_id: prepareId,
      error: ClickError.Success,
      error_note: "Success",
    },
    { status: 200 },
  );
}
