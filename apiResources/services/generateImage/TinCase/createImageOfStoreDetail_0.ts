import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";
import {loadImage} from "apiResources/utils/loadImage";
import productInfo from '../../../constants/productInfo';
import { artworkImageMerger } from '../../../utils/artworkImageCreator';
import { sceneTypeCode, sceneTypeName } from '../../../constants/sceneType';

export const createImageOfStoreDetail_0 = async (props:{ productCode: string, thumbnailImage: any, productOption: any, colorCode: string }) => {
  const { productCode, thumbnailImage, productOption, colorCode } = props;
  const wrapperSize = productInfo.productCode?.wrapperSize;
  const sideName = productOption.size[0].name;
  const sideCode = productOption.size[0].code;
  const artworkImageData = {
    x: productInfo.productCode?.offset?.sideName.left,
    y: productInfo.productCode?.offset?.sideName.top,
    width: productOption.size[0].verticalSizePx,
    height: productOption.size[0].horizontalSizePx,
    imagData: thumbnailImage.toDataURL()
  }
  return await artworkImageMerger({artworkImageData}, `${Config.RESOURCE_CDN_URL}/${productCode}/${sideCode}/${colorCode}`, wrapperSize?.width, wrapperSize?.height)
}
