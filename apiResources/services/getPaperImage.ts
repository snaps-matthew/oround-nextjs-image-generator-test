// import { GV } from '../../../../constants/globalVariable'
import CategoryCode from 'apiResources/constants/CategoryCode'
import CommonCode from "apiResources/constants/CommonCode";
import { COMMON_NAME } from 'apiResources/constants/commonName'
import {loadImage} from "apiResources/utils/loadImage";
import {resolve} from "path";
import Config from "apiResources/constants/Config";
// import stickerPaperClear from `${RESOURCE_CDN_URL}/paper/imgs/sticker_paper_clear.jpg'
// import BizPaperClear from `${RESOURCE_CDN_URL}/paper/imgs/trans_biz_paper_clear.jpg'
// import BizPaperWhite from `${RESOURCE_CDN_URL}/paper/imgs/trans_biz_paper_white.jpg'
// import paperCraft from `${RESOURCE_CDN_URL}/paper/imgs/paper_craft.jpg'
// import paperHologram from `${RESOURCE_CDN_URL}/paper/imgs/paper_hologram.jpg'
// import paperLinen from `${RESOURCE_CDN_URL}/paper/imgs/paper_linen.jpg'
// import paperPearl from `${RESOURCE_CDN_URL}/paper/imgs/paper_pearl.jpg'
// import paperFelt from `${RESOURCE_CDN_URL}/paper/imgs/paper_felt.jpg'
// import paperMetal from `${RESOURCE_CDN_URL}/paper/imgs/paper_metalsign.jpg'
// import paperAcrylicClear from `${RESOURCE_CDN_URL}/paper/imgs/rectangle.jpg'
// import paperAcrylicGlitterSilver from `${RESOURCE_CDN_URL}/paper/imgs/keyring-glitter-glass.jpg'
// import paperAcrylicGlitterGold from 'resources/paper./imgs/keyring-glitter-gold.jpg'
// import paperAcrylicHologram from `${RESOURCE_CDN_URL}/paper/imgs/keyring-hologram.jpg'
// import paperAcrylicWhite from `${RESOURCE_CDN_URL}/paper/imgs/keyring-white.jpg'
const { RESOURCE_CDN_URL } = Config;

export const getPaperImage = async(code:string) => {
  let paperImage = ''
  let paperName = ''
  const stickerPaperClear = `${RESOURCE_CDN_URL}/paper/imgs/sticker_paper_clear.jpg`;
  const BizPaperClear = `${RESOURCE_CDN_URL}/paper/imgs/trans_biz_paper_clear.jpg`;
  const BizPaperWhite = `${RESOURCE_CDN_URL}/paper/imgs/trans_biz_paper_white.jpg`;
  const paperCraft = `${RESOURCE_CDN_URL}/paper/imgs/paper_craft.jpg`;
  const paperHologram = `${RESOURCE_CDN_URL}/paper/imgs/paper_hologram.jpg`;
  const paperLinen = `${RESOURCE_CDN_URL}/paper/imgs/paper_linen.jpg`;
  const paperPearl = `${RESOURCE_CDN_URL}/paper/imgs/paper_pearl.jpg`;
  const paperFelt = `${RESOURCE_CDN_URL}/paper/imgs/paper_felt.jpg`;
  const paperMetal = `${RESOURCE_CDN_URL}/paper/imgs/paper_metalsign.jpg`;
  const paperAcrylicClear = `${RESOURCE_CDN_URL}/paper/imgs/rectangle.jpg`;
  const paperAcrylicGlitterSilver = `${RESOURCE_CDN_URL}/paper/imgs/keyring-glitter-glass.jpg`;
  const paperAcrylicGlitterGold = `${RESOURCE_CDN_URL}/paper/imgs/keyring-glitter-gold.jpg`;
  const paperAcrylicHologram = `${RESOURCE_CDN_URL}/paper/imgs/keyring-hologram.jpg`;
  const paperAcrylicWhite = `${RESOURCE_CDN_URL}/paper/imgs/keyring-white.jpg`;
  switch (code){
    case CommonCode.PAPER_CRAFT:
      paperImage = await loadImage(paperCraft);
      paperName = COMMON_NAME.PAPER_CRAFT
      break
    case CommonCode.PAPER_CRAFT175:
      paperImage = await loadImage(paperCraft);
      paperName = COMMON_NAME.PAPER_CRAFT175
      break
    case CommonCode.PAPER_HOLOGRAM:
      paperImage = await loadImage(paperHologram);
      paperName = COMMON_NAME.PAPER_HOLOGRAM
      break

    case CommonCode.PAPER_FAN_TRANSPARENCY:
      paperImage = await loadImage(stickerPaperClear);
      paperName = COMMON_NAME.PAPER_FAN_TRANSPARENCY
      break

    case CommonCode.PAPER_TRANSPARENCY:
    case CommonCode.PAPER_TRANSPARENCY_GLOSSY:
      // if(category === CategoryCode.TRANS_BUSINESS_CARD){
      //   if(code === CommonCode.PAPER_TRANSPARENCY){
      //     paperImage = await loadImage(BizPaperWhite));
      //     paperName = COMMON_NAME.PAPER_TRANSPARENCY
      //   }else{
      //     paperImage = await loadImage(BizPaperClear));
      //     paperName = COMMON_NAME.PAPER_TRANSPARENCY_GLOSSY
      //   }
      // }else{
        paperImage = await loadImage(stickerPaperClear);
        paperName = COMMON_NAME.PAPER_TRANSPARENCY
      // }
      break

    case CommonCode.PAPER_LINEN:
      paperImage = await loadImage(paperLinen);
      paperName = COMMON_NAME.PAPER_LINEN
      break

    case CommonCode.PAPER_PEARL:
      paperImage = await loadImage(paperPearl);
      paperName = COMMON_NAME.PAPER_PEARL
      break

    case CommonCode.PAPER_FELT:
      paperImage = await loadImage(paperFelt);
      paperName = COMMON_NAME.PAPER_FELT
      break

    case CommonCode.PAPER_METAL_BRUSH:
      paperImage = await loadImage(paperMetal);
      paperName = COMMON_NAME.PAPER_METAL_BRUSH
      break

    case CommonCode.PAPER_ACRYLIC_TRANSPARENCY:
      paperImage = await loadImage(paperAcrylicClear);
      paperName = COMMON_NAME.PAPER_ACRYLIC_TRANSPARENCY
      break

    case CommonCode.PAPER_ACRYLIC_GLITTER_SILVER:
      paperImage = await loadImage(paperAcrylicGlitterSilver);
      paperName = COMMON_NAME.PAPER_ACRYLIC_GLITTER_SILVER
      break

    case CommonCode.PAPER_ACRYLIC_GLITTER_GOLD:
      paperImage = await loadImage(paperAcrylicGlitterGold);
      paperName = COMMON_NAME.PAPER_ACRYLIC_GLITTER_GOLD
      break

    case CommonCode.PAPER_ACRYLIC_HOLOGRAM:
      paperImage = await loadImage(paperAcrylicHologram);
      paperName = COMMON_NAME.PAPER_ACRYLIC_HOLOGRAM
      break

    default:
      break
  }

  // 아크릴 미리보기때문에 예외처리
  // if(category === CATEGORY_NAME.ACRYLIC_KEYRING && code === COMMON_CODE.PAPER_ORIGINAL){
  //   paperImage = paperAcrylicWhite
  // }

  return {
    paperImage,
    paperName
  }
}

