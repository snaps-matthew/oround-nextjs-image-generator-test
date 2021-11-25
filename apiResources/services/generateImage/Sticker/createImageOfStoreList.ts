import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import { getStickerCutLineSize } from 'apiResources/utils/getStickerSize';
import { getCreateImageInitInfo, getSelectedScene } from '../../../utils/getSelectedScene';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
  const cutLine = getStickerCutLineSize() * ratio;
  const contour = newCanvas(width, height);   // 칼선 캔버스
  const result = newCanvas(width, height);    // 최종 출력물 캔버스
  contour.ctx.drawImage(templateImage, 0, 0);
  const oroundCV = new OroundCV();
  oroundCV.alphaBinarization(contour.canvas);
  oroundCV.dilation(contour.canvas, cutLine);
  oroundCV.findObjectContour(contour.canvas);
  oroundCV.contourPaintColor(contour.canvas);

  // if (paperImage) {
  //   const fullSize = imageFull(paperImage.width, paperImage.height, outBox.width, outBox.height, 0);
  //   ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
  // }

  const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 3);

  result.ctx.drawImage(shadowCanvas, 0, 0);
  result.ctx.drawImage(contour.canvas, 0, 0);
  result.ctx.drawImage(templateImage, 0, 0);

  const size = imageFull(width, height, outBox.width, outBox.height, 0);
  ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

}
