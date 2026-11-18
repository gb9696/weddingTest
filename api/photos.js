import { list } from "@vercel/blob";

// 사진첩 사진 목록 (올린 순서대로)
export default async function handler(req, res) {
  try {
    const blobs = [];
    let cursor;
    do {
      const r = await list({ prefix: "gallery/", cursor, limit: 1000 });
      blobs.push(...r.blobs);
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
    blobs.sort((a, b) => a.pathname.localeCompare(b.pathname));
    // 하객 접속마다 목록을 새로 읽지 않도록 5분간 캐시 (관리 페이지는 fresh=1 로 우회)
    res.setHeader("Cache-Control", req.query.fresh ? "no-store" : "public, s-maxage=300, stale-while-revalidate=86400");
    res.status(200).json({ photos: blobs.map((b) => ({ url: b.url, pathname: b.pathname, size: b.size })) });
  } catch (e) {
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ photos: [], error: "storage-unavailable" });
  }
}
