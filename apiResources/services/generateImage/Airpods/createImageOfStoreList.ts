import Config from "apiResources/constants/Config";
import {loadImage} from "apiResources/utils/loadImage";
import { SceneType } from 'apiResources/constants/sceneType';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import TargetType from 'apiResources//constants/TargetType';
import {
  getCreateImageInitInfo,
  getArtworkImage, getScale,
} from 'apiResources/utils/getSelectedScene';
import { removeCuttingLine } from '../../removeCuttingLine';

export const createImageOfStoreList = async (props:{thumbnailImage: any, productEditInfo:any, optionInfo:any, canvas: any, target: string}) => {

  const {thumbnailImage, productEditInfo, optionInfo, canvas, target} = props;
  const productCode:string = productEditInfo.productCode;
  const directionCode = productEditInfo.directionCode
  const colorCode = optionInfo.colorCode
  const groupDelimiterName = productEditInfo.groupDelimiterName

  const domain = `${Config.DOMAIN_RESOURCE}${Config.ARTWORK_RESOURCE_SKIN}${productCode}`;
  const skinPath = `${domain}/${SceneType.page}/${directionCode}/${colorCode}`;
  const skinPathTop = skinPath+'_top.png';
  const skinPathBottom = skinPath+'_bottom.png';
  const scale = getScale(groupDelimiterName)
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const skinImage_bottom = await loadImage(skinPathBottom);
    const skinImage_top = await loadImage(skinPathTop);

    const wrapper = getWrapperSize(productCode)
    const offset = getOffset(productCode, SceneType.page)
    const temp = newCanvas(wrapper.width * scale, wrapper.height * scale);

    temp.ctx.drawImage(skinImage_bottom, 0, 0,wrapper.width * scale, wrapper.height * scale);
    temp.ctx.drawImage(thumbnailImage, offset.left * scale, offset.top * scale);
    temp.ctx.drawImage(skinImage_top, 0, 0,wrapper.width*scale, wrapper.height * scale);


    const size = imageFull(wrapper.width * scale, wrapper.height * scale , outBox.width, outBox.height, 0);
    const resizeWidth = 428 * scale /temp.canvas.width
    const resizeHeight = 416 * scale /temp.canvas.height
    const resizeLeft = Math.round((size.width - size.width * resizeWidth) / 2)
    const resizeTop = Math.round((size.height - size.height * resizeHeight) / 2)

    ctx.drawImage(temp.canvas, resizeLeft, resizeTop, size.width *resizeWidth , size.height * resizeHeight)

  }else{
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
