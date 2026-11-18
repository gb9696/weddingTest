import { del } from "@vercel/blob";
import { isAdmin } from "./_auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!isAdmin(req)) return res.status(401).json({ error: "비밀번호가 맞지 않아요." });
  const { url } = req.body || {};
  if (!url || !/\/gallery\//.test(url)) return res.status(400).json({ error: "잘못된 요청이에요." });
  await del(url);
  res.status(200).json({ ok: true });
}
