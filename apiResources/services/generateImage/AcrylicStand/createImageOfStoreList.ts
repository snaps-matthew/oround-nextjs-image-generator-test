import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import {  getStandCutLineSize, getStandHelperWidth, getStandStickSize  } from 'apiResources/utils/getStandSize';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import CommonCode from 'apiResources/constants/CommonCode';
import Config from 'apiResources/constants/Config';
import { loadImage, loadImageErrorAlert } from 'apiResources/utils/loadImage';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    let scene:any = getSelectedScene(productEditInfo);
    const width = scene.width
    const height = scene.height
    let ratio = 0
    if(productEditInfo.size.length > 0){
      ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
    }else{
      //사이즈가 없는경우 더미이미지로 리턴
      const dummyOroundImage = await loadImageErrorAlert("size empty")
      const size = imageFull(width, height, outBox.width, outBox.height, 0);
      ctx.drawImage(dummyOroundImage, size.x, size.y, size.width, size.height);
      return
    }

    const cutLine = getStandCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스
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

    result.ctx.drawImage(contour.canvas, 0, 0);
    const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 3);

    result.ctx.drawImage(shadowCanvas, 0, 0);
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
