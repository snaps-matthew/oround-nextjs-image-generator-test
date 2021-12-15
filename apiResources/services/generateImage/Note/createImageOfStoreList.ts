import Config from "apiResources/constants/Config";
import {loadImage} from "apiResources/utils/loadImage";
import { SceneType } from 'apiResources/constants/sceneType';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import {
  getArtworkImage,
  getCreateImageInitInfo, getScale,
} from '../../../utils/getSelectedScene';
import TargetType from '../../../constants/TargetType';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {

  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const directionCode = productEditInfo.directionCode

  const domain = `${Config.DOMAIN_RESOURCE}${Config.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${SceneType.page}/${directionCode}/`;
  const skinPathTop = skinPath+'top.png';

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const skinImage_top = await loadImage(skinPathTop);

    const wrapper = getWrapperSize(productCode)
    const offset = getOffset(productCode, SceneType.page)
    const groupDelimiterName = productEditInfo.groupDelimiterName
    const scale = getScale(groupDelimiterName)
    const wrapperWidth = wrapper.width * scale
    const wrapperHeight = wrapper.height * scale
    const offsetLeft = offset.left * scale
    const offsetTop = offset.top * scale

    const temp = newCanvas(wrapperWidth, wrapperHeight);

    temp.ctx.drawImage(templateImage, offsetLeft, offsetTop);
    temp.ctx.drawImage(skinImage_top, 0, 0,wrapperWidth, wrapperHeight);

    const size = imageFull(wrapperWidth, wrapperHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);

  }else{
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
