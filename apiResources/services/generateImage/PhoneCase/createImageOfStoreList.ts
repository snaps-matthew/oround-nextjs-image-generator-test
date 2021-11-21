import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";
import {loadImage} from "apiResources/utils/loadImage";
import {Image} from "canvas";
import { SceneType } from 'apiResources/constants/sceneType';
import { API_URL } from 'apiResources/constants/apiURL';
import { API_PATH } from 'apiResources/constants/apiPath';
import { imageFull } from '../../../utils/imageAlign';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas} = props;
  const productCode:string = productEditInfo.productCode;
  const comparisonColorCode = optionInfo.diviceColor;
  const isHardCase = productCode.slice(-1) === '2';
  const domain = `${API_URL.DOMAIN_RESOURCE}${API_PATH.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const device = isHardCase ? '' : `${domain}/${SceneType.page}/1-device/${comparisonColorCode}.png`;
  const caseSkin = isHardCase ? '' : `${domain}/${SceneType.page}/2-case/T00088.png`;
  const skin = isHardCase ?
    `${domain}/${SceneType.page}/3-skin/T00090.png` :
    `${domain}/${SceneType.page}/3-skin/${comparisonColorCode}_T00088.png`; // 젤리 케이스로 고정 (등록시 상품 코드가 같음- 사용자는 옵션으로 선택)
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const outBox = {width: 500, height: 500};
  let inBox = {
    [ProductCode.PHONE_CASE_FANCY_GALAXY_S_20_PLUS]:{
      width: width,
      height: height,
      skinPath: skin
    },
    [ProductCode.POLAROID_MINI]:{
      width: 367,
      height: 585,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/list_polaroid_mini@2x.png`
    }
  };

  const target = inBox[productCode];
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');

  const x = (outBox.width - target.width) / 2;
  const y = (outBox.height - target.height) / 2;

  const size = imageFull(width, height, outBox.width, outBox.height, 0);
  ctx.drawImage(templateImage, size.x, size.y, size.width, size.height);
  const skinImage = await loadImage(target.skinPath);
  ctx.drawImage(skinImage, size.x, size.y, size.width, size.height);
}
