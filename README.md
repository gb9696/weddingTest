# Our Story — 시네마틱 모바일 청첩장

**GitHub Pages에 무료 배포 가능한 정적 웹사이트**입니다. 별도의 서버나 유료 API가 필요하지 않습니다. 예식 정보는 샘플 데이터이며 실제 사용 전 반드시 변경하세요.

## 1. 폴더 구조

```text
cinematic-wedding/
├── index.html      # 화면 구조 및 검색/공유 메타태그
├── style.css       # 색상, 레이아웃, 모바일 디자인
├── script.js       # D-Day, 사진 확대, 복사, 공유, 지도 링크
├── config.js       # 신랑·신부, 날짜, 장소, 사진, 계좌 수정 (가장 중요)
├── assets/
│   └── grain.svg   # 영화 필름 느낌의 배경 질감
└── images/          # 직접 준비한 웨딩 사진을 넣는 폴더
```

## 2. Mac에서 미리 보기

1. ZIP을 압축 해제합니다.
2. 터미널을 열고 압축 해제한 폴더로 이동합니다. 예: `cd ~/Downloads/cinematic-wedding`
3. `python3 -m http.server 8000` 실행
4. 브라우저에서 `http://localhost:8000` 접속
5. 종료하려면 터미널에서 `Control + C`

> 인터넷 연결이 있으면 Google Fonts를 사용하고, 오프라인이면 기본 글꼴로 대체됩니다.

## 3. 사진 추가하기

1. 웨딩 사진을 JPG, PNG 또는 WebP 형식으로 준비합니다. WebP를 추천합니다.
2. 파일명을 영문 소문자와 숫자로 정리합니다. 예: `main.webp`, `photo-01.webp`, `photo-02.webp`.
3. `images/` 폴더에 복사합니다.
4. `config.js`의 `heroImage`와 `gallery`를 변경합니다.

```js
heroImage: 'images/main.webp',
gallery: [
  { src: 'images/photo-01.webp', alt: '함께 웃는 두 사람' },
  { src: 'images/photo-02.webp', alt: '웨딩 촬영 사진' },
  { src: 'images/photo-03.webp', alt: '산책하는 두 사람' }
],
```

사진은 원하는 만큼 추가하거나 줄일 수 있습니다. 현재 빈 `src`는 안내용 플레이스홀더로 표시됩니다. **사진을 추가하기만 해서는 자동으로 나타나지 않으며 `config.js` 목록도 수정해야 합니다.**

- 추천 사진 폭: 1200~1800px, 일반 사진 200~500KB 정도를 목표로 압축
- 대표 사진은 세로 3:4 또는 4:5 권장, 피사체가 중앙에 오도록 준비
- `images/`의 파일명은 대소문자를 구분합니다.
- 촬영 원본의 위치 정보(EXIF) 및 민감한 정보는 공개 전 제거하세요.

## 4. 이름·날짜·예식장·계좌번호 변경

`config.js`의 다음 값을 수정합니다.

- `couple.groom`, `couple.bride`: 이름
- `weddingDate`: 날짜/시간, 반드시 `+09:00` 등 시간대 포함. 예: `2027-05-15T12:30:00+09:00`
- `dateDisplay`, `timeDisplay`: 사람에게 보여줄 날짜와 시간
- `venue.name`, `venue.hall`, `venue.address`, `venue.query`: 예식장 이름, 층, 주소, 지도 검색어
- `message`: 초대 문구(배열 항목별로 줄이 표시됨)
- `accounts`: 은행, 계좌번호, 예금주
- `siteUrl`: 배포한 최종 주소(선택)

`index.html`에서 `og:title`, `og:description`과 문서 제목을 수정할 수 있습니다. 카카오톡 미리보기 사진을 설정하려면 대표 사진을 공개 URL로 올린 뒤 `<meta property="og:image" content="https://.../images/preview.jpg">`를 `<head>` 안에 추가하세요. **공유 미리보기는 카카오톡 캐시 때문에 즉시 바뀌지 않을 수 있습니다.**

## 5. GitHub 저장소 만들고 배포하기

### A. GitHub에서 저장소 생성

1. https://github.com/new 접속 및 로그인
2. Repository name: `cinematic-wedding` (원하는 이름 사용 가능)
3. **Public** 선택 (무료 GitHub Pages 배포용)
4. README 등 초기 파일 자동 생성 옵션은 선택하지 않아도 됩니다.
5. `Create repository` 클릭

### B. Mac 터미널에서 최초 업로드

`USERNAME`을 본인의 GitHub 사용자명으로 바꿉니다.

```bash
cd ~/Downloads/cinematic-wedding
git init
git add .
git commit -m "Create cinematic wedding invitation"
git branch -M main
git remote add origin https://github.com/USERNAME/cinematic-wedding.git
git push -u origin main
```

