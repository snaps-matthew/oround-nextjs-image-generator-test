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
import { getCreateImageInitInfo,  getSelectedScene } from 'apiResources/utils/getSelectedScene';
import { TYPE } from 'apiResources/constants/type';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const comparisonColorCode = optionInfo.diviceColor;
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
    const temp = newCanvas(width, height);
    ctx.drawImage(temp.canvas, 0, 0, outBox.width, outBox.height);
    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(templateImage, size.x, size.y, size.width, size.height);
    const skinImage = await loadImage(skinPath);
    ctx.drawImage(skinImage, size.x, size.y, size.width, size.height);
  }else {
    //target 4의 경우
    let scene:any = getSelectedScene(productEditInfo, optionInfo.printPositionCode);
    let imageObject:any = scene.object.filter((obj:any) => {
      const type = obj.type
      return type === TYPE.OBJECT_IMAGE
    })

    const detailClipartpath = API_URL.DOMAIN_RESOURCE+imageObject[0].original.middleImagePath
    const detailClipart = await loadImage(detailClipartpath);
    ctx.drawImage(detailClipart, 0, 0, outBox.width, outBox.height);
  }
}
