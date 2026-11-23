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
    father: { name: "박무용", phone: "010-3539-3713" },
    mother: { name: "이태순", phone: "010-5483-4114" },
    phone: "010-4703-6115",
  },
  bride: {
    name: "이지현",
    order: "장녀",
    father: { name: "이경석", phone: "010-3698-1988" },
    mother: { name: "김향신", phone: "010-6345-5149" },
    phone: "010-6546-5149",
  },

  // 인사말 (줄바꿈은 \n)
  greeting:
    "저희 두 사람이 하나가 되는\n뜻 깊은 날에\n소중한 걸음 하시어 함께 해주시어\n자리를 빛내 주세요.",

  // 메인 사진 위 노란 손글씨·하트 장식
  // 사진에 이미 글씨가 들어가 있다면 false로 바꾸세요
  heroDeco: true,

  // 사진 (images 폴더에 넣고 파일명 맞추기)
  mainPhoto: "images/main.jpg?v=202611232332",
  gallery: [
    "images/gallery1.jpg?v=202611232208",
    "images/gallery2.jpg?v=202611232208",
    "images/gallery3.jpg?v=202611232208",
    "images/gallery4.jpg?v=202611232208",
    "images/gallery5.jpg?v=202611232208",
    "images/gallery6.jpg?v=202611232208",
    "images/gallery7.jpg?v=202611232208",
    "images/gallery8.jpg?v=202611232208",
    "images/gallery9.jpg?v=202611232208",
    "images/gallery10.jpg?v=202611232208",
    "images/gallery11.jpg?v=202611232208",
    "images/gallery12.jpg?v=202611232208",
    "images/gallery13.jpg?v=202611232208",
    "images/gallery14.jpg?v=202611232208",
    "images/gallery15.jpg?v=202611232208",
    "images/gallery16.jpg?v=202611232208",
    "images/gallery17.jpg?v=202611232208",
    "images/gallery18.jpg?v=202611232208",
    "images/gallery19.jpg?v=202611232208",
    "images/gallery20.jpg?v=202611232208",
    "images/gallery21.jpg?v=202611232208",
  ],
  // 처음에 보여줄 사진 수 (나머지는 [사진 더보기]로 펼침, 3의 배수 추천)
  galleryFirst: 9,

  venue: {
    name: "웨스턴베니비스 신도림",
    brand: "웨스턴베니비스",
    branch: "신도림",
    floor: "7층",
    hall: "그레이스홀",
    address: "서울특별시 구로구 새말로 97 신도림테크노마트 7층",
    tel: "02-2111-7000",
    // 지도 중심 좌표 (주소로 위치를 못 찾을 때만 사용)
    lat: 37.5072,
    lng: 126.8903,
    // 지도 앱 바로가기 (검색 결과로 연결)
    naverMap: "https://map.naver.com/p/search/" + encodeURIComponent("웨스턴베니비스 신도림"),
    kakaoMap: "https://map.kakao.com/link/search/" + encodeURIComponent("웨스턴베니비스 신도림"),
    tmap: "tmap://search?name=" + encodeURIComponent("웨스턴베니비스 신도림"),
    // 약도 이미지(선택). images/map.jpg 로 넣으면 표시되고, 없으면 영역이 숨겨집니다
    mapImage: "images/map.jpg",
    transport: [
      { title: "지하철", desc: "1·2호선 신도림역 2번 또는 3번 출구\n테크노마트 판매동 지하 1층과 바로 연결" },
      { title: "버스", desc: "간선·광역·일반: 160, 600, 662, 10\n지선: 5619, 6411, 6511, 6512" },
      { title: "주차", desc: "신도림테크노마트 주차장 이용\n내비게이션 검색\n· 신주소: 서울시 구로구 새말로 97, 7F\n· 구주소: 서울시 구로구 구로동 3-25 신도림테크노마트 7F" },
    ],
  },

  accounts: {
    groom: [
      { role: "신랑", name: "박근범", bank: "우리은행", number: "1002-762-431397" },
      { role: "신랑 아버지", name: "박무용", bank: "농협", number: "352-0812-8577-53" },
      { role: "신랑 어머니", name: "이태순", bank: "농협", number: "773-02-274152" },
    ],
    bride: [
      { role: "신부", name: "이지현", bank: "토스뱅크", number: "1001-1650-1485" },
      { role: "신부 아버지", name: "이경석", bank: "농협", number: "178466-52-065372" },
      { role: "신부 어머니", name: "김향신", bank: "농협", number: "979-12-188616" },
    ],
  },

  // 송금 버튼: 계좌마다 [송금]을 누르면 토스로 보내기 / 계좌번호 복사 중 선택
  // (특정 계좌에 kakaopay: "https://qr.kakaopay.com/..." 를 넣으면 그 계좌만 카카오페이 버튼 추가)

  // 노란 하트가 천천히 떨어지는 효과 (끄려면 false)
  effect: false,

  // 축하 화환 주문 링크 (사용 안 하면 "" 로 비워두기)
  flowerLink: "",

  // 카카오톡 공유: https://developers.kakao.com 에서 앱 생성 후 JavaScript 키 입력
  // 플랫폼 > Web 사이트 도메인에 GitHub Pages 주소 등록 필요
  kakaoKey: "d3f8f4b4089c74d6d736deaab9576bdf",
  // 공유 썸네일 (반드시 https 전체 주소)
  shareImage: "https://wedding-two-blue.vercel.app/images/main.jpg",

  // 배경음악 (선택). images 폴더가 아닌 루트에 bgm.mp3 넣고 "bgm.mp3"로 지정
  bgm: "",
};
