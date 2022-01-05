import Config from "apiResources/constants/Config";
import {loadImage} from "apiResources/utils/loadImage";
import { SceneType } from 'apiResources/constants/sceneType';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import TargetType from 'apiResources/constants/TargetType';
import {
  getArtworkImage,
  getCreateImageInitInfo, getScale,
} from 'apiResources/utils/getSelectedScene';
import { getWrapperSize } from 'apiResources/utils/getProductInfo';
import { isUVPrintPhoneCase } from 'apiResources/matchProd/isPhoneCaseProd';
import { EventProductArtProdIdx } from 'apiResources/constants/EventProductRef';

export const createImageOfTopView = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, artProductIndex:string, canvas: any, target:any}) => {
  const {templateImage, productEditInfo, optionInfo, artProductIndex, canvas, target} = props;
  const caseCode:string = optionInfo.caseCode
  const productCode:string = productEditInfo.productCode;
  const comparisonColorCode:string = optionInfo.diviceColorCode;
  const groupDelimiterName = productEditInfo.groupDelimiterName
  const scale = getScale(groupDelimiterName)
  const isHardCase = productCode.slice(-1) === '2';
  const domain = `${Config.RESOURCE_CDN_URL}/${productCode}`;
  const device = isHardCase ? '' : `${domain}/${SceneType.page}/1-device/${comparisonColorCode}.png`;
  const caseSkin = isHardCase ? '' : `${domain}/${SceneType.page}/2-case/${caseCode}.png`;
  const skinPath = isHardCase ?
    `${domain}/${SceneType.page}/3-skin/T00090.png` :
    `${domain}/${SceneType.page}/3-skin/${comparisonColorCode}_${caseCode}.png`; // 젤리 케이스로 고정 (등록시 상품 코드가 같음- 사용자는 옵션으로 선택)
  const width = productEditInfo.edit[0].width * scale
  const height = productEditInfo.edit[0].height * scale

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target === TargetType.STORE_DETAIL_3 && EventProductArtProdIdx.includes(artProductIndex)) {
    const eventProdImage = await loadImage(`${Config.RESOURCE_CDN_URL}/EventProduct/woojung.png`);
    ctx.drawImage(eventProdImage, 0, 0);
  }
  else if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const wrapper = getWrapperSize(productCode)
    const wrapperWidth = wrapper.width * scale
    const wrapperHeight = wrapper.height * scale
    const offsetLeft = Math.round((wrapperWidth - width) / 2);
    const offsetTop = Math.round((wrapperHeight - height) / 2);
    const temp = newCanvas(wrapperWidth, wrapperHeight);
    if(isUVPrintPhoneCase(productCode)){
      const deviceSkinImage = await loadImage(device);
      temp.ctx.drawImage(deviceSkinImage, 0, 0, wrapperWidth, wrapperHeight);
      const caseSkinImage = await loadImage(caseSkin);
      temp.ctx.drawImage(caseSkinImage, 0, 0, wrapperWidth, wrapperHeight);
    }

    temp.ctx.drawImage(templateImage, offsetLeft, offsetTop);
    const skinImage = await loadImage(skinPath);
    temp.ctx.drawImage(skinImage, 0, 0, wrapperWidth, wrapperHeight);

    const size = imageFull(wrapperWidth, wrapperHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
