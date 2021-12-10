import Config from 'apiResources/constants/Config';
import { loadImage } from "apiResources/utils/loadImage";
import { SceneType } from 'apiResources/constants/sceneType';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import TargetType from 'apiResources//constants/TargetType';
import {
  getCreateImageInitInfo,
  getArtworkImage,
} from 'apiResources/utils/getSelectedScene';

export const createImageOfStoreList = async (props:{thumbnailImage: any, productEditInfo:any, optionInfo:any, canvas: any, target: string}) => {

  const {thumbnailImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const directionCode = productEditInfo.directionCode
  const colorCode = optionInfo.colorCode

  const domain = `${Config.DOMAIN_RESOURCE}${Config.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${SceneType.page}/${directionCode}/${colorCode}`;
  const skinPathTop = skinPath+'_top.png';
  const skinPathBottom = skinPath+'_bottom.png';

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const skinImage_bottom = await loadImage(skinPathBottom);
    const skinImage_top = await loadImage(skinPathTop);

    const wrapper = getWrapperSize(productCode)
    const offset = getOffset(productCode, SceneType.page)
    const temp = newCanvas(wrapper.width, wrapper.height);

    temp.ctx.drawImage(skinImage_bottom, 0, 0,wrapper.width, wrapper.height);
    temp.ctx.drawImage(thumbnailImage, offset.left, offset.top);
    temp.ctx.drawImage(skinImage_top, 0, 0,wrapper.width, wrapper.height);

    const size = imageFull(wrapper.width, wrapper.height, outBox.width, outBox.height, 0);
    ctx.drawImage(temp.canvas, size.x, size.y, size.width, size.height);
  }else{

    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
