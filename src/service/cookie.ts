import { randomUUID } from "crypto";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

export function ensureCookie(c: Context) {
  let userId = getCookie(c, "user_id");

  if (!userId) {
    userId = randomUUID();
    setCookie(c, "user_id", userId, {
      httpOnly: true,
      sameSite: "Lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return userId;
}
