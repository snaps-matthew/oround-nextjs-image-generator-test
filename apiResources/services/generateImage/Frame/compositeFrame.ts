import {Image, loadImage} from "canvas";

import Config from "apiResources/constants/Config";
import CommonCode from "apiResources/constants/CommonCode";

import frameRectangleSkinInfo from "apiResources/services/generateImage/Frame/theme/frame/frameRectangleSkinInfo";
import {getFrameSkinPolygonSize} from "apiResources/services/generateImage/Frame/getFrameSkinPolygonSize";

import {InvalidRequest, NotFound} from "apiResources/utils/GeneralError";
import {newCanvas} from "apiResources/utils/newCanvas";

// 원목, 알루미늄 액자인 경우 액자틀 합성
export const compositeFrame = async (paperCode: string, productSize: any, originImage: any, frameColor: string) => {
  if (paperCode !== CommonCode.FRAME_WOOD && paperCode !== CommonCode.FRAME_ALUMINIUM){
    return originImage;
    // @ts-ignore
  } else if(!frameRectangleSkinInfo[paperCode] || !frameRectangleSkinInfo[paperCode][frameColor]){
    throw InvalidRequest(frameColor);
  }

  const widthPX = productSize.pixelWidth;
  const heightPX = productSize.pixelHeight;
  const widthMM = productSize.displaymmWidth;
  const heightMM = productSize.displaymmHeight;

  // @ts-ignore
  const frameSkin = frameRectangleSkinInfo[paperCode];
  // @ts-ignore
  const frameSkinColor = frameSkin[frameColor];

  const {
    frameWidth,
    frameHeight,
    innerMargin,
    frameInfo,
  } = getFrameSkinPolygonSize(false, frameSkin.thick, frameSkin.dug, widthMM, heightMM, widthPX, heightPX);

  // 1. 멀티폼과 프레임이 하나로 합쳐질 캔버스
  const frame = newCanvas(frameWidth, frameHeight);
  frame.ctx.drawImage(originImage, innerMargin, innerMargin, widthPX, heightPX);

  for(let item of frameInfo){
    const skinImg = await loadImage(`${Config.RESOURCE_CDN_URL}${frameSkinColor[item.type]}`).catch( err => {
      throw NotFound('Not found frame image');
    });
    drawFrame(frame.ctx, skinImg, item);
  }

  return frame.canvas
}


export const drawFrame = (frameCtx: any, skinImg: Image, item: any): void => {
  const pattern = newCanvas(item.width, item.height);
  const isHorizontal = item.width > item.height;
  const imgHeight = isHorizontal? item.height : item.height * skinImg.width / item.width;
  const imgWidth = isHorizontal? item.width * skinImg.height / item.height : item.width;
  pattern.ctx.drawImage(skinImg, 0, 0, imgWidth, imgHeight);

  const temp = newCanvas(item.width, item.height);
  temp.ctx.fillStyle = pattern.ctx.createPattern(pattern.canvas, 'repeat');
  temp.ctx.beginPath();
  temp.ctx.moveTo(item.drawPoints[0], item.drawPoints[1]);
  temp.ctx.lineTo(item.drawPoints[2], item.drawPoints[3]);
  temp.ctx.lineTo(item.drawPoints[4], item.drawPoints[5]);
  temp.ctx.lineTo(item.drawPoints[6], item.drawPoints[7]);
  temp.ctx.closePath();
  // temp.ctx.globalAlpha = 0.6;
  temp.ctx.fill();

  frameCtx.drawImage(temp.canvas, item.x, item.y);
};

