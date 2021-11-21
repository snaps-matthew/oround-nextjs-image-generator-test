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
  const skinPath = `${domain}/${SceneType.front}/${colorCode}`;
  const skinPathBottom = skinPath+'.png';

  const outBox = {width: 500, height: 500};
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');
  console.log(skinPath);
  const skinImage_bottom = await loadImage(skinPathBottom);

  const wrapper = getWrapperSize(productCode)
  const offset = getOffset(productCode, SceneType.front)
  const temp = newCanvas(wrapper.width, wrapper.height);

  temp.ctx.drawImage(skinImage_bottom, 0, 0,wrapper.width, wrapper.height);
  temp.ctx.drawImage(templateImage, offset.left, offset.top);

  const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
  ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

}
