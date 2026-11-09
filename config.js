// 이 파일만 수정해도 대부분의 청첩장 내용을 변경할 수 있습니다.
window.WEDDING = {
  couple: { groom: '민준', bride: '서연' },
  weddingDate: '2027-05-15T12:30:00+09:00',
  dateDisplay: '2027년 5월 15일 토요일',
  timeDisplay: '오후 12시 30분',
  venue: { name: '라온웨딩홀', hall: '그랜드홀 3층', address: '서울특별시 강남구 테헤란로 123', query: '라온웨딩홀 서울' },
  message: ['서로의 일상에 조용히 스며든 두 사람이', '이제 같은 장면을 바라보며 걸어가려 합니다.', '저희의 새로운 시작을 함께해 주세요.'],
  parents: { groom: '아버지 · 어머니의 아들', bride: '아버지 · 어머니의 딸' },
  accounts: [
    { label: '신랑 측', bank: 'OO은행', number: '123-456-789012', holder: '김민준' },
    { label: '신부 측', bank: 'OO은행', number: '987-654-321098', holder: '이서연' }
  ],
  // 사진을 images 폴더에 넣고 경로를 변경하세요. 파일이 없으면 안내용 플레이스홀더가 표시됩니다.
  heroImage: '', // 예: 'images/main.jpg'
  gallery: [
    { src: '', alt: '첫 번째 사진' },
    { src: '', alt: '두 번째 사진' },
    { src: '', alt: '세 번째 사진' },
    { src: '', alt: '네 번째 사진' },
    { src: '', alt: '다섯 번째 사진' },
    { src: '', alt: '여섯 번째 사진' }
  ],
  // Kakao Developers JavaScript 키를 등록한 경우에만 SDK 공유를 사용합니다.
  kakaoJavaScriptKey: '',
  // 공개 URL을 배포 후 입력하면 공유 주소를 고정할 수 있습니다. 비워두면 현재 주소 사용.
  siteUrl: ''
};
