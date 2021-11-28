import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";
import {loadImage} from "apiResources/utils/loadImage";
import {Image} from "canvas";
import { SceneType } from 'apiResources/constants/sceneType';
import { API_URL } from 'apiResources/constants/apiURL';
import { API_PATH } from 'apiResources/constants/apiPath';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import TargetType from 'apiResources/constants/TargetType';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import { TYPE } from 'apiResources/constants/type';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import { isUVPrintPhoneCase } from 'apiResources/matchProd/isPhoneCaseProd';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const comparisonColorCode:string = optionInfo.diviceColorCode;
  const isHardCase = productCode.slice(-1) === '2';
  const domain = `${API_URL.DOMAIN_RESOURCE}${API_PATH.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const device = isHardCase ? '' : `${domain}/${SceneType.page}/1-device/${comparisonColorCode}.png`;
  const caseSkin = isHardCase ? '' : `${domain}/${SceneType.page}/2-case/T00088.png`;
  const skinPath = isHardCase ?
    `${domain}/${SceneType.page}/3-skin/T00090.png` :
    `${domain}/${SceneType.page}/3-skin/${comparisonColorCode}_T00088.png`; // 젤리 케이스로 고정 (등록시 상품 코드가 같음- 사용자는 옵션으로 선택)
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const wrapper = getWrapperSize(productCode)
    const offsetLeft = Math.round((wrapper.width - width) / 2);
    const offsetTop = Math.round((wrapper.height - height) / 2);
    const temp = newCanvas(wrapper.width, wrapper.height);
    if(isUVPrintPhoneCase(productCode)){
      const deviceSkinImage = await loadImage(device);
      temp.ctx.drawImage(deviceSkinImage, 0, 0, wrapper.width, wrapper.height);
      const caseSkinImage = await loadImage(caseSkin);
      temp.ctx.drawImage(caseSkinImage, 0, 0, wrapper.width, wrapper.height);
    }

    temp.ctx.drawImage(templateImage, offsetLeft, offsetTop);
    const skinImage = await loadImage(skinPath);
    temp.ctx.drawImage(skinImage, 0, 0, wrapper.width, wrapper.height);

    const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
