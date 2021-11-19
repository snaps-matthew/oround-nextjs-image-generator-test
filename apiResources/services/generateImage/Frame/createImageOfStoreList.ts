import CommonCode from "apiResources/constants/CommonCode";
import ProductCode from "apiResources/constants/ProductCode";

import {compositeHangingFrame} from "apiResources/services/generateImage/Frame/compositeHangingFrame";
import {compositeNinePatch} from "apiResources/services/generateImage/Frame/compositeNinePatch";
import {compositeFrameList} from "apiResources/services/generateImage/Frame/compositeFrameList";
import {compositeMaterial} from "apiResources/services/generateImage/Frame/compositeMaterial";

import {newCanvas} from "apiResources/utils/newCanvas";
import {resizeImageFull} from "apiResources/utils/resizeImageFUll";

export const createImageOfStoreList = async (props:{paperCode: string, productSize: any, originImage: any, frameColor: string, canvas: any}) => {
  let {paperCode, productSize, originImage, frameColor, canvas} = props;
  const listSize = {
    outBox: {width: 680, height: 680},
    inBox: {width: 560, height: 560},
    squareBox: {width: 480, height: 480}
  };

  const sourceWidth = originImage.width;
  const sourceHeight = originImage.height;
  const target = sourceWidth === sourceHeight? listSize.squareBox : listSize.inBox;
  const {width, height} = resizeImageFull(sourceWidth, sourceHeight, target.width, target.height);

  const tmp = newCanvas(width, height)
  tmp.ctx.drawImage(originImage, 0, 0, width, height);

  originImage = await compositeFrameList(paperCode, productSize, tmp.canvas, frameColor);
  originImage = await compositeMaterial(paperCode, originImage, frameColor);
  originImage = await compositeHangingFrame(ProductCode.FRAME_GENERIC_A1, paperCode, originImage, frameColor);

  canvas.width = listSize.outBox.width;
  canvas.height = listSize.outBox.height;
  let ctx = canvas.getContext('2d');
  let x, y, originWidth, originHeight;

  // 원목, 알루미늄, 행잉 액자는 A3 기준으로 생성
  if(paperCode === CommonCode.FRAME_WOOD ||
    paperCode === CommonCode.FRAME_ALUMINIUM) {
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 6;
    ctx.shadowOffsetY = 2;

  } else if( paperCode === CommonCode.FRAME_HANGING ){
    const {width, height} = resizeImageFull(originImage.width, originImage.height, target.width, target.height);
  // 행잉액자는 A1 사이즈 기준으로 생성
    x = (canvas.width - width) / 2;
    y = (canvas.height - height) / 2;
    originWidth = width;
    originHeight = height;

  } else {
    originImage = await compositeNinePatch(paperCode, originImage);
  }

  if(paperCode !== CommonCode.FRAME_HANGING){
    x = (canvas.width - originImage.width) / 2;
    y = (canvas.height - originImage.height) / 2;
    originWidth = originImage.width;
    originHeight = originImage.height;
  }

  ctx.drawImage(originImage, x, y, originWidth, originHeight);
}
