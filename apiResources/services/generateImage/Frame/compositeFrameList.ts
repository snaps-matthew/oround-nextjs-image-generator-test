import {loadImage} from "canvas";

import Config from "apiResources/constants/Config";
import CommonCode from "apiResources/constants/CommonCode";

import {drawFrame} from "apiResources/services/generateImage/Frame/compositeFrame";
import {getFrameSkinPolygonSize} from "apiResources/services/generateImage/Frame/getFrameSkinPolygonSize";
import frameRectangleSkinInfo from "apiResources/services/generateImage/Frame/theme/frame/frameRectangleSkinInfo";

import {newCanvas} from "apiResources/utils/newCanvas";
import {InvalidRequest, NotFound} from "apiResources/utils/GeneralError";

// 원목, 알루미늄 액자인 경우 액자틀 합성
export const compositeFrameList = async (paperCode: string, productSize: any, originImage: any, frameColor: string) => {
  if (paperCode !== CommonCode.FRAME_WOOD && paperCode !== CommonCode.FRAME_ALUMINIUM){
    return originImage;
    // @ts-ignore
  } else if(!frameRectangleSkinInfo[paperCode] || !frameRectangleSkinInfo[paperCode][frameColor]){
    throw InvalidRequest(frameColor);
  }

  const widthPX = originImage.width;
  const heightPX = originImage.height;

  // @ts-ignore
  const frameSkin = frameRectangleSkinInfo[paperCode];
  // @ts-ignore
  const frameSkinColor = frameSkin[frameColor];
  const thick = paperCode === CommonCode.FRAME_WOOD? 16 : 8
  const dug = paperCode === CommonCode.FRAME_WOOD? 6 : 4

  const {
    frameWidth,
    frameHeight,
    innerMargin,
    frameInfo,
  } = getFrameSkinPolygonSize(true, thick, dug, 0, 0, widthPX, heightPX);

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
