import { NextRequest, NextResponse } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { adminAuth } from "@/lib/firebase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TELEGRAM_TOKEN_URL = "https://oauth.telegram.org/token";
const TELEGRAM_JWKS_URL = "https://oauth.telegram.org/.well-known/jwks.json";
const TELEGRAM_ISSUER = "https://oauth.telegram.org";

const APP_DEEP_LINK = "bayanlugat://auth/telegram";

const jwks = createRemoteJWKSet(new URL(TELEGRAM_JWKS_URL));

function fail(state: string | null, code: string, message: string) {
  const url = new URL(APP_DEEP_LINK);
  url.searchParams.set("error", code);
  url.searchParams.set("message", message);
  if (state) url.searchParams.set("state", state);
  return NextResponse.redirect(url.toString(), 302);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const tgError = searchParams.get("error");

  if (tgError) {
    return fail(state, tgError, searchParams.get("error_description") ?? "auth_denied");
  }
  if (!code) return fail(state, "no_code", "missing authorization code");

  const clientId = process.env.TELEGRAM_CLIENT_ID;
  const clientSecret = process.env.TELEGRAM_CLIENT_SECRET;
  const redirectUri = process.env.TELEGRAM_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    return fail(state, "server_misconfig", "telegram env vars missing");
  }

  let tokenJson: { id_token?: string; access_token?: string };
  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });
    const res = await fetch(TELEGRAM_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      const text = await res.text();
      return fail(state, "token_exchange_failed", `${res.status}: ${text.slice(0, 200)}`);
    }
    tokenJson = await res.json();
  } catch (e) {
    return fail(state, "token_exchange_error", (e as Error).message);
  }

  const idToken = tokenJson.id_token;
  if (!idToken) return fail(state, "no_id_token", "id_token missing in token response");

  let claims: Record<string, unknown>;
  try {
    const { payload } = await jwtVerify(idToken, jwks, {
      issuer: TELEGRAM_ISSUER,
      audience: clientId,
    });
    claims = payload as Record<string, unknown>;
  } catch (e) {
    return fail(state, "id_token_invalid", (e as Error).message);
  }

  const tgId = (claims.id ?? claims.sub) as string | number | undefined;
  if (!tgId) return fail(state, "no_user_id", "id_token missing user id");

  const uid = `tg_${tgId}`;
  const displayName = (claims.name as string | undefined) ?? null;
  const photoUrl = (claims.picture as string | undefined) ?? null;
  const phone = (claims.phone_number as string | undefined) ?? null;
  const username = (claims.preferred_username as string | undefined) ?? null;

  let customToken: string;
  try {
    customToken = await adminAuth().createCustomToken(uid, {
      provider: "telegram",
      tg_id: String(tgId),
      ...(username ? { tg_username: username } : {}),
    });

    await adminAuth().updateUser(uid, {
      ...(displayName ? { displayName } : {}),
      ...(photoUrl ? { photoURL: photoUrl } : {}),
      ...(phone ? { phoneNumber: phone.startsWith("+") ? phone : `+${phone}` } : {}),
    }).catch(async (err: { code?: string }) => {
      if (err?.code === "auth/user-not-found") {
        await adminAuth().createUser({
          uid,
          ...(displayName ? { displayName } : {}),
          ...(photoUrl ? { photoURL: photoUrl } : {}),
          ...(phone ? { phoneNumber: phone.startsWith("+") ? phone : `+${phone}` } : {}),
        });
      } else {
        throw err;
      }
    });
  } catch (e) {
    return fail(state, "firebase_error", (e as Error).message);
  }

  const url = new URL(APP_DEEP_LINK);
  url.searchParams.set("token", customToken);
  if (state) url.searchParams.set("state", state);
  if (displayName) url.searchParams.set("name", displayName);
  if (photoUrl) url.searchParams.set("photo", photoUrl);
  return NextResponse.redirect(url.toString(), 302);
}
