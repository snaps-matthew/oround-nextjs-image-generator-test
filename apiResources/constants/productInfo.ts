export interface OffsetState {
 top: number;
 left: number;
}

export interface WrapperState {
  width: number;
  height: number;
}

export interface ProductGroupInfoState {
  [key: string]: {
    wrapperSize?: WrapperState;   // 편집화면에서 가장 큰 길이 (보통 어페럴의 경우 1000px 사이즈를 기준으로 일반적인 상황하고 달라서 넣는다)
    offset?: {  // 스킨으로 부터 씬의 위치
      [key: string]: OffsetState;
    };
  };
}


// 기본적으로 상품 그룹에 따라 번들을 호출하지만, 그룹이 같고 상품에 따라 달라야 하는 경우 해당 상품의 번들로 연결한다.

const productInfo: ProductGroupInfoState = {
  /** frame */
  '1010010001': { // 원목 액자
    //todo 여기 원목액자 wrapper 잡아줘야함
  },
  '1010020001': { // 알루미늄 액자
  },
  '1010030001': { // 메탈액자
  },
  '1010040001': { // 캔버스 액자
  },
  '1010050001': { // 프리미엄 아크릴액자
  },
  '1010060001': { // 포스터
  },
  '1010070001': { // 대형사진인화
  },
  '1010080001': { // 포백스액자
  },
  '1010090001': { // 보드액자
  },

  /** sticker */
  '1021010001': { // 스티커
  },

  /** phone */
  '1030010001': { //갤럭시S21ultra 젤리
  },
  '1030010002': { // 갤럭시S21ultra 하드
  },
  '1030020001': { // 갤럭시S21+ 젤리
  },
  '1030020002': { // 갤럭시S21+ 하드
  },
  '1030030001': { // 갤럭시S21 젤리
  },
  '1030030002': { // 갤럭시S21 하드
  },
  '1030040001': { // 갤럭시S20ultra 하드
  },
  '1030040002': { // 갤럭시S20ultra
  },
  '1030050001': { // 갤럭시S20+
  },
  '1030050002': { // 갤럭시S20+
  },
  '1030060001': { // 갤럭시S20
  },
  '1030060002': { // 갤럭시S20
  },
  '1030070001': { // 갤럭시노트20ultra
  },
  '1030070002': { // 갤럭시노트20ultra
  },
  '1030080001': { // 갤럭시노트20
  },
  '1030080002': { // 갤럭시노트20
  },
  '1030090001': { // 갤럭시노트10+
  },
  '1030090002': { // 갤럭시노트10+
  },
  '1030100001': { // 갤럭시노트10
  },
  '1030100002': { // 갤럭시노트10
  },
  '1030110001': { // 아이폰X
  },
  '1030110002': { // 아이폰X
  },
  '1030120001': { // 아이폰XS
  },
  '1030120002': { // 아이폰XS
  },
  '1030130001': { // 아이폰XR
  },
  '1030130002': { // 아이폰XR
  },
  '1030140001': { // 아이폰XSMax
  },
  '1030150001': { // 아이폰11
  },
  '1030150002': { // 아이폰11
  },
  '1030160001': { // 아이폰11 pro
  },
  '1030160002': { // 아이폰11 pro
  },
  '1030170001': { // 아이폰11 proMax
  },
  '1030170002': { // 아이폰11 proMax
  },
  '1030180001': { // 아이폰12
  },
  '1030180002': { // 아이폰12
  },
  '1030190001': { // 아이폰12pro
  },
  '1030190002': { // 아이폰12pro
  },
  '1030200001': { // 아이폰12mini
  },
  '1030200002': { // 아이폰12mini
  },
  '1030210001': { // 아이폰12proMax
  },
  '1030210002': { // 아이폰12proMax
  },

  /** goods */
  '1040010001': { // acrylicKeyring

  },
  '1040020001': { // acrylicStand

  },
  '1040030001': { // note
    wrapperSize: { width: 389, height: 465 },
    offset: {
      page: { top: 11, left: 42 },
    }
  },
  '1040040001': { // spring note
    wrapperSize: { width: 386, height: 460 },
    offset: {
      page: { top: 11, left: 42 },
    }
  },
  '1040050001': { // card flat
    wrapperSize: { width: 381, height: 517 },
    offset: {
      page: { top: 40, left: 43 },
    }
  },
  '1040050002': { // card folder
    wrapperSize: { width: 343, height: 495 },
    offset: {
      page: { top: 29, left: 25 },
    }
  },
  '1040060001': { // tinCase
    wrapperSize: { width: 429, height: 654 },
    offset: {
      page: { top: 89, left: 75 },
    }
  },
  '1040070001': { // smartTok circle
    wrapperSize: { width: 382, height: 382 },
    offset: {
      page: { top: 35, left: 35 },
    }
  },
  '1040070002': { // smartTok heart
    wrapperSize: { width: 402, height: 370 },
    offset: {
      page: { top: 32, left: 30 },
    }
  },
  '1040080001': { // airpodsCase
    wrapperSize: { width: 549, height: 534 },
    offset: {
      page: { top: 88, left: 159 },
    }
  },
  '1040090001': { // airpodsProCase
    wrapperSize: { width: 745, height: 532 },
    offset: {
      page: { top: 138, left: 221 },
    }
  },
  '1040100001': { // buzCase
    wrapperSize: { width: 585, height: 395 },
    offset: {
      page: { top: 152, left: 164 },
    }
  },
  '1040110001': { // pinButton circle
    wrapperSize: { width: 400, height: 400 }
  },
  '1040110002': { // pinButton rectangle
    wrapperSize: { width: 400, height: 400 }
  },
  '1040110003': { // pinButton heart
    wrapperSize: { width: 385, height: 352 }
  },
  '1040120001': { // mirrorButton circle
    wrapperSize: { width: 400, height: 400 }
  },
  '1040130001': { // magneticButton circle
    wrapperSize: { width: 400, height: 400 }
  },
  '1040130002': { // magneticButton rectangle
    wrapperSize: { width: 400, height: 400 }
  },
  '1040130003': { // magneticButton heart
    wrapperSize: { width: 385, height: 352 }
  },

  /** apparel */
  '1050010001': { //길단 20수 스탠다드 핏 라운드 반팔티
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 273, left: 300 }
    }
  },
  '1050010002': { //길단 18수 릴렉스핏 라운드 반팔
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 273, left: 300 }
    }
  },
  '1050010003': { //수피마 모달 머슬핏 반팔 티셔츠
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 273, left: 300 }
    }
  },
  '1050010004': { //아메리칸 어패럴 30수 프리미엄 반팔
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 258, left: 300 }
    }
  },
  '1050010005': { //아메리칸 어패럴 30수 프리미엄 반팔(여)
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 270, left: 300 },
      back: { top: 274, left: 300 }
    }
  },
  '1050010006': { //프린트스타 17수 라운드 반팔
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 310, left: 300 },
      back: { top: 214, left: 300 }
    }
  },
  '1050020001': { //프린트스타 17수 라운드 긴팔
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 273, left: 300 }
    }
  },
  '1050020002': { //프린트스타 17수 라운드 긴팔
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 310, left: 300 },
      back: { top: 214, left: 300 }
    }
  },
  '1050030001': { //프린트스타 베이직 맨투맨
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 230, left: 300 },
      back: { top: 266, left: 300 }
    }
  },
  '1050030002': { //오프린트미 릴렉스 핏 맨투맨
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 262, left: 300 },
      back: { top: 294, left: 300 }
    }
  },
  '1050030003': { //글리머 드라이 기모 맨투맨
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 262, left: 300 },
      back: { top: 294, left: 300 }
    }
  },
  '1050030004': { //프린트스타 베이직 맨투맨 유아동
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 309, left: 300 },
      back: { top: 230, left: 300 }
    }
  },
  '1050040001': { //오프린트미 릴렉스 핏 원피스
    wrapperSize: { width: 1000, height: 1500 },
    offset: {
      front: { top: 240, left: 300 },
      back: { top: 273, left: 300 }
    }
  },
  '1050050001': { //프린트스타 베이직 후드집업
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 297, left: 530 },
      back: { top: 337, left: 300 }
    }
  },
  '1050050002': { //글리머 드라이 기모 후드 집업
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 297, left: 530 },
      back: { top: 337, left: 300 }
    }
  },
  '1050050003': { //프린트스타 베이직 후드집업
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 350, left: 534 },
      back: { top: 348, left: 300 }
    }
  },
  '1050060001': { //프린트스타 베이직 후드티
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 281, left: 286 },
      back: { top: 337, left: 300 }
    }
  },
  '1050060002': { //글리머 드라이 기모 후드티
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 281, left: 300 },
      back: { top: 337, left: 300 }
    }
  },
  '1050060003': { //프린트스타 베이직 후드티
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 294, left: 300 },
      back: { top: 348, left: 300 }
    }
  },

  '1050070005': { //오프린트미 심플 토트백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 399, left: 280 }
    }
  },
  '1050070002': { //오프린트미 스탠다드 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 414, left: 280 }
    }
  },

  '1050070001': { //오프린트미 베이직 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 389, left: 272 }
    }
  },
  '1050070003': { //오프린트미 투포켓 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 613, left: 272 }
    }
  },
  '1050070004': { //오프린트미 크로스 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 530, left: 272 }
    }
  },
  '1050070007': { //오프린트미 스퀘어 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 474, left: 272 }
    }
  },
  '1050070006': { //오프린트미 심플 숄더백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 510, left: 272 }
    }
  },
  '1050080002': { //오프린트미 스탠다드 파우치
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 353, left: 272 }
    }
  },

  '1050070008': { //오프린트미 베이직 에코백
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 523, left: 214 }
    }
  },
  '1050080001': { //오프린트미 데일리 파우치
    wrapperSize: { width: 1000, height: 1000 },
    offset: {
      front: { top: 347, left: 214 }
    }
  }

};

export default productInfo;
