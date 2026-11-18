(() => {
  const C = CONFIG;
  const $ = (id) => document.getElementById(id);
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const { year, month, day, hour, minute } = C.date;
  const wedding = new Date(year, month - 1, day, hour, minute);
  const dow = wedding.getDay();
  const ampm = hour < 12 ? "오전" : "오후";
  const h12 = hour % 12 || 12;
  const timeKo = `${ampm} ${h12}시${minute ? ` ${minute}분` : ""}`;
  const pad = (n) => String(n).padStart(2, "0");

  /* 사진 없을 때 자리표시 */
  const fallback = (img) => {
    img.onerror = () => { img.style.visibility = "hidden"; };
  };

  /* Hero */
  const V = C.venue;
  $("mainPhoto").src = C.mainPhoto; fallback($("mainPhoto"));
  if (C.heroDeco === false) $("heroDeco").remove();
  $("heroGroom").textContent = C.groom.name;
  $("heroBride").textContent = C.bride.name;
  $("heroWhen").innerHTML = `${year}.${month}.${day}.<br>${DAYS[dow]}요일<br>${hour}:${pad(minute)}`;
  $("heroWhere").innerHTML = [V.name, V.floor, V.hall].filter(Boolean).join("<br>");

  /* 인사말 & 혼주 */
  $("greeting").textContent = C.greeting;
  const pLine = (p, who) =>
    `<p><b>${p.father.name}</b>, <b>${p.mother.name}</b>의 ${p.order} <b>${p.name}</b></p>`;
  $("parents").innerHTML = pLine(C.groom) + pLine(C.bride);

  /* 연락처 */
  const row = (label, name, phone) => `
    <div class="contact-row"><span><small>${label}</small>${name}</span>
    <span><a href="tel:${phone}" aria-label="전화">☎</a><a href="sms:${phone}" aria-label="문자">✉</a></span></div>`;
  const group = (title, p, me) => `<div class="contact-group"><h4>${title}</h4>
    ${row(me, p.name, p.phone)}${row("아버지", p.father.name, p.father.phone)}${row("어머니", p.mother.name, p.mother.phone)}</div>`;
  $("contactList").innerHTML = group("신랑측", C.groom, "신랑") + group("신부측", C.bride, "신부");

  /* 갤러리 */
  const gal = $("gallery"), dots = $("dots");
  C.gallery.forEach((src, i) => {
    const f = document.createElement("figure");
    const img = document.createElement("img");
    img.src = src; img.loading = "lazy"; img.alt = `사진 ${i + 1}`;
    fallback(img);
    img.onclick = () => openLB(i);
    f.appendChild(img); gal.appendChild(f);
    dots.appendChild(document.createElement("span"));
  });
  const setDot = () => {
    const w = gal.firstElementChild ? gal.firstElementChild.offsetWidth + 10 : 1;
    const idx = Math.round(gal.scrollLeft / w);
    [...dots.children].forEach((d, i) => d.classList.toggle("on", i === idx));
  };
  gal.addEventListener("scroll", setDot, { passive: true }); setDot();

  /* 라이트박스 */
  let cur = 0;
  const lb = $("lightbox");
  const showLB = () => { $("lbImg").src = C.gallery[cur]; $("lbCount").textContent = `${cur + 1} / ${C.gallery.length}`; };
  const openLB = (i) => { cur = i; showLB(); lb.classList.add("open"); };
  const move = (d) => { cur = (cur + d + C.gallery.length) % C.gallery.length; showLB(); };
  $("lbPrev").onclick = () => move(-1);
  $("lbNext").onclick = () => move(1);
  let sx = 0;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); });

  /* 모달 공통 */
  document.querySelectorAll("[data-open]").forEach((b) => (b.onclick = () => $(b.dataset.open).classList.add("open")));
  document.querySelectorAll(".modal, .lightbox").forEach((m) =>
    m.addEventListener("click", (e) => { if (e.target === m || e.target.hasAttribute("data-close")) m.classList.remove("open"); })
  );

  /* 달력 */
  $("calMonth").textContent = `${month}월`;
  const first = new Date(year, month - 1, 1).getDay();
  const last = new Date(year, month, 0).getDate();
  let html = "<tr>" + DAYS.map((d) => `<th>${d}</th>`).join("") + "</tr><tr>";
  for (let i = 0; i < first; i++) html += "<td></td>";
  for (let d = 1; d <= last; d++) {
    html += d === day ? `<td class="day"><span>${d}</span></td>` : `<td>${d}</td>`;
    if ((first + d) % 7 === 0 && d !== last) html += "</tr><tr>";
  }
  $("calendar").innerHTML = html + "</tr>";

  /* 카운트다운 */
  const units = [["DAYS", 864e5], ["HOUR", 36e5], ["MIN", 6e4], ["SEC", 1e3]];
  const tick = () => {
    let r = Math.max(wedding - new Date(), 0);
    $("countdown").innerHTML = units.map(([n, ms]) => {
      const v = Math.floor(r / ms); r -= v * ms;
      return `<div><b>${n === "DAYS" ? v : pad(v)}</b><small>${n}</small></div>`;
    }).join("");
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const dd = Math.round((new Date(year, month - 1, day) - today) / 864e5);
    const couple = `${C.groom.name} <span class="dheart">♥</span> ${C.bride.name}`;
    $("dday").innerHTML = dd > 0 ? `${couple}의 결혼식이 <em>${dd}일</em> 남았습니다.`
      : dd === 0 ? `오늘은 ${couple}의 결혼식입니다.`
      : `${couple}의 결혼식이 <em>${-dd}일</em> 지났습니다.`;
  };
  tick(); setInterval(tick, 1000);

  /* 오시는 길 */
  $("venueName").textContent = [V.name, V.floor, V.hall].filter(Boolean).join(" ");
  $("venueAddr").innerHTML = `${V.address}<br>Tel. <a href="tel:${V.tel}">${V.tel}</a>`;
  $("naverMap").href = V.naverMap; $("kakaoMap").href = V.kakaoMap; $("tmap").href = V.tmap;
  const mapBox = $("mapBox");
  // 약도 이미지 (카카오맵을 못 불러올 때 대신 사용)
  const useImage = () => {
    if (!V.mapImage) return mapBox.remove();
    const test = new Image();
    test.onload = () => (mapBox.style.backgroundImage = `url(${V.mapImage})`);
    test.onerror = () => mapBox.remove();
    test.src = V.mapImage;
  };
  // 카카오맵
  const drawKakaoMap = () => {
    kakao.maps.load(() => {
      mapBox.textContent = "";
      const map = new kakao.maps.Map(mapBox, { center: new kakao.maps.LatLng(V.lat, V.lng), level: 3 });
      map.setDraggable(false);   // 페이지 스크롤이 지도에 막히지 않도록 고정
      map.setZoomable(false);
      map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
      const place = (pos) => {
        map.setCenter(pos);
        new kakao.maps.Marker({ map, position: pos });
        new kakao.maps.CustomOverlay({
          map, position: pos, yAnchor: 2.6,
          content: `<div class="map-label">${V.name}</div>`,
        });
      };
      // 주소로 정확한 위치를 찾고, 실패하면 config의 좌표 사용
      const fallback = new kakao.maps.LatLng(V.lat, V.lng);
      if (kakao.maps.services) {
        new kakao.maps.services.Geocoder().addressSearch(V.address.replace(/\s*신도림테크노마트.*$/, ""), (r, status) => {
          place(status === kakao.maps.services.Status.OK ? new kakao.maps.LatLng(r[0].y, r[0].x) : fallback);
        });
      } else place(fallback);
    });
  };
  if (C.kakaoKey) {
    const s = document.createElement("script");
    s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${C.kakaoKey}&autoload=false&libraries=services`;
    s.onload = () => { try { drawKakaoMap(); } catch { useImage(); } };
    s.onerror = useImage;
    document.head.appendChild(s);
  } else useImage();
  $("transport").innerHTML = V.transport.map((t) => `<div><h4>${t.title}</h4><p>${t.desc}</p></div>`).join("");

  /* 계좌 */
  const accBlock = (el, title, list) => {
    el.innerHTML = `<button class="acc-head">${title}</button><div class="acc-body">${list.map((a) => `
      <div class="acc-item"><p><small>${a.role}</small> ${a.name}<br>${a.bank} ${a.number}</p>
      <button data-copy="${a.bank} ${a.number}">복사</button></div>`).join("")}</div>`;
    el.querySelector(".acc-head").onclick = () => el.classList.toggle("open");
  };
  accBlock($("accGroom"), "신랑측 계좌번호", C.accounts.groom);
  accBlock($("accBride"), "신부측 계좌번호", C.accounts.bride);

  /* 복사 & 토스트 */
  const toast = (msg) => { const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove("show"), 1800); };
  const copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
    toast(msg);
  };
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-copy]"); if (b) copy(b.dataset.copy, "계좌번호가 복사되었습니다."); });
  $("copyLink").onclick = () => copy(location.href.split("?")[0], "청첩장 링크가 복사되었습니다.");

  /* 화환 */
  if (C.flowerLink) $("flowerLink").href = C.flowerLink; else $("flowerSec").remove();

  /* 카카오 공유 */
  $("kakaoShare").onclick = () => {
    if (!C.kakaoKey || !window.Kakao) return toast("config.js에 카카오 JavaScript 키를 입력해주세요.");
    if (!Kakao.isInitialized()) Kakao.init(C.kakaoKey);
    const url = location.href.split("?")[0];
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `${C.groom.name} ♡ ${C.bride.name} 결혼합니다`,
        description: `${year}년 ${month}월 ${day}일 ${DAYS[dow]}요일 ${timeKo}\n${V.name} ${V.floor || ""} ${V.hall}`,
        imageUrl: C.shareImage,
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [{ title: "청첩장 보기", link: { mobileWebUrl: url, webUrl: url } }],
    });
  };

  /* 배경음악 */
  if (C.bgm) {
    const audio = $("bgm"), btn = $("bgmBtn");
    audio.src = C.bgm; btn.style.display = "block";
    btn.onclick = () => { if (audio.paused) { audio.play(); btn.classList.add("on"); } else { audio.pause(); btn.classList.remove("on"); } };
  }

  /* 스크롤 페이드인 */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: 0.15 });
  document.querySelectorAll(".fade").forEach((el) => io.observe(el));
})();
