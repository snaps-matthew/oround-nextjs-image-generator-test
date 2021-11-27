import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import CommonCode from 'apiResources/constants/CommonCode';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/TinCase/${productCode}/${productSize}/${productColor}`;
  let patternSrcCoords = [];

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  if (directionCode === CommonCode.DIRECTION_VERTICAL) {
    patternSrcCoords = [artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight, 0, 0];
  } else {
    patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  }

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoords = coordinateData[productCode][productSize]

  // (1) 아트워크 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, 'patternImage');

  // (2) 아트워크 마스킹 => 틴케이스의 경우, 아트워크 코너들을 둥글게 잘라줘야 한다
  await imageDstOut(productPath, 'mask', productCode);

  // (3) 상품 위에 올리기
  return await getArtworkOnModel(productPath, productCode);
}
