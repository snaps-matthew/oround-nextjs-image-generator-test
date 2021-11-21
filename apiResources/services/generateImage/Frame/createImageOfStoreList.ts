// import CommonCode from "apiResources/constants/CommonCode";
// import ProductCode from "apiResources/constants/ProductCode";
//
// import {compositeHangingFrame} from "apiResources/services/generateImage/Frame/compositeHangingFrame";
// import {compositeNinePatch} from "apiResources/services/generateImage/Frame/compositeNinePatch";
// import {compositeFrameList} from "apiResources/services/generateImage/Frame/compositeFrameList";
// import {compositeMaterial} from "apiResources/services/generateImage/Frame/compositeMaterial";
//
// import {newCanvas} from "apiResources/utils/newCanvas";
// import {resizeImageFull} from "apiResources/utils/resizeImageFUll";
//
// export const createImageOfStoreList = async (props:{paperCode: string, productSize: any, originImage: any, frameColor: string, canvas: any}) => {
//   let {paperCode, productSize, originImage, frameColor, canvas} = props;
//   const listSize = {
//     outBox: {width: 680, height: 680},
//     inBox: {width: 560, height: 560},
//     squareBox: {width: 480, height: 480}
//   };
//
//   const sourceWidth = originImage.width;
//   const sourceHeight = originImage.height;
//   const target = sourceWidth === sourceHeight? listSize.squareBox : listSize.inBox;
//   const {width, height} = resizeImageFull(sourceWidth, sourceHeight, target.width, target.height);
//
//   const tmp = newCanvas(width, height)
//   tmp.ctx.drawImage(originImage, 0, 0, width, height);
//
//   originImage = await compositeFrameList(paperCode, productSize, tmp.canvas, frameColor);
//   originImage = await compositeMaterial(paperCode, originImage, frameColor);
//   originImage = await compositeHangingFrame(ProductCode.FRAME_GENERIC_A1, paperCode, originImage, frameColor);
//
//   canvas.width = listSize.outBox.width;
//   canvas.height = listSize.outBox.height;
//   let ctx = canvas.getContext('2d');
//   let x, y, originWidth, originHeight;
//
//   // 원목, 알루미늄, 행잉 액자는 A3 기준으로 생성
//   if(paperCode === CommonCode.FRAME_WOOD ||
//     paperCode === CommonCode.FRAME_ALUMINIUM) {
//     ctx.shadowColor = 'rgba(0,0,0,0.45)';
//     ctx.shadowBlur = 8;
//     ctx.shadowOffsetX = 6;
//     ctx.shadowOffsetY = 2;
//
//   } else if( paperCode === CommonCode.FRAME_HANGING ){
//     const {width, height} = resizeImageFull(originImage.width, originImage.height, target.width, target.height);
//   // 행잉액자는 A1 사이즈 기준으로 생성
//     x = (canvas.width - width) / 2;
//     y = (canvas.height - height) / 2;
//     originWidth = width;
//     originHeight = height;
//
//   } else {
//     originImage = await compositeNinePatch(paperCode, originImage);
//   }
//
//   if(paperCode !== CommonCode.FRAME_HANGING){
//     x = (canvas.width - originImage.width) / 2;
//     y = (canvas.height - originImage.height) / 2;
//     originWidth = originImage.width;
//     originHeight = originImage.height;
//   }
//
//   ctx.drawImage(originImage, x, y, originWidth, originHeight);
// }

import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";
import {loadImage} from "apiResources/utils/loadImage";
import {Image} from "canvas";
import { SceneType } from 'apiResources/constants/sceneType';
import { API_URL } from 'apiResources/constants/apiURL';
import { API_PATH } from 'apiResources/constants/apiPath';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas} = props;
  const productCode:string = productEditInfo.productCode;
  const directionCode = productEditInfo.directionCode
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height
  const colorCode = optionInfo.colorCode

  const domain = `${API_URL.DOMAIN_RESOURCE}${API_PATH.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${SceneType.page}/${directionCode}/${colorCode}`;
  const skinPathTop = skinPath+'_top.png';
  const skinPathBottom = skinPath+'_bottom.png';

  const outBox = {width: 500, height: 500};
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');

  // const skinImage_bottom = await loadImage(skinPathBottom);
  // const skinImage_top = await loadImage(skinPathTop);

  // const wrapper = getWrapperSize(productCode)
  // const offset = getOffset(productCode, SceneType.page)
  // const temp = newCanvas(wrapper.width, wrapper.height);
  //
  // temp.ctx.drawImage(skinImage_bottom, 0, 0,wrapper.width, wrapper.height);
  // temp.ctx.drawImage(templateImage, offset.left, offset.top);
  // temp.ctx.drawImage(skinImage_top, 0, 0,wrapper.width, wrapper.height);
  //
  // const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
  // ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

  const size = imageFull(width, height, outBox.width, outBox.height, 0);
  ctx.drawImage(templateImage, size.x, size.y, size.width, size.height);

}
