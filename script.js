(() => {
  'use strict';
  const c = window.WEDDING;
  if (!c) { console.error('config.js를 불러오지 못했습니다.'); return; }
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { const el = $(id); if (el) el.textContent = value ?? ''; };
  document.querySelectorAll('[data-groom]').forEach(e => e.textContent = c.couple.groom);
  document.querySelectorAll('[data-bride]').forEach(e => e.textContent = c.couple.bride);
  setText('heroDate', `${c.dateDisplay} · ${c.timeDisplay}`);
  setText('weddingDateText', `${c.dateDisplay} · ${c.timeDisplay}`);
  const date = new Date(c.weddingDate);
  if (!Number.isNaN(date.getTime())) {
    setText('dateLarge', `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,'0')}.${String(date.getDate()).padStart(2,'0')}`);
  }
  const msg = $('message');
  (c.message || []).forEach(line => { const p = document.createElement('p'); p.textContent = line; msg.appendChild(p); });
  setText('venueName', c.venue.name); setText('venueHall', c.venue.hall); setText('venueAddress', c.venue.address);
  setText('locName', `${c.venue.name} · ${c.venue.hall}`); setText('locAddress', c.venue.address);
  const mapQuery = encodeURIComponent(c.venue.query || c.venue.address || c.venue.name);
  $('naverLink').href = `https://map.naver.com/p/search/${mapQuery}`;
  $('kakaoMapLink').href = `https://map.kakao.com/?q=${mapQuery}`;
  const hero = $('heroImage');
  if (c.heroImage) hero.style.backgroundImage = `url(${JSON.stringify(c.heroImage)})`;
  const gallery = $('galleryGrid');
  (c.gallery || []).forEach((photo, i) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'photo';
    if (photo.src) {
      const img = document.createElement('img'); img.src = photo.src; img.alt = photo.alt || `웨딩 사진 ${i+1}`; img.loading = 'lazy';
      img.onerror = () => { button.classList.add('placeholder'); button.replaceChildren(); const t = document.createElement('small'); t.textContent = '사진 경로를 확인해 주세요'; button.append(t); };
      button.append(img);
      button.addEventListener('click', () => { if (!img.complete || !img.naturalWidth) return; $('lightboxImage').src = img.src; $('lightboxImage').alt = img.alt; $('lightbox').showModal(); });
    } else {
      button.classList.add('placeholder'); const symbol = document.createElement('span'); symbol.textContent = '✧'; const label = document.createElement('small'); label.textContent = `YOUR PHOTO ${String(i+1).padStart(2,'0')}`; button.append(symbol,label); button.title = 'config.js에서 사진 경로를 추가해 주세요';
    }
    gallery.append(button);
  });
  $('closeLightbox').addEventListener('click', () => $('lightbox').close());
  $('lightbox').addEventListener('click', e => { if (e.target === $('lightbox')) $('lightbox').close(); });
  let toastTimer;
  function toast(message) { const t = $('toast'); t.textContent = message; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600); }
  async function copy(value) {
    try { await navigator.clipboard.writeText(value); toast('복사되었습니다.'); }
    catch { toast('복사에 실패했습니다. HTTPS 환경에서 다시 시도해 주세요.'); }
  }
  const list = $('accountList');
  (c.accounts || []).forEach(a => {
    const row = document.createElement('div'); row.className = 'account';
    const info = document.createElement('div'); const title = document.createElement('b'); title.textContent = a.label;
    const desc = document.createElement('p'); desc.textContent = `${a.bank} ${a.number} · ${a.holder}`;
    info.append(title,desc); const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = '계좌 복사'; btn.addEventListener('click', () => copy(a.number)); row.append(info,btn); list.append(row);
  });
  function countdown() {
    const diff = date.getTime() - Date.now();
    if (Number.isNaN(diff)) { ['days','hours','minutes','seconds'].forEach(id => setText(id,'--')); return; }
    if (diff <= 0) { ['days','hours','minutes','seconds'].forEach(id => setText(id,'00')); return; }
    const s = Math.floor(diff/1000); setText('days',String(Math.floor(s/86400)).padStart(2,'0')); setText('hours',String(Math.floor(s%86400/3600)).padStart(2,'0')); setText('minutes',String(Math.floor(s%3600/60)).padStart(2,'0')); setText('seconds',String(s%60).padStart(2,'0'));
  }
  countdown(); setInterval(countdown,1000);
  const url = () => c.siteUrl || location.href.split('#')[0];
  $('copyLinkBtn').addEventListener('click', () => copy(url()));
  $('shareBtn').addEventListener('click', async () => {
    const data = { title: `${c.couple.groom} & ${c.couple.bride} | Our Story`, text: `${c.dateDisplay} ${c.timeDisplay} · ${c.venue.name}`, url: url() };
    if (navigator.share) { try { await navigator.share(data); } catch (e) { if (e.name !== 'AbortError') toast('공유할 수 없습니다. 링크 복사를 이용해 주세요.'); } }
    else copy(data.url);
  });
})();
