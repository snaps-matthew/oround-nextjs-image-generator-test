import  CommonCode from 'apiResources/constants/CommonCode'
/**
 * @description 상품추가시수정
 * */

/**
 * 용지에 맞춘 하나의 데이터는 아래와 같은 구조를 갖는다.

 {
   paperCode: '',
   colorCode: '',
   backCode: '',
   originalCanvas: null,            // 스코딕스까지 합성한 파일을 원본이라고 한다.
   thumbnailCanvas: null,           // 모든 합성을 한 canvas (스코딧스, 용지)
   thumbnailImage: null,            // thumbnailCanvas 파일의 blob
   detailThumbCanvasList: null,     // 갤러리 썸네일 || 옵션별 썸네일 캔버스 리스트 객체(현재 포토북, 스티커에서만 사용)
   detailThumbImages: null,
 }

 *
 * */
export const PAPER = {
  BASE_DATA: {
    originalCanvas: null,         // 스코딕스까지 합성한 파일을 원본이라고 한다.

    thumbnailCanvas: null,        // 모든 합성을 한 캔버스 (스코딧스, 용지)
    thumbnailImage: null,

    detailThumbCanvasList: null,  // 갤러리 썸네일 || 옵션별 썸네일 캔버스 리스트 객체(현재 포토북, 스티커에서만 사용)
    detailThumbImages: null,
  },

  // PHONE_CASE_TRANSFER_HARD: {
  //   paperCode: COMMON_CODE.PHONE_CASE_HARD.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  //
  // PHONE_CASE_TRANSFER_BUMPER: {
  //   paperCode: COMMON_CODE.PHONE_CASE_BUMPER.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  //
  // ORIGINAL: {
  //   paperCode: COMMON_CODE.PAPER_ORIGINAL.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  // FRAME_WOOD: {
  //   paperCode: COMMON_CODE.PAPER_SOLID_WOOD_FRAME.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  //
  // STANDARD: {
  //   paperCode: COMMON_CODE.PAPER_STANDARD.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  // TRANSPARENCY: {
  //   paperCode: COMMON_CODE.PAPER_TRANSPARENCY.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },
  // REMOVABLE: {
  //   paperCode: COMMON_CODE.PAPER_REMOVABLE.CODE,
  //   colorCode: COMMON_CODE.NONE.CODE,
  //   backCode: COMMON_CODE.NONE.CODE
  // },


}
