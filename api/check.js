import { isAdmin } from "./_auth.js";

// 관리 페이지 로그인 확인용
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: "Vercel에 ADMIN_PASSWORD가 설정되지 않았어요." });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(500).json({ error: "Vercel Blob 저장소가 연결되지 않았어요." });
  if (!isAdmin(req)) return res.status(401).json({ error: "비밀번호가 맞지 않아요." });
  res.status(200).json({ ok: true });
}
