import { NextRequest, NextResponse } from "next/server";
import { APP_STORE_URL, PLAY_STORE_URL, SITE_URL } from "@/lib/links";

/**
 * /download — one link for every QR code and share message.
 * Detects the visitor's platform and sends them straight to the right store.
 * Desktop and unknown devices land on the home page download section.
 */
export function GET(req: NextRequest) {
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();
  const isApple = /iphone|ipad|ipod|macintosh|mac os x/.test(ua);
  const isAndroid = /android/.test(ua);

  const target = isApple
    ? APP_STORE_URL
    : isAndroid
      ? PLAY_STORE_URL
      : `${SITE_URL}/#download`;

  return NextResponse.redirect(target, { status: 302 });
}
