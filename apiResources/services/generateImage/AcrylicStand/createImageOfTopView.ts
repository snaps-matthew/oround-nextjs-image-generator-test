import { OroundCV } from 'apiResources/utils/OroundCV';
import { newCanvas } from 'apiResources/utils/newCanvas';
import TargetType from 'apiResources/constants/TargetType';
import { loadErrorImage } from 'apiResources/utils/loadImage';
import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import {  getStandCutLineSize  } from 'apiResources/utils/getStandSize';
import {
  getArtworkImage,
  getCreateImageInitInfo, getScale,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';

export const createImageOfTopView = async (props:{thumbnailImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {
  const {thumbnailImage, productEditInfo, optionInfo, canvas, target} = props;

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const groupDelimiterName = productEditInfo.groupDelimiterName
    const scale = getScale(groupDelimiterName)
    let scene:any = getSelectedScene(productEditInfo);
    const width = scene.width * scale
    const height = scene.height * scale
    let ratio = 0
    if(productEditInfo.size.length > 0){
      ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
      ratio = ratio * scale
    }else{
      //사이즈가 없는경우 더미이미지로 리턴
      const dummyOroundImage = await loadErrorImage("size empty")
      const size = imageFull(width, height, outBox.width, outBox.height, 0);
      ctx.drawImage(dummyOroundImage, size.x, size.y, size.width, size.height);
      return
    }

    const cutLine = getStandCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스
    const stickObject = scene.object.find((obj: { type: string; }) => obj.type === 'stick');
    const helperObject = scene.object.find((obj: { type: string; }) => obj.type === 'helper');

    const helperX = helperObject.x * scale;
    const helperY = helperObject.y * scale;
    const helperWidth = helperObject.width * scale;
    const stickX = stickObject.x * scale;
    const stickY = stickObject.y * scale;
    const stickWidth = stickObject.width * scale;
    const stickHeight = stickObject.height * scale;
    contour.ctx.drawImage(thumbnailImage, 0, 0);

    const oroundCV = new OroundCV();
    oroundCV.alphaBinarization(contour.canvas);
    oroundCV.dilation(contour.canvas, cutLine);
    oroundCV.addStand(helperX, helperY, helperWidth, width);
    oroundCV.findObjectContour(contour.canvas);
    oroundCV.contourPaintColor(contour.canvas);

    contour.ctx.fillStyle = '#ffffff';
    contour.ctx.fillRect(stickX, stickY, stickWidth, stickHeight);

    result.ctx.drawImage(contour.canvas, 0, 0);
    const tempColorCanvas = oroundCV.fillColor(result.canvas, result.canvas.width, result.canvas.height,  "#00000008")
    result.ctx.drawImage(tempColorCanvas, 0, 0);
    const shadowCanvas = oroundCV.drawShadowColor(result.canvas, false, 0, 6, 6, "#00000033");
    result.ctx.drawImage(shadowCanvas, 0, 0);
    result.ctx.drawImage(thumbnailImage, 0, 0);

    const inLineShadow = oroundCV.drawShadowColor(result.canvas, true, 0, 6, 2,"#00000026");
    const innerLineShadow1 = oroundCV.drawShadowColor(inLineShadow, true, -1, 1, 1,"#0000004d");
    const innerLineShadow2 = oroundCV.drawShadowColor(innerLineShadow1, true, -1, 0, 1,"#ffffff");
    const innerLineShadow3 = oroundCV.drawShadowColor(innerLineShadow2, true, 1, 1, 1,"#ffffff");
    result.ctx.drawImage(innerLineShadow3, 0, 0);

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
