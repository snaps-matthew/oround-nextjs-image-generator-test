import {loadImage} from "canvas";

import Config from "apiResources/constants/Config";
import CommonCode from "apiResources/constants/CommonCode";

import frameNinePatchSkinInfoInStoreDetail from "apiResources/services/generateImage/Frame/theme/frame/frameNinePatchSkinInfoInStoreDetail";

import {newCanvas} from "apiResources/utils/newCanvas";
import {InvalidRequest} from "apiResources/utils/GeneralError";

export const compositeNinePatchInStoreDetail = async (paperCode: string, originImage: any) => {
  if (paperCode !== CommonCode.FRAME_CANVAS) {
    return originImage;
  }
  const ninePatchInfo = frameNinePatchSkinInfoInStoreDetail[paperCode];

  if(!ninePatchInfo){
    throw InvalidRequest(paperCode);
  }

  const offset = 40; // 사진틀 이미지가 40px 크기
  const width = originImage.width;
  const height = originImage.height;

  const frame = newCanvas(width, height);
  frame.ctx.drawImage(originImage, 0, 0);

  const pattern = newCanvas(width - (offset * 2), offset);

  const imagePosition = [
    [ninePatchInfo.topLeft, 0, 0, offset, offset],
    [ninePatchInfo.topCenter, offset, 0, width - (offset * 2), offset],
    [ninePatchInfo.topRight, width-offset, 0, offset, offset],
    [ninePatchInfo.midLeft, 0, offset, offset, height - (offset * 2)],
    [ninePatchInfo.midRight, width-offset, offset, offset, height - (offset * 2)],
    [ninePatchInfo.bottomLeft, 0, height-offset, offset, offset],
    [ninePatchInfo.bottomCenter, offset, height-offset, width - (offset * 2), offset],
    [ninePatchInfo.bottomRight, width-offset, height-offset, offset, offset]
  ]

  for(let item of imagePosition){
    // @ts-ignore
    const img = await loadImage(`${Config.RESOURCE_CDN_URL}${item[0]}`);
    // @ts-ignore
    pattern.canvas.width = item[3];
    // @ts-ignore
    pattern.canvas.height = item[4];

    pattern.ctx.fillStyle = pattern.ctx.createPattern(img, 'repeat');
    // @ts-ignore
    pattern.ctx.fillRect(0, 0, item[3], item[4]);
    frame.ctx.drawImage(pattern.canvas, item[1], item[2], item[3], item[4]);
  }

  return frame.canvas;
}
