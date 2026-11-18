# 모바일 청첩장

## 파일 구성
```
index.html   페이지 구조 (제목·미리보기 문구 수정)
config.js    ★ 이름, 날짜, 장소, 계좌 등 모든 정보는 여기서 수정
style.css    디자인 (색상은 맨 위 :root 변수에서 변경)
script.js    동작 (수정 불필요)
images/      main.jpg, gallery1~8.jpg, map.jpg(선택)
```

## 수정 순서
1. `config.js`에서 정보 입력
2. `images/` 폴더의 임시 사진을 실제 사진으로 교체 (같은 파일명, 세로 3:4 비율 권장, 장당 500KB 이하로 줄이면 로딩이 빠름)
3. 사진 개수를 바꾸려면 `config.js`의 `gallery` 목록만 수정
4. `index.html` 상단의 `<title>`, `og:title`, `og:description`, `og:image` 수정

## GitHub Pages 배포
1. GitHub에서 새 저장소 생성 (예: `wedding`, Public)
2. 이 폴더의 파일을 전부 업로드 (Add file → Upload files 또는 git push)
3. 저장소 **Settings → Pages → Branch: main / (root) → Save**
4. 1~2분 뒤 `https://wedding-two-blue.vercel.app/` 으로 접속

## 카카오톡 공유 설정 (완료)
1. https://developers.kakao.com → 앱 관리에서 앱 생성
2. [앱] > [플랫폼 키] > [JavaScript 키] → JavaScript SDK 도메인에 `https://wedding-two-blue.vercel.app` 등록
3. [앱] > [제품 링크 관리] → 웹 도메인에 `https://wedding-two-blue.vercel.app` 등록
4. JavaScript 키를 `config.js`의 `kakaoKey`에 입력

> 카카오톡 미리보기가 예전 내용으로 뜨면 https://developers.kakao.com/tool/debugger/sharing 에서 URL 캐시를 초기화하세요.

## 사진첩 관리 페이지 (admin.html)
청첩장 주소 뒤에 `/admin.html` 을 붙여 들어가면 사진을 직접 올리고 지울 수 있어요.

처음 한 번 Vercel 설정:
1. Vercel 프로젝트 → **Storage** → **Create** → **Blob** → 이 프로젝트에 연결 (BLOB_READ_WRITE_TOKEN 자동 등록)
2. Vercel 프로젝트 → **Settings → Environment Variables** → `ADMIN_PASSWORD` 에 관리 비밀번호 입력
3. **Deployments** 에서 최신 배포를 **Redeploy**

- 올린 사진이 하나라도 있으면 사진첩은 그 사진들로 표시되고, 없으면 `config.js`의 `gallery` 사진이 보여요.
- 사진은 올릴 때 긴 쪽 1600px JPEG로 자동으로 줄어들어요.
