import commonCode  from 'apiResources/constants/CommonCode'
import { SnapsCV } from 'apiResources/utils/SnapsCV'
import { loadImage } from 'apiResources/utils/loadImage'
import { newCanvas } from 'apiResources/utils/newCanvas'
import { getEffectImage } from 'apiResources/services/getEffectImage'

export const compositeOneColorPrintImage = async (thumbnailCanvas:any, optionInfo:any) => {
  const paperCode = optionInfo.paperCode;
  const effectCode = optionInfo.backCode;
  if (paperCode === commonCode.PAPER_APPAREL_HOLOGRAM ||
    paperCode === commonCode.PAPER_APPAREL_GLITTER ||
    paperCode === commonCode.PAPER_APPAREL_NEON) {
    const filter = await getEffectImage(effectCode);

    const snapsCV = new SnapsCV();
    const effectImg = await loadImage(filter.image);
    const effectBackgroundImg = await newCanvas(10, 10).canvas;
    snapsCV.compositeEffect(thumbnailCanvas, filter.effect, effectImg, effectBackgroundImg, thumbnailCanvas)
  }
  return thumbnailCanvas
}

