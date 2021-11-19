import {compositeFrame} from "apiResources/services/generateImage/Frame/compositeFrame";
import {compositeHangingFrame} from "apiResources/services/generateImage/Frame/compositeHangingFrame";
import {compositeMaterial} from "apiResources/services/generateImage/Frame/compositeMaterial";
import {compositeNinePatch} from "apiResources/services/generateImage/Frame/compositeNinePatch";

import {resizeImageFull} from "apiResources/utils/resizeImageFUll";

export const createImageOfStoreDetail_1 = async (props:{productCode: string, paperCode: string, productSize: any, originImage: any, frameColor: string, canvas: any}) => {
  let {productCode, paperCode, productSize, originImage, frameColor, canvas} = props;
  const outBox = {width: 572, height: 572};

  originImage = await compositeFrame(paperCode, productSize, originImage, frameColor);
  originImage = await compositeMaterial(paperCode, originImage, frameColor);
  originImage = await compositeHangingFrame(productCode, paperCode, originImage, frameColor);
  originImage = await compositeNinePatch(paperCode, originImage);

  canvas.width = outBox.width;
  canvas.height = outBox.height;
  const ctx = canvas.getContext('2d');

  const sourceWidth = originImage.width;
  const sourceHeight = originImage.height;

  const {width, height, left, top} = resizeImageFull(sourceWidth, sourceHeight, outBox.width, outBox.height);

  ctx.drawImage(originImage, left, top, width, height);
}
