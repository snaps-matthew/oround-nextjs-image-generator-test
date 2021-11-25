
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
import { getCreateImageInitInfo, getDetailClipart, getSelectedScene } from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { TYPE } from '../../../constants/type';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target: string}) => {

  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const directionCode = productEditInfo.directionCode
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height
  const colorCode = optionInfo.colorCode

  const domain = `${API_URL.DOMAIN_RESOURCE}${API_PATH.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${SceneType.page}/${directionCode}/${colorCode}`;
  const skinPathTop = skinPath+'_top.png';

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target === TargetType.STORE_DETAIL_3) {
    //target 3의 경우
    const skinImage_top = await loadImage(skinPathTop);

    const wrapper = getWrapperSize(productCode)
    const offset = getOffset(productCode, SceneType.page)
    const temp = newCanvas(wrapper.width, wrapper.height);

    temp.ctx.drawImage(templateImage, offset.left, offset.top);
    temp.ctx.drawImage(skinImage_top, 0, 0,wrapper.width, wrapper.height);

    const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);


  }else if (target === TargetType.STORE_DETAIL_4) {
    //target 4의 경우
    const detailClipart = await getDetailClipart(productEditInfo, optionInfo.printPositionCode);
    ctx.drawImage(detailClipart, 0, 0, outBox.width, outBox.height);
  }

}
