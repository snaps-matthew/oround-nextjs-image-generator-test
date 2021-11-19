import { loadImage } from 'apiResources/utils/loadImage'
import { newCanvas } from 'apiResources/utils/newCanvas'
import { SnapsCV } from 'apiResources/utils/SnapsCV'
import { isShowPaperProduct } from 'apiResources/matchProd/isShowPaperProduct'
import { getPaperImage } from 'apiResources/services/getPaperImage'
import { isWhitePrint } from 'apiResources/matchProd/isWhitePrint'
import {isAcrylicProduct} from "apiResources/matchProd/isAcrylicProduct";
import {imageFull} from "apiResources/utils/imageAlign";

export const compositePaperImage = async (thumbnailCanvas:any, whitePrintCanvas:any, optionInfo:any, productCode:string) => {
  // 정책상 아크릴 키링은 용지 별로 이미지를 만들지 않으므로 적용되지 않는다.
  if ((!isShowPaperProduct(optionInfo.paperCode, optionInfo.colorCode) && !isAcrylicProduct(productCode)) || optionInfo.paperCode === '') {
    return Promise.resolve()
  }

  if(!isWhitePrint(optionInfo.paperCode)){
    whitePrintCanvas = newCanvas(10, 10).canvas
  }

  const {paperImage, paperName} = await getPaperImage(optionInfo.paperCode)
  const width = thumbnailCanvas.width
  const height = thumbnailCanvas.height
  const origin = newCanvas(width, height)

  const paperImg = await loadImage(paperImage)

  const photoEffect = new SnapsCV()

  if(isAcrylicProduct(optionInfo.productCode)){
    const fullSize = imageFull(paperImg.width, paperImg.height, width, height, 0)
    origin.ctx.drawImage(paperImg, fullSize.x, fullSize.y, fullSize.width, fullSize.height)
    origin.ctx.drawImage(thumbnailCanvas, 0, 0)
  } else {
    photoEffect.compositePaper(origin.canvas, null, paperName, paperImg, thumbnailCanvas, whitePrintCanvas)
  }

    const ctx = thumbnailCanvas.getContext('2d')
    ctx.drawImage(origin.canvas, 0, 0, width, height)

  return thumbnailCanvas
}
