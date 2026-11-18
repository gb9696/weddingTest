import { put } from "@vercel/blob";
import { isAdmin } from "./_auth.js";

// 관리 페이지에서 줄인 사진(JPEG)을 받아 저장
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (!isAdmin(req)) return res.status(401).json({ error: "비밀번호가 맞지 않아요." });
  const body = req.body;
  if (!Buffer.isBuffer(body) || body.length === 0) return res.status(400).json({ error: "사진 데이터가 없어요." });
  if (body.length > 4 * 1024 * 1024) return res.status(413).json({ error: "사진이 너무 커요." });
  // 파일 이름 앞의 숫자로 순서를 정함 (올린 시각)
  const name = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
  const blob = await put(name, body, { access: "public", contentType: "image/jpeg", addRandomSuffix: false });
  res.status(200).json({ url: blob.url, pathname: blob.pathname });
}
