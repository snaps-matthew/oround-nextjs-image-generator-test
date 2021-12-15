import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getPreviewMargin, getScale,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import { getFrameColorUrl } from './getFrameColorUrl';
import frameRectangleSkinInfo from './frameRectangleSkinInfo';
import { getFrameSkinPolygonSize } from 'apiResources/services/generateImage/WoodFrame/getFrameSkinPolygonSize';
import { OroundCV } from 'apiResources/utils/OroundCV';
import frame_wood_theme from 'apiResources/services/generateImage/WoodFrame/frame_wood_theme';
import ProductCode from 'apiResources/constants/ProductCode';
import { getSizeToTargetImage } from 'apiResources/utils/getSizeToTargetImage';
import Config from 'apiResources/constants/Config';
import { calObjectPosition } from 'apiResources/utils/calObjectPosition';
import frame_theme from '../Frame/frame_theme';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, drawObject} = props;
  const productCode = productEditInfo.productCode
  const directionCode = productEditInfo.directionCode
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const margin = getPreviewMargin(productCode);
  const frameSkinColor = getFrameColorUrl(productCode, optionInfo.colorCode);

  const groupDelimiterName = productEditInfo.groupDelimiterName
  const scale = getScale(groupDelimiterName)
  const width = productEditInfo.edit[0].width * scale
  const height = productEditInfo.edit[0].height * scale

  let ratio = 0
  if(productEditInfo.size.length > 0){
    ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
  }else{
    //사이즈가 없는경우 더미이미지로 리턴
    const dummyOroundImage = await loadErrorImage("size empty")
    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(dummyOroundImage, size.x, size.y, size.width, size.height);
    return
  }

  const padding = 2;           // 재단 2mm
  const margin2x = margin * 2;
  const frameSkin = frameRectangleSkinInfo[productCode];
  const {
    frameWidth,
    frameHeight,
    innerMargin,
    frameInfo,
    frameThick
  } = getFrameSkinPolygonSize(frameSkin.thick, frameSkin.dug, padding, ratio, width, height);
  const tmp = newCanvas(frameWidth, frameHeight);      // 최종 출력물 캔버스

  tmp.ctx.drawImage(templateImage, innerMargin, innerMargin);
  for (let item of frameInfo) {
    const skinImg = await loadImage(frameSkinColor[item.type]);
    drawFrame(tmp.ctx, skinImg, item);
  }
  const centerOffset = (width + margin2x - frameWidth) / 2;
  const result = newCanvas(width + margin2x, height + margin2x);
  result.ctx.drawImage(tmp.canvas, centerOffset, centerOffset);

  if(target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3) {
    const oroundCV = new OroundCV();
    const tempCanvas = oroundCV.drawShadow(result.canvas, false, 6, 2, 8, '73');
    const size = imageFull(tempCanvas.width, tempCanvas.height, outBox.width, outBox.height, 0);
    ctx.drawImage(tempCanvas, size.x, size.y, size.width, size.height);

  }else if (target === TargetType.STORE_DETAIL_2) {
    const themeListInfo:any = frame_wood_theme;
    const themeInfo = themeListInfo[productCode];
    const {
      sizeToTargetImageWidth,
      sizeToTargetImageHeight
    } = getSizeToTargetImage(themeInfo, directionCode, productEditInfo.size[0].horizontalSizeMm, productEditInfo.size[0].verticalSizeMm);
    const themeImagePath = `${Config.RESOURCE_CDN_URL}/Frame/theme/frame`;

    for (const obj of themeInfo.object) {
      if (obj.type === "image") {
        const { x, y } = calObjectPosition(obj.position, obj.x, obj.y, sizeToTargetImageWidth, sizeToTargetImageHeight);
        ctx.save();
        ctx.shadowColor = obj.shadowColor;
        ctx.shadowBlur = obj.shadowBlur;
        ctx.shadowOffsetX = obj.shadowOffsetX;
        ctx.shadowOffsetY = obj.shadowOffsetY;
        const tmp = newCanvas(sizeToTargetImageWidth, sizeToTargetImageHeight);
        tmp.ctx.drawImage(result.canvas, 0, 0, sizeToTargetImageWidth, sizeToTargetImageHeight);
        drawObject(tmp.canvas, canvas, x, y, sizeToTargetImageWidth, sizeToTargetImageHeight);
        ctx.restore();
      } else {
        const img = await loadImage(themeImagePath + obj.path);
        drawObject(img, canvas, obj.x, obj.y, img.width, img.height);
      }
    }

  }else if(target === TargetType.STORE_DETAIL_4) {
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);

  }
}

export const drawFrame = (frameCtx: CanvasRenderingContext2D, skinImg: any, item: any): void => {
  const pattern = newCanvas(item.width, item.height);
  const isHorizontal = item.width > item.height;
  const imgHeight = isHorizontal ? item.height : item.height * skinImg.width / item.width;
  const imgWidth = isHorizontal ? item.width * skinImg.height / item.height : item.width;
  pattern.ctx.drawImage(skinImg, 0, 0, imgWidth, imgHeight);

  const temp:any = newCanvas(item.width, item.height);

  temp.ctx.fillStyle = pattern.ctx.createPattern(pattern.canvas, 'repeat') as CanvasPattern;
  temp.ctx.beginPath();
  temp.ctx.moveTo(item.drawPoints[0], item.drawPoints[1]);
  temp.ctx.lineTo(item.drawPoints[2], item.drawPoints[3]);
  temp.ctx.lineTo(item.drawPoints[4], item.drawPoints[5]);
  temp.ctx.lineTo(item.drawPoints[6], item.drawPoints[7]);
  temp.ctx.closePath();
  // temp.ctx.globalAlpha = 0.3;
  temp.ctx.fill();

  frameCtx.drawImage(temp.canvas, item.x, item.y);
};
