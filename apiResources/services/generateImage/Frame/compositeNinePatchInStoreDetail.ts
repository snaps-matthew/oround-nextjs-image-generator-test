import CommonCode from "../../../constants/CommonCode";
import {loadImage} from "canvas";
import {newCanvas} from "apiResources/utils/newCanvas";
import { getFrameNinePathUrl } from 'apiResources/api/getFrameNinePathUrl';
import ProductCode from 'apiResources/constants/ProductCode';
import { getPreviewMargin } from '../../../utils/getSelectedScene';


export const compositeNinePatchInStoreDetail = async (productCode: string, originImage: any) => {
  if (productCode !== ProductCode.FRAME_CANVAS) {
    return originImage;
  }

  const ninePatchInfo:any = getFrameNinePathUrl(productCode);
  const offset = 60; // 사진틀 이미지가 60px 크기
  const width = originImage.width;
  const height = originImage.height;

  const frame = newCanvas(width, height);
  frame.ctx.drawImage(originImage, 0, 0);

  const pattern = newCanvas(width - (offset * 2), offset);
  const imagePosition = [
    [ninePatchInfo.top_left, 0, 0, offset, offset],
    [ninePatchInfo.top_center, offset, 0, width - (offset * 2), offset],
    [ninePatchInfo.top_right, width-offset, 0, offset, offset],
    [ninePatchInfo.middle_left, 0, offset, offset, height - (offset * 2)],
    [ninePatchInfo.middle_right, width-offset, offset, offset, height - (offset * 2)],
    [ninePatchInfo.bottom_left, 0, height-offset, offset, offset],
    [ninePatchInfo.bottom_center, offset, height-offset, width - (offset * 2), offset],
    [ninePatchInfo.bottom_right, width-offset, height-offset, offset, offset]
  ]

  for(let item of imagePosition){
    const img = await loadImage(item[0])
    pattern.canvas.width = item[3];
    pattern.canvas.height = item[4];
    pattern.ctx.fillStyle = pattern.ctx.createPattern(img, 'repeat');
    pattern.ctx.fillRect(0, 0, item[3], item[4]);
    frame.ctx.drawImage(pattern.canvas, item[1], item[2], item[3], item[4]);
  }
  return frame.canvas;
}

