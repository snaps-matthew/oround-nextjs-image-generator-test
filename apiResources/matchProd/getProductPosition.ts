import { TYPE } from 'apiResources/constants/type'
import PRODUCT_CODE from 'apiResources/constants/ProductCode'
import { isApparelProduct } from 'apiResources/matchProd/isApparelProduct'
// import { isCalendarProduct } from './isCalendarProduct'
/**
 * @description 상품추가시수정
 * */
const APPAREL_POSITION:any = {
  [PRODUCT_CODE.APPAREL_GILDAN_HA00]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_2300]: {
    frontPocket: {top: 224, left: 562},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 372, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_63V00]: {
    frontMiddle: {top: 340, left: 300},
    backMiddle: {top: 290, left: 300},
    backNeck: {top: 450, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_63V00L]: {
    frontMiddle: {top: 370, left: 300},
    backMiddle: {top: 320, left: 300},
    backNeck: {top: 440, left: 240},
    sideRight: {top: 406, left: 365},
    sideLeft: {top: 406, left: 365},
  },
  [PRODUCT_CODE.APPAREL_GILDAN_76500]: {
    frontMiddle: { top: 250, left: 300 },
    backMiddle: { top: 256, left: 300 },
    backNeck: { top: 370, left: 240 },
    sideRight: { top: 510, left: 365 },
    sideLeft: { top: 510, left: 365 }
  },
  [PRODUCT_CODE.APPAREL_GILDAN_76600]: {
    frontMiddle: {top: 250, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 370, left: 240},
    sideRight: {top: 507, left: 365},
    sideLeft: {top: 507, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_42000]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 295, left: 300},
    backNeck: {top: 450, left: 240},
    sideRight: {top: 520, left: 365},
    sideLeft: {top: 520, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_73800]: {
    frontTop: {top: 270, left: 560},
    backMiddle: {top: 290, left: 300},
    backNeck: {top: 436, left: 240},
    sideRight: {top: 500, left: 365},
    sideLeft: {top: 500, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_73800L]: {
    frontTop: {top: 280, left: 560},
    backMiddle: {top: 320, left: 300},
    backNeck: {top: 436, left: 240},
    sideRight: {top: 405, left: 365},
    sideLeft: {top: 405, left: 365}
  },
  [PRODUCT_CODE.APPAREL_AMERICAN_2001W]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 258, left: 300},
    backNeck: {top: 370, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_AMERICAN_2102W]: {
    frontMiddle: {top: 270, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 390, left: 240},
    sideRight: {top: 400, left: 365},
    sideLeft: {top: 400, left: 365},
  },
  [PRODUCT_CODE.APPAREL_AMERICAN_TR480W]: {
    frontMiddle: {top: 405, left: 303},
    backMiddle: {top: 436, left: 303},
    backNeck: {top: 380, left: 240},
    sideRight: {top: 430, left: 365},
    sideLeft: {top: 430, left: 365}
  },
  [PRODUCT_CODE.APPAREL_ANVIL_6750]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 370, left: 240},
    sideRight: {top: 520, left: 365},
    sideLeft: {top: 520, left: 365}
  },
  [PRODUCT_CODE.APPAREL_AAA_1301]: {
    frontMiddle: {top: 250, left: 300},
    backMiddle: {top: 290, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_085_CVT]: {
    frontMiddle: {top: 260, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 390, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_085_CVT_KIDS]: {
    frontMiddle: {top: 310, left: 297},
    backMiddle: {top: 214, left: 297},
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_195_BYP]: {
    frontPocket: {top: 222, left: 562},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 380, left: 240},
    sideRight: {top: 520, left: 365},
    sideLeft: {top: 520, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GLIMMER_331_ABP]: {
    frontPocket: {top: 236, left: 562},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 380, left: 240},
    sideRight: {top: 500, left: 365},
    sideLeft: {top: 500, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GLIMMER_315_AYB]: {
    frontPocket: {top: 236, left: 562},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 380, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_2000]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_76000]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_76000P]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_6800]: {
    frontTop: {top: 270, left: 560},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GILDAN_4BI00]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_CHAMPION_T245]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_OPM_P22001]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_00102_CVL]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_00102_CVL_KIDS]: {
    frontMiddle: {top: 310, left: 297},
    backMiddle: {top: 214, left: 297}
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_100777L]: {
    frontMiddle: {top: 419, left: 215},
    backMiddle: {top: 419, left: 215},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_100777M]: {
    frontMiddle: {top: 366, left: 223},
    backMiddle: {top: 366, left: 223},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_100777S]: {
    frontMiddle: {top: 523, left: 210},
    backMiddle: {top: 523, left: 210},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P22014M]: {
    frontMiddle: {top: 412, left: 280},
    backMiddle: {top: 412, left: 280},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P22015L]: {
    frontMiddle: {top: 450, left: 280},
    backMiddle: {top: 450, left: 280},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P22016]: {
    frontMiddle: {top: 612, left: 272},
    backMiddle: {top: 442, left: 272},
  },

  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P32111]: {
    frontMiddle: {top: 510, left: 215},
    backMiddle: {top: 510, left: 215},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P32112]: {
    frontMiddle: {top: 399, left: 279},
    backMiddle: {top: 399, left: 279},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P32113]: {
    frontMiddle: {top: 536, left: 223},
    backMiddle: {top: 536, left: 223},
  },
  [PRODUCT_CODE.APPAREL_ECO_BAG_OPM_P32114]: {
    frontMiddle: {top: 468, left: 223},
    backMiddle: {top: 468, left: 223},
  },


  [PRODUCT_CODE.APPAREL_LONG_OPM_100216]: {
    frontMiddle: {top: 288, left: 286},
    backMiddle: {top: 337, left: 300},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434},
    topRight: {top: 156, left: 316},
    topLeft: {top: 156, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100216_KIDS]: {
    frontMiddle: {top: 294, left: 310},
    backMiddle: {top: 348, left: 300},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100217]: {
    frontTop: {top: 297, left: 530},
    backMiddle: {top: 337, left: 300},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100217_KIDS]: {
    frontTop: {top: 350, left: 534},
    backMiddle: {top: 348, left: 300},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_PANTS_OPM_100218]: {
    bottomLeft: {top: 194, left: 550},
    bottomBack: {top: 154, left: 347}
  },
  [PRODUCT_CODE.APPAREL_PANTS_OPM_100218_KIDS]: {
    bottomLeft: {top: 232, left: 538},
    bottomBack: {top: 150, left: 327}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100219]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 350, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100219_KIDS]: {
    frontMiddle: {top: 306, left: 297},
    backMiddle: {top: 224, left: 297},
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100342]: {
    frontTop: {top: 297, left: 530},
    backMiddle: {top: 337, left: 300},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100342_KIDS]: {
    frontTop: {top: 350, left: 534},
    backMiddle: {top: 348, left: 300},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100346]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 350, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100347]: {
    frontMiddle: {top: 288, left: 286},
    backMiddle: {top: 337, left: 300},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_100348]: {
    frontTop: {top: 297, left: 530},
    backMiddle: {top: 337, left: 300},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434},
    topRight: {top: 151, left: 316},
    topLeft: {top: 151, left: 316}
  },
  [PRODUCT_CODE.APPAREL_POUCH_OPM_P22011M]: {
    frontMiddle: {top: 346, left: 214},
    backMiddle: {top: 346, left: 214},
  },
  [PRODUCT_CODE.APPAREL_POUCH_OPM_P22012M]: {
    frontMiddle: {top: 292, left: 202},
    backMiddle: {top: 292, left: 202},
  },
  [PRODUCT_CODE.APPAREL_POUCH_OPM_P22013L]: {
    frontMiddle: {top: 292, left: 202},
    backMiddle: {top: 293, left: 202},
  },
  [PRODUCT_CODE.APPAREL_PRINTSTAR_083_BBT]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GLIMMER_300_ACT]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_GLIMMER_300_ACT_KIDS]: {
    frontMiddle: { top: 310, left: 297 },
    backMiddle: { top: 214, left: 297 },
  },
  [PRODUCT_CODE.APPAREL_MOCCASOM_MCD1_TS2061]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_COMFORTCOLORS_1717]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_P32101]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 350, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_LONG_OPM_P32102]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 350, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_MUSCLE_OPM_P32103]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  },
  [PRODUCT_CODE.APPAREL_MOCCASOM_MCD3_TS105]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_MOCCASOM_MCD3_TS106]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_MOCCASOM_MCE1_TS109]: {
    frontMiddle: {top: 230, left: 273},
    backMiddle: {top: 266, left: 273},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 307, left: 434},
    sideLeft: {top: 307, left: 434}
  },
  [PRODUCT_CODE.APPAREL_ONE_PIECE_OPM_P32104]: {
    frontMiddle: {top: 240, left: 300},
    backMiddle: {top: 273, left: 300},
    backNeck: {top: 400, left: 240},
    sideRight: {top: 510, left: 365},
    sideLeft: {top: 510, left: 365}
  }
}

export const getProductPosition = (productCode:string, apparelSizeCode:string, sceneType:string, previewScene:any) => {
  if(!apparelSizeCode) apparelSizeCode = productCode
  if(isApparelProduct(productCode)){
    return APPAREL_POSITION[apparelSizeCode][sceneType]
  } else {
    return {
      left: 0, top: 0
    }
  }
}
