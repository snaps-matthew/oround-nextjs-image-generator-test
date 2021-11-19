import {loadImage} from "canvas";

import Config from "apiResources/constants/Config";
import CommonCode from "apiResources/constants/CommonCode";

import frameNinePatchSkinInfo from "apiResources/services/generateImage/Frame/theme/frame/frameNinePatchSkinInfo";

import {newCanvas} from "apiResources/utils/newCanvas";
import {InvalidRequest} from "apiResources/utils/GeneralError";

export const compositeNinePatch = async (paperCode: string, originImage: any) => {
  if (paperCode !== CommonCode.FRAME_METAL &&
    paperCode !== CommonCode.FRAME_CANVAS &&
    paperCode !== CommonCode.FRAME_ACRYLIC &&
    paperCode !== CommonCode.FRAME_BIRCH &&
    paperCode !== CommonCode.FRAME_BOARD &&
    paperCode !== CommonCode.FRAME_FORM_BOARD &&
    paperCode !== CommonCode.FRAME_FORMEX &&
    paperCode !== CommonCode.FRAME_COMPLEX) {
    return originImage;
  }
  const ninePatchInfo = frameNinePatchSkinInfo[paperCode];

  if(!ninePatchInfo){
    throw InvalidRequest(paperCode);
  }

  const offset = 60; // 사진틀 이미지가 100px 크기로 밖으로 60px 안으로 40px 일괄적인 크기로 제작했다.
  const offset2 = 40;
  const sumOffset = offset + offset2;
  const width = originImage.width;
  const height = originImage.height;
  const frameWidth = width + (offset * 2);
  const frameHeight = height + (offset * 2);

  const frame = newCanvas(frameWidth, frameHeight);
  frame.ctx.drawImage(originImage, offset, offset);

  const pattern = newCanvas(frameWidth - (sumOffset * 2), sumOffset);

  const imagePosition = [
    [ninePatchInfo.topLeft, 0, 0, sumOffset, sumOffset],
    [ninePatchInfo.topCenter, sumOffset, 0, frameWidth - (sumOffset * 2), sumOffset],
    [ninePatchInfo.topRight, frameWidth-sumOffset, 0, sumOffset, sumOffset],
    [ninePatchInfo.midLeft, 0, sumOffset, sumOffset, frameHeight - (sumOffset * 2)],
    [ninePatchInfo.midRight, frameWidth-sumOffset, sumOffset, sumOffset, frameHeight - (sumOffset * 2)],
    [ninePatchInfo.bottomLeft, 0, frameHeight-sumOffset, sumOffset, sumOffset],
    [ninePatchInfo.bottomCenter, sumOffset, frameHeight-sumOffset, frameWidth - (sumOffset * 2), sumOffset],
    [ninePatchInfo.bottomRight, frameWidth-sumOffset, frameHeight-sumOffset, sumOffset, sumOffset]
  ]

  for(let item of imagePosition){
    // @ts-ignore
    const img = await loadImage(`${Config.RESOURCE_CDN_URL}${item[0]}`)
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
