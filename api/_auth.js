import { timingSafeEqual } from "node:crypto";

// Vercel 환경 변수 ADMIN_PASSWORD 와 비교
export function isAdmin(req) {
  const expected = process.env.ADMIN_PASSWORD || "";
  const given = String(req.headers["x-admin-password"] || "");
  if (!expected || !given) return false;
  const a = Buffer.from(expected), b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}
