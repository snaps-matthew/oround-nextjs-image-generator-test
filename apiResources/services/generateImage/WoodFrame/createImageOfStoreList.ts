import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getPreviewMargin,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { isWoodFrame } from 'apiResources/matchProd/isWoodFrame';
import { loadImage } from 'apiResources/utils/loadImage';
import { getFrameColorUrl } from './getFrameColorUrl';
import frameRectangleSkinInfo from './frameRectangleSkinInfo';
import { getFrameSkinPolygonSize } from 'apiResources/services/generateImage/WoodFrame/getFrameSkinPolygonSize';
import { OroundCV } from 'apiResources/utils/OroundCV';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, paperImage?:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, paperImage} = props;
  const productCode = productEditInfo.productCode
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
  const margin = getPreviewMargin(productCode);
  const frameSkinColor = getFrameColorUrl(productCode, optionInfo.colorCode);
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height


  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
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

    const oroundCV = new OroundCV();
    const canvas = oroundCV.drawShadow(result.canvas, false, 6, 2, 8, 73);
    const onlySkin = true
    if (onlySkin) {
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      const offset = (result.canvas.width - frameWidth) / 2 + frameThick;
      const removeWidth = frameWidth - (frameThick * 2);
      const removeHeight = frameHeight - (frameThick * 2);
      ctx.save();
      ctx.fillStyle = '#000';
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(offset, offset, removeWidth, removeHeight);
      ctx.restore();
    }
    const size = imageFull(canvas.width, canvas.height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);
  }else {
    //target 4의 경우
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
