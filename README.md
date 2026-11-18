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
4. 1~2분 뒤 `https://gb9696.github.io/weddingTest/` 으로 접속

## 카카오톡 공유 설정 (선택)
1. https://developers.kakao.com → 내 애플리케이션 → 앱 추가
2. 앱 설정 → 플랫폼 → Web → 사이트 도메인에 `https://아이디.github.io` 등록
3. 앱 키의 **JavaScript 키**를 `config.js`의 `kakaoKey`에 입력
4. `shareImage`를 실제 배포 주소의 사진 경로로 변경

> 카카오톡 미리보기가 예전 내용으로 뜨면 https://developers.kakao.com/tool/debugger/sharing 에서 URL 캐시를 초기화하세요.
