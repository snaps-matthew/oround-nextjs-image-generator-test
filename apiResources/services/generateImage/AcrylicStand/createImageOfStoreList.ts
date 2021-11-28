import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import {  getStandCutLineSize, getStandHelperWidth, getStandStickSize  } from 'apiResources/utils/getStandSize';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from '../../../utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage } from 'apiResources/utils/loadImage';
import { TYPE } from 'apiResources/constants/type';
import { API_URL } from 'apiResources/constants/apiURL';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, paperImage?:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, paperImage} = props;
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;

    const cutLine = getStandCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스
    let scene:any = getSelectedScene(productEditInfo);
    const stickObject = scene.object.find((obj: { type: string; }) => obj.type === 'stick');
    const helperObject = scene.object.find((obj: { type: string; }) => obj.type === 'helper');

    const helperX = helperObject.x;
    const helperY = helperObject.y;
    const helperWidth = helperObject.width;
    const stickX = stickObject.x;
    const stickY = stickObject.y;
    const stickWidth = stickObject.width;
    const stickHeight = stickObject.height;
    contour.ctx.drawImage(templateImage, 0, 0);

    const oroundCV = new OroundCV();
    oroundCV.alphaBinarization(contour.canvas);
    oroundCV.dilation(contour.canvas, cutLine);
    oroundCV.addStand(helperX, helperY, helperWidth, width);
    oroundCV.findObjectContour(contour.canvas);
    oroundCV.contourPaintColor(contour.canvas);

    contour.ctx.fillStyle = '#ffffff';
    contour.ctx.fillRect(stickX, stickY, stickWidth, stickHeight);

    if (paperImage) {
      const fullSize = imageFull(paperImage.width, paperImage.height, width, height, 0);
      result.ctx.save();
      result.ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
      result.ctx.globalCompositeOperation = 'destination-in';
      result.ctx.drawImage(contour.canvas, 0, 0);
      result.ctx.restore();
    }

    const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 3);

    result.ctx.drawImage(shadowCanvas, 0, 0);
    result.ctx.drawImage(contour.canvas, 0, 0);
    result.ctx.drawImage(templateImage, 0, 0);

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
