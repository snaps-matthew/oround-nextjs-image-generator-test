// import { GV } from '../../../../constants/globalVariable'
import CategoryCode from 'apiResources/constants/CategoryCode'
import CommonCode from "apiResources/constants/CommonCode";
import { COMMON_NAME } from 'apiResources/constants/commonName'
import {loadImage} from "apiResources/utils/loadImage";
import {resolve} from "path";
// import stickerPaperClear from 'resources/paper/imgs/sticker_paper_clear.jpg'
// import BizPaperClear from 'resources/paper/imgs/trans_biz_paper_clear.jpg'
// import BizPaperWhite from 'resources/paper/imgs/trans_biz_paper_white.jpg'
// import paperCraft from 'resources/paper/imgs/paper_craft.jpg'
// import paperHologram from 'resources/paper/imgs/paper_hologram.jpg'
// import paperLinen from 'resources/paper/imgs/paper_linen.jpg'
// import paperPearl from 'resources/paper/imgs/paper_pearl.jpg'
// import paperFelt from 'resources/paper/imgs/paper_felt.jpg'
// import paperMetal from 'resources/paper/imgs/paper_metalsign.jpg'
// import paperAcrylicClear from 'resources/paper/imgs/rectangle.jpg'
// import paperAcrylicGlitterSilver from 'resources/paper/imgs/keyring-glitter-glass.jpg'
// import paperAcrylicGlitterGold from 'resources/paper./imgs/keyring-glitter-gold.jpg'
// import paperAcrylicHologram from 'resources/paper/imgs/keyring-hologram.jpg'
// import paperAcrylicWhite from 'resources/paper/imgs/keyring-white.jpg'

export const getPaperImage = async(code:string) => {
  let paperImage = ''
  let paperName = ''
  const stickerPaperClear = 'resources/paper/imgs/sticker_paper_clear.jpg'
  const BizPaperClear = 'resources/paper/imgs/trans_biz_paper_clear.jpg'
  const BizPaperWhite = 'resources/paper/imgs/trans_biz_paper_white.jpg'
  const paperCraft = 'resources/paper/imgs/paper_craft.jpg'
  const paperHologram = 'resources/paper/imgs/paper_hologram.jpg'
  const paperLinen = 'resources/paper/imgs/paper_linen.jpg'
  const paperPearl = 'resources/paper/imgs/paper_pearl.jpg'
  const paperFelt = 'resources/paper/imgs/paper_felt.jpg'
  const paperMetal = 'resources/paper/imgs/paper_metalsign.jpg'
  const paperAcrylicClear = 'resources/paper/imgs/rectangle.jpg'
  const paperAcrylicGlitterSilver = 'resources/paper/imgs/keyring-glitter-glass.jpg'
  const paperAcrylicGlitterGold = 'resources/paper./imgs/keyring-glitter-gold.jpg'
  const paperAcrylicHologram = 'resources/paper/imgs/keyring-hologram.jpg'
  const paperAcrylicWhite = 'resources/paper/imgs/keyring-white.jpg'
  switch (code){
    case CommonCode.PAPER_CRAFT:
      paperImage = await loadImage(resolve(__dirname, paperCraft));
      paperName = COMMON_NAME.PAPER_CRAFT
      break
    case CommonCode.PAPER_CRAFT175:
      paperImage = await loadImage(resolve(__dirname, paperCraft));
      paperName = COMMON_NAME.PAPER_CRAFT175
      break
    case CommonCode.PAPER_HOLOGRAM:
      paperImage = await loadImage(resolve(__dirname, paperHologram));
      paperName = COMMON_NAME.PAPER_HOLOGRAM
      break

    case CommonCode.PAPER_FAN_TRANSPARENCY:
      paperImage = await loadImage(resolve(__dirname, stickerPaperClear));
      paperName = COMMON_NAME.PAPER_FAN_TRANSPARENCY
      break

    case CommonCode.PAPER_TRANSPARENCY:
    case CommonCode.PAPER_TRANSPARENCY_GLOSSY:
      // if(category === CategoryCode.TRANS_BUSINESS_CARD){
      //   if(code === CommonCode.PAPER_TRANSPARENCY){
      //     paperImage = await loadImage(resolve(__dirname, BizPaperWhite));
      //     paperName = COMMON_NAME.PAPER_TRANSPARENCY
      //   }else{
      //     paperImage = await loadImage(resolve(__dirname, BizPaperClear));
      //     paperName = COMMON_NAME.PAPER_TRANSPARENCY_GLOSSY
      //   }
      // }else{
        paperImage = await loadImage(resolve(__dirname, stickerPaperClear));
        paperName = COMMON_NAME.PAPER_TRANSPARENCY
      // }
      break

    case CommonCode.PAPER_LINEN:
      paperImage = await loadImage(resolve(__dirname, paperLinen));
      paperName = COMMON_NAME.PAPER_LINEN
      break

    case CommonCode.PAPER_PEARL:
      paperImage = await loadImage(resolve(__dirname, paperPearl));
      paperName = COMMON_NAME.PAPER_PEARL
      break

    case CommonCode.PAPER_FELT:
      paperImage = await loadImage(resolve(__dirname, paperFelt));
      paperName = COMMON_NAME.PAPER_FELT
      break

    case CommonCode.PAPER_METAL_BRUSH:
      paperImage = await loadImage(resolve(__dirname, paperMetal));
      paperName = COMMON_NAME.PAPER_METAL_BRUSH
      break

    case CommonCode.PAPER_ACRYLIC_TRANSPARENCY:
      paperImage = await loadImage(resolve(__dirname, paperAcrylicClear));
      paperName = COMMON_NAME.PAPER_ACRYLIC_TRANSPARENCY
      break

    case CommonCode.PAPER_ACRYLIC_GLITTER_SILVER:
      paperImage = await loadImage(resolve(__dirname, paperAcrylicGlitterSilver));
      paperName = COMMON_NAME.PAPER_ACRYLIC_GLITTER_SILVER
      break

    case CommonCode.PAPER_ACRYLIC_GLITTER_GOLD:
      paperImage = await loadImage(resolve(__dirname, paperAcrylicGlitterGold));
      paperName = COMMON_NAME.PAPER_ACRYLIC_GLITTER_GOLD
      break

    case CommonCode.PAPER_ACRYLIC_HOLOGRAM:
      paperImage = await loadImage(resolve(__dirname, paperAcrylicHologram));
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

