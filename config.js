/* =========================================================
 *  청첩장 정보 설정 파일
 *  이 파일만 수정하면 청첩장 내용이 모두 바뀝니다.
 * ========================================================= */
const CONFIG = {
  // 예식 일시 (24시간제)
  date: { year: 2027, month: 2, day: 20, hour: 11, minute: 10 },

  groom: {
    name: "박근범",
    order: "차남",
    father: { name: "박무용", phone: "010-0000-0000" },
    mother: { name: "이태순", phone: "010-0000-0000" },
    phone: "010-0000-0000",
  },
  bride: {
    name: "이지현",
    order: "장녀",
    father: { name: "이경석", phone: "010-0000-0000" },
    mother: { name: "김향신", phone: "010-0000-0000" },
    phone: "010-0000-0000",
  },

  // 인사말 (줄바꿈은 \n)
  greeting:
    "저희 두 사람이 하나가 되는\n뜻 깊은 날에\n소중한 걸음 하시어 함께 해주시어\n자리를 빛내 주세요.",

  // 메인 사진 위 노란 손글씨·하트 장식
  // 사진에 이미 글씨가 들어가 있다면 false로 바꾸세요
  heroDeco: false,

  // 사진 (images 폴더에 넣고 파일명 맞추기)
  mainPhoto: "images/main.jpg",
  gallery: [
    "images/gallery1.jpg", "images/gallery2.jpg", "images/gallery3.jpg", "images/gallery4.jpg",
    "images/gallery5.jpg", "images/gallery6.jpg", "images/gallery7.jpg", "images/gallery8.jpg",
  ],

  venue: {
    name: "웨스턴베니비스신도림",
    floor: "7층",
    hall: "그레이스홀",
    address: "서울특별시 OO구 OO로 123",
    tel: "02-000-0000",
    // 지도 링크: 각 지도 앱에서 장소 검색 후 '공유 > 링크 복사'한 주소로 바꾸세요
    naverMap: "https://map.naver.com/",
    kakaoMap: "https://map.kakao.com/",
    tmap: "https://tmap.life/",
    // 지도 이미지(선택). 캡처한 약도를 images/map.jpg로 넣으면 표시됩니다
    mapImage: "images/map.jpg",
    transport: [
      { title: "지하철", desc: "2호선 OO역 3번 출구 도보 5분" },
      { title: "버스", desc: "간선 000, 000 / 지선 0000\nOO웨딩홀 정류장 하차" },
      { title: "주차", desc: "건물 지하 주차장 이용 (2시간 무료)" },
    ],
  },

  accounts: {
    groom: [
      { role: "신랑", name: "박근범", bank: "신한은행", number: "000-000-000000" },
      { role: "신랑 아버지", name: "박무용", bank: "국민은행", number: "000000-00-000000" },
      { role: "신랑 어머니", name: "이태순", bank: "우리은행", number: "0000-000-000000" },
    ],
    bride: [
      { role: "신부", name: "이지현", bank: "카카오뱅크", number: "3333-00-0000000" },
      { role: "신부 아버지", name: "이경석", bank: "하나은행", number: "000-000000-00000" },
      { role: "신부 어머니", name: "김향신", bank: "농협", number: "000-0000-0000-00" },
    ],
  },

  // 축하 화환 주문 링크 (사용 안 하면 "" 로 비워두기)
  flowerLink: "",

  // 카카오톡 공유: https://developers.kakao.com 에서 앱 생성 후 JavaScript 키 입력
  // 플랫폼 > Web 사이트 도메인에 GitHub Pages 주소 등록 필요
  kakaoKey: "",
  // 공유 썸네일 (반드시 https 전체 주소)
  shareImage: "https://gb9696.github.io/weddingTest/images/main.jpg",

  // 배경음악 (선택). images 폴더가 아닌 루트에 bgm.mp3 넣고 "bgm.mp3"로 지정
  bgm: "",
};
