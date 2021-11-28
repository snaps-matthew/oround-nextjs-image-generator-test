import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage } from 'apiResources/utils/loadImage';
import { TYPE } from 'apiResources/constants/type';
import { API_URL } from 'apiResources/constants/apiURL';
import {
  getKeyringCutLineSize,
  getKeyringHoleSize,
  getKeyringOuterAreaSize
} from 'apiResources/utils/getKeyringSize';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, paperImage?:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, paperImage} = props;
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;

    const cutLine = getKeyringCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스
    let scene:any = getSelectedScene(productEditInfo);
    const holeObject = scene.object.find((obj: { type: string; }) => obj.type === 'hole');

    const holeX = holeObject.x;
    const holeY = holeObject.y;
    contour.ctx.drawImage(templateImage, 0, 0);

    const oroundCV = new OroundCV();
    oroundCV.alphaBinarization(contour.canvas);
    oroundCV.dilation(contour.canvas, cutLine);
    oroundCV.findObjectContour(contour.canvas);
    oroundCV.contourPaintColor(contour.canvas);

    if (paperImage) {
      const fullSize = imageFull(paperImage.width, paperImage.height, width, height, 0);
      result.ctx.save();
      result.ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
      result.ctx.globalCompositeOperation = 'destination-in';
      result.ctx.drawImage(contour.canvas, 0, 0);
      result.ctx.restore();
    }

    const holeSize = getKeyringHoleSize() * ratio;
    const keyOutlineRadius = (holeSize + cutLine + cutLine) / 2;
    const keyOutline = oroundCV.drawCircle(keyOutlineRadius, 255, 255, 255);

    const keyInlineRadius = holeSize / 2;
    const keyInlineCanvas = oroundCV.drawCircle(keyInlineRadius, 242, 244, 247);
    const inShadow = oroundCV.drawShadow(keyInlineCanvas, true, 0, 0, 3);

    contour.ctx.drawImage(keyOutline, holeX - cutLine, holeY - cutLine);
    const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 3);

    result.ctx.drawImage(shadowCanvas, 0, 0);
    result.ctx.drawImage(contour.canvas, 0, 0);
    result.ctx.drawImage(templateImage, 0, 0);
    result.ctx.drawImage(inShadow, holeX - cutLine + cutLine, holeY - cutLine + cutLine);

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);
    // ctx.drawImage(templateImage, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