이미 원격 저장소를 연결했다면 `git remote add origin`을 다시 실행하지 마세요. `git remote -v`로 확인합니다. GitHub HTTPS 인증은 계정 비밀번호가 아니라 Git Credential Manager 또는 GitHub CLI(`gh auth login`) 등을 사용합니다.

### C. GitHub Pages 켜기

1. 저장소의 **Settings → Pages** 메뉴로 이동
2. **Build and deployment → Source: Deploy from a branch**
3. Branch: `main`, Folder: `/(root)` 선택 후 **Save**
4. 배포 완료 후 `https://USERNAME.github.io/cinematic-wedding/` 접속
5. GitHub Actions/Pages 화면에서 배포 성공 여부를 확인합니다. 수 분 정도 걸릴 수 있습니다.

> URL이 열리지 않으면 저장소가 Public인지, Pages가 켜져 있는지, `index.html`이 저장소 최상위에 있는지 확인하세요.

## 6. QR코드 만들기 (중요: 반드시 배포 후)

1. 실제 배포 주소를 휴대폰에서 열어 동작을 확인합니다.
2. 주소가 확정되면 `qr-create.html`을 브라우저에서 열어 배포 주소를 입력합니다. (QR 생성은 인터넷 연결 필요)
3. 생성된 QR 이미지를 PNG로 저장하거나 인쇄업체에 전달합니다.
4. **QR코드의 주소는 절대 바꾸지 말고**, 그 주소의 웹사이트 내용만 업데이트하세요.
5. 인쇄 전 iPhone과 Android에서 카메라로 스캔 테스트를 진행하세요.

GitHub 계정명 또는 저장소명을 바꾸면 기본 Pages URL이 바뀔 수 있습니다. 영구적인 URL 유지가 중요하다면 별도 도메인을 고려하세요(도메인 비용 별도).

## 7. 배포 후 사진/문구 수정하기

1. 로컬 폴더의 `images/`에 사진을 추가하거나 기존 파일을 교체합니다.
2. `config.js`에서 사진 경로, 이름, 날짜, 장소, 계좌 등을 변경합니다.
3. `http://localhost:8000`에서 변경 내용 확인
4. 터미널에서 다음 실행:

```bash
git status
git add .
git commit -m "Update wedding photos and details"
git push
```

5. GitHub Pages 배포 완료 후 **기존 URL을 새로고침**합니다. 캐시가 남으면 강력 새로고침 또는 시크릿 모드를 이용하세요.
6. QR코드는 수정할 필요가 없습니다.

GitHub 웹사이트에서도 파일을 직접 편집하고 커밋할 수 있지만, 여러 사진을 추가할 때는 로컬에서 Git으로 작업하는 편이 편리합니다.

## 8. 카카오톡 공유

- `청첩장 공유하기` 버튼은 스마트폰의 **기본 공유 시트(Web Share API)**를 우선 사용합니다. 카카오톡이 설치되어 있으면 사용자가 카카오톡을 선택할 수 있습니다.
- PC 또는 공유 시트를 지원하지 않는 브라우저에서는 **링크 복사**로 대체합니다.
- 이 버전은 **카카오 SDK를 이용한 전용 카카오톡 템플릿 공유는 포함하지 않습니다**. `kakaoJavaScriptKey`는 향후 확장용 빈 필드입니다.
- 카카오톡 링크 미리보기는 `index.html`의 Open Graph 메타태그와 공개 이미지 URL을 사용합니다.

## 9. 공개 배포 주의사항

- Public GitHub 저장소의 이미지·계좌번호·예식 정보는 누구나 열람할 수 있습니다.
- 검색엔진에 노출될 수 있으므로 공유 전 공개 범위를 충분히 고려하세요.
- GitHub Pages는 정적 호스팅이며 비밀번호 보호나 비공개 접근 통제 기능을 제공하지 않습니다.
- 배포 주소, QR코드, 지도 버튼, 계좌 복사, 공유 기능을 실기기에서 테스트하세요.
- 디자인에 사용된 영화 연출 요소는 일반적인 스타일 표현이며 특정 영화나 캐릭터 이미지는 사용하지 않았습니다.

## 10. 자주 묻는 질문

**Q. 사진을 바꾸면 QR코드를 다시 인쇄해야 하나요?**
아니요. URL이 같으면 그대로 사용합니다.

**Q. 사진은 몇 장까지 넣을 수 있나요?**
코드상 고정 제한은 없지만 용량이 많으면 로딩이 느려집니다.

**Q. 내용 수정에 비용이 드나요?**
GitHub Pages의 무료 제공 조건을 충족하면 정적 사이트 운영비는 0원입니다. 별도 도메인/외부 서비스는 별도입니다.

**Q. 모바일에서 QR코드가 열리지 않아요.**
배포 URL이 맞는지, HTTPS로 열리는지, QR 이미지가 흐리거나 너무 작은지 확인하세요.
