import { COMMON_NAME } from "apiResources/constants/commonName";
import COMMON_CODE from "apiResources/constants/CommonCode";
// import { GV } from '../constants/globalVariable'

export const getFrameCode = (type:string) => {
  let code = ''
  switch (type) {
    case COMMON_NAME.FRAME_CODE_FRONT_MIDDLE:
      code = COMMON_CODE.FRAME_CODE_FRONT_MIDDLE
      break
    case COMMON_NAME.FRAME_CODE_FRONT_TOP:
      code = COMMON_CODE.FRAME_CODE_FRONT_TOP
      break
    case COMMON_NAME.FRAME_CODE_FRONT_POCKET:
      code = COMMON_CODE.FRAME_CODE_FRONT_POCKET
      break
    case COMMON_NAME.FRAME_CODE_BACK_MIDDLE:
      code = COMMON_CODE.FRAME_CODE_BACK_MIDDLE
      break
    case COMMON_NAME.FRAME_CODE_BACK_NECK:
      code = COMMON_CODE.FRAME_CODE_BACK_NECK
      break
    case COMMON_NAME.FRAME_CODE_SIDE_RIGHT:
      code = COMMON_CODE.FRAME_CODE_SIDE_RIGHT
      break
    case COMMON_NAME.FRAME_CODE_SIDE_LEFT:
      code = COMMON_CODE.FRAME_CODE_SIDE_LEFT
      break
    case COMMON_NAME.FRAME_CODE_TOP_LEFT:
      code = COMMON_CODE.FRAME_CODE_TOP_LEFT
      break
    case COMMON_NAME.FRAME_CODE_TOP_RIGHT:
      code = COMMON_CODE.FRAME_CODE_TOP_RIGHT
      break
    case COMMON_NAME.FRAME_CODE_BOTTOM_LEFT:
      code = COMMON_CODE.FRAME_CODE_BOTTOM_LEFT
      break
    case COMMON_NAME.FRAME_CODE_BOTTOM_RIGHT:
      code = COMMON_CODE.FRAME_CODE_BOTTOM_RIGHT
      break
    case COMMON_NAME.FRAME_CODE_BOTTOM_BACK:
      code = COMMON_CODE.FRAME_CODE_BOTTOM_BACK
      break

    case COMMON_NAME.FRAME_CODE_COVER:
      code = COMMON_CODE.FRAME_CODE_COVER
      break
    case COMMON_NAME.FRAME_CODE_PAGE:
      code = COMMON_CODE.FRAME_CODE_PAGE
      break
    case COMMON_NAME.FRAME_CODE_LOW_PAGE:
      code = COMMON_CODE.FRAME_CODE_LOW_PAGE
      break
    default:
      break
  }
  return code
}

// export const getFrameType = (code) => {
//   let type = ''
//   switch (code) {
//     case COMMON_CODE.FRAME_CODE_FRONT_MIDDLE:
//       type = COMMON_NAME.FRAME_CODE_FRONT_MIDDLE
//       break
//     case COMMON_CODE.FRAME_CODE_FRONT_TOP:
//       type = COMMON_NAME.FRAME_CODE_FRONT_TOP
//       break
//     case COMMON_CODE.FRAME_CODE_FRONT_POCKET:
//       type = COMMON_NAME.FRAME_CODE_FRONT_POCKET
//       break
//     case COMMON_CODE.FRAME_CODE_BACK_MIDDLE:
//       type = COMMON_NAME.FRAME_CODE_BACK_MIDDLE
//       break
//     case COMMON_CODE.FRAME_CODE_BACK_NECK:
//       type = COMMON_NAME.FRAME_CODE_BACK_NECK
//       break
//     case COMMON_CODE.FRAME_CODE_SIDE_RIGHT:
//       type = COMMON_NAME.FRAME_CODE_SIDE_RIGHT
//       break
//     case COMMON_CODE.FRAME_CODE_SIDE_LEFT:
//       type = COMMON_NAME.FRAME_CODE_SIDE_LEFT
//       break
//     case COMMON_CODE.FRAME_CODE_TOP_LEFT:
//       type = COMMON_NAME.FRAME_CODE_TOP_LEFT
//       break
//     case COMMON_CODE.FRAME_CODE_TOP_RIGHT:
//       type = COMMON_NAME.FRAME_CODE_TOP_RIGHT
//       break
//     case COMMON_CODE.FRAME_CODE_BOTTOM_LEFT:
//       type = COMMON_NAME.FRAME_CODE_BOTTOM_LEFT
//       break
//     case COMMON_CODE.FRAME_CODE_BOTTOM_RIGHT:
//       type = COMMON_NAME.FRAME_CODE_BOTTOM_RIGHT
//       break
//     case COMMON_CODE.FRAME_CODE_BOTTOM_BACK:
//       type = COMMON_NAME.FRAME_CODE_BOTTOM_BACK
//       break
//     case COMMON_CODE.WHITE_HANDLE:
//       type = COMMON_NAME.WHITE_HANDLE
//       break
//     case COMMON_CODE.BLACK_HANDLE:
//       type = COMMON_NAME.BLACK_HANDLE
//       break
//     case COMMON_CODE.BROWN_HANDLE:
//       type = COMMON_NAME.BROWN_HANDLE
//       break
//     default:
//       break
//   }
//   return type
// }
//
// export const getFrameTitle = (name) => {
//   let title = ''
//   switch (name) {
//     case COMMON_NAME.FRAME_CODE_FRONT_MIDDLE:
//       title = GV.LANG.STR.FRAME_CODE.FRONT_MIDDLE
//       break
//     case COMMON_NAME.FRAME_CODE_FRONT_TOP:
//       title = GV.LANG.STR.FRAME_CODE.FRONT_TOP
//       break
//     case COMMON_NAME.FRAME_CODE_FRONT_POCKET:
//       title = GV.LANG.STR.FRAME_CODE.FRONT_POCKET
//       break
//     case COMMON_NAME.FRAME_CODE_BACK_MIDDLE:
//       title = GV.LANG.STR.FRAME_CODE.BACK_MIDDLE
//       break
//     case COMMON_NAME.FRAME_CODE_BACK_NECK:
//       title = GV.LANG.STR.FRAME_CODE.BACK_NECK
//       break
//     case COMMON_NAME.FRAME_CODE_SIDE_RIGHT:
//       title = GV.LANG.STR.FRAME_CODE.SIDE_RIGHT
//       break
//     case COMMON_NAME.FRAME_CODE_SIDE_LEFT:
//       title = GV.LANG.STR.FRAME_CODE.SIDE_LEFT
//       break
//     case COMMON_NAME.FRAME_CODE_TOP_LEFT:
//       title = GV.LANG.STR.FRAME_CODE.TOP_LEFT
//       break
//     case COMMON_NAME.FRAME_CODE_TOP_RIGHT:
//       title = GV.LANG.STR.FRAME_CODE.TOP_RIGHT
//       break
//     case COMMON_NAME.FRAME_CODE_BOTTOM_LEFT:
//       title = GV.LANG.STR.FRAME_CODE.BOTTOM_LEFT
//       break
//     case COMMON_NAME.FRAME_CODE_BOTTOM_RIGHT:
//       title = GV.LANG.STR.FRAME_CODE.BOTTOM_RIGHT
//       break
//     case COMMON_NAME.FRAME_CODE_BOTTOM_BACK:
//       title = GV.LANG.STR.FRAME_CODE.BOTTOM_BACK
//       break
//     default:
//       break
//   }
//   return title
// }
