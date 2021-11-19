import CommonCode from "apiResources/constants/CommonCode";

import Config from "apiResources/constants/Config";

import frameHangingSkinInfo from "apiResources/services/generateImage/Frame/theme/frame/frameHangingSkinInfo";

import {loadImage} from "apiResources/utils/loadImage";
import {newCanvas} from "apiResources/utils/newCanvas";
import {BadRequest, InvalidRequest} from "apiResources/utils/GeneralError";

// 행잉액자의 경우
export const compositeHangingFrame = async (productCode: string, paperCode: string, originImage: any, frameColor: string) => {
  if(paperCode !== CommonCode.FRAME_HANGING){
    return originImage;
    // @ts-ignore
  } else if(!frameHangingSkinInfo[productCode]) {
    throw BadRequest("not found product size from Hanging frame");

    // @ts-ignore
  } else if(!frameHangingSkinInfo[productCode][frameColor]) {
    throw InvalidRequest(frameColor);
  }

  // @ts-ignore
  const hangingFrame = frameHangingSkinInfo[productCode]
  // @ts-ignore
  const hangingFramePath = hangingFrame[frameColor];

  const hangingFrameImage = await loadImage(`${Config.RESOURCE_CDN_URL}${hangingFramePath}`);
  const tmp = await newCanvas(hangingFrameImage.width, hangingFrameImage.height);
  tmp.ctx.drawImage(originImage, hangingFrame.size.x, hangingFrame.size.y, hangingFrame.size.width, hangingFrame.size.height);
  // tmp.ctx.fillStyle="rgba(255,0,255, 0.4)";
  tmp.ctx.drawImage(hangingFrameImage, 0, 0);

  return tmp.canvas;
}
