import {
  getArtworkReszied,
  imageDstOut,
  getArtworkOnModel,
  multiLayerMerger, getImageWrinkled,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import CommonCode from 'apiResources/constants/CommonCode';
import SizeCode from 'apiResources/constants/SizeCode';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, optionInfo } = props;

  let printPosition = '';
  let patternDstCoords = [];
  let productPath = '';
  // const optionalPath = productSize ? `/${productSize}` : printPosition ? `/${printPosition}` : '';
  // const productPath = `/Users/david/Desktop/APPAREL_FINAL/${productCode}` + optionalPath;
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  if (coordinateData[productCode].front && CommonCode.PRINT_POSITION_FRONT === optionInfo.productCode) {

    patternDstCoords = coordinateData[productCode].front;
    productPath = `/Users/david/Desktop/APPAREL_FINAL/${productCode}/front`;

  } else if (CommonCode.PRINT_POSITION_FRONT === optionInfo.productCode) {

    if (coordinateData[productCode].productSize) {

      patternDstCoords = coordinateData[productCode][SizeCode[productSize]];
      productPath = `/Users/david/Desktop/APPAREL_FINAL/${productCode}/${SizeCode[productSize]}`;

    } else {

      patternDstCoords = coordinateData[productCode];
      productPath = `/Users/david/Desktop/APPAREL_FINAL/${productCode}`;

    }
  } else {

    patternDstCoords = coordinateData[productCode].back;
    productPath = `/Users/david/Desktop/APPAREL_FINAL/${productCode}/back`;

  }

  // (1) 아트워크 좌표에 맞춰 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, 'patternImage');

  // (2) 주름 생성하기
  await getImageWrinkled(productPath, productCode);

  // (3) 아트워크 상품 위에 올리기
  return await getArtworkOnModel(productPath, productCode);
}
