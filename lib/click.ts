import { createHash } from "node:crypto";

/// Click.uz Shop API webhook handlers uchun umumiy yordamchi funksiyalar.
///
/// Click Webhook'lari ikkita bosqichdan iborat:
///   1) **Prepare** (`action=0`) — Click foydalanuvchi to'lashga rozi bo'lganda
///      bizdan tasdiq so'raydi. Biz "tayyor" deb javob beramiz va `merchant_prepare_id` qaytaramiz.
///   2) **Complete** (`action=1`) — Click to'lov muvaffaqiyatli amalga oshganligini xabar qiladi.
///      Bu yerda foydalanuvchiga premium beriladi yoki xayriya qayd qilinadi.
///
/// Imzo (`sign_string`) — MD5 hash. Click hujjatiga ko'ra:
///   Prepare: MD5(click_trans_id + service_id + SECRET + merchant_trans_id + amount + action + sign_time)
///   Complete: MD5(click_trans_id + service_id + SECRET + merchant_trans_id + merchant_prepare_id + amount + action + sign_time)

export type ClickAction = 0 | 1; // 0 = Prepare, 1 = Complete

export interface ClickWebhookPayload {
  click_trans_id: string;
  service_id: string;
  click_paydoc_id?: string;
  merchant_trans_id: string;
  merchant_prepare_id?: string;
  amount: string;
  action: string;
  error: string;
  error_note?: string;
  sign_time: string;
  sign_string: string;
}

export interface ClickResponse {
  click_trans_id: number;
  merchant_trans_id: string;
  merchant_prepare_id?: number;
  merchant_confirm_id?: number;
  error: number;
  error_note: string;
}

export const ClickError = {
  Success: 0,
  SignCheckFailed: -1,
  IncorrectAmount: -2,
  ActionNotFound: -3,
  AlreadyPaid: -4,
  UserNotFound: -5,
  TransactionNotFound: -6,
  IncorrectParameter: -8,
  TransactionCancelled: -9,
} as const;

export function md5(input: string): string {
  return createHash("md5").update(input).digest("hex");
}

export function verifyPrepareSign(p: ClickWebhookPayload, secret: string): boolean {
  const expected = md5(
    p.click_trans_id +
      p.service_id +
      secret +
      p.merchant_trans_id +
      p.amount +
      p.action +
      p.sign_time,
  );
  return expected.toLowerCase() === p.sign_string.toLowerCase();
}

export function verifyCompleteSign(p: ClickWebhookPayload, secret: string): boolean {
  const expected = md5(
    p.click_trans_id +
      p.service_id +
      secret +
      p.merchant_trans_id +
      (p.merchant_prepare_id ?? "") +
      p.amount +
      p.action +
      p.sign_time,
  );
  return expected.toLowerCase() === p.sign_string.toLowerCase();
}

/// Yangi merchant_trans_id formati: `sub_<plan>_<uid>_<ts>` yoki `don_<uid|anon>_<ts>`.
/// Parse qilib metadata olamiz; noma'lum format bo'lsa `null` qaytaradi.
export interface MerchantTxMeta {
  kind: "subscription" | "donation";
  plan?: "monthly" | "yearly";
  userId: string; // 'anon' bo'lishi mumkin (donations)
  timestamp: number;
}

export function parseMerchantTransId(id: string): MerchantTxMeta | null {
  const parts = id.split("_");
  if (parts.length < 3) return null;
  const [kind, ...rest] = parts;
  if (kind === "sub") {
    if (rest.length < 3) return null;
    const [plan, ...userAndTs] = rest;
    if (plan !== "monthly" && plan !== "yearly") return null;
    const ts = parseInt(userAndTs[userAndTs.length - 1] ?? "", 10);
    const userId = userAndTs.slice(0, -1).join("_");
    if (!userId || Number.isNaN(ts)) return null;
    return { kind: "subscription", plan, userId, timestamp: ts };
  }
  if (kind === "don") {
    const ts = parseInt(rest[rest.length - 1] ?? "", 10);
    const userId = rest.slice(0, -1).join("_");
    if (!userId || Number.isNaN(ts)) return null;
    return { kind: "donation", userId, timestamp: ts };
  }
  return null;
}

export function readWebhookFromForm(
  form: URLSearchParams | FormData,
): ClickWebhookPayload {
  const get = (k: string): string => {
    const v = form.get(k);
    return v === null || v === undefined ? "" : String(v);
  };
  return {
    click_trans_id: get("click_trans_id"),
    service_id: get("service_id"),
    click_paydoc_id: get("click_paydoc_id"),
    merchant_trans_id: get("merchant_trans_id"),
    merchant_prepare_id: get("merchant_prepare_id") || undefined,
    amount: get("amount"),
    action: get("action"),
    error: get("error"),
    error_note: get("error_note") || undefined,
    sign_time: get("sign_time"),
    sign_string: get("sign_string"),
  };
}

export function expiryFor(plan: "monthly" | "yearly"): number {
  const now = new Date();
  if (plan === "yearly") {
    now.setFullYear(now.getFullYear() + 1);
  } else {
    now.setMonth(now.getMonth() + 1);
  }
  return now.getTime();
}
