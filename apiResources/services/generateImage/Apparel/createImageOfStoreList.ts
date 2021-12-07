import Config from "apiResources/constants/Config";
import {loadImage} from "apiResources/utils/loadImage";
import { sceneTypeCode } from 'apiResources/constants/sceneType';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import { getArtworkImage, getCreateImageInitInfo, getSelectedScene } from '../../../utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const colorCode = optionInfo.colorCode
  const scene:any = getSelectedScene(productEditInfo, optionInfo);
  const domain = `${Config.DOMAIN_RESOURCE}${Config.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${sceneTypeCode[scene.type]}/${colorCode}`;
  const skinPathBottom = skinPath+'.png';

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  if (target === TargetType.STORE_DETAIL_3 || target === TargetType.STORE_LIST_1) {
    //target 3의 경우
    const skinImage_bottom = await loadImage(skinPathBottom);
    const wrapper = getWrapperSize(productCode)
    const offset = getOffset(productCode, sceneTypeCode[scene.type])
    const temp = newCanvas(wrapper.width, wrapper.height);

    temp.ctx.drawImage(skinImage_bottom, 0, 0,wrapper.width, wrapper.height);
    temp.ctx.drawImage(templateImage, offset.left, offset.top);

    const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

  }else if (target === TargetType.STORE_DETAIL_4) {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
