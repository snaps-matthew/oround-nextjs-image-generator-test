import {
  getArtworkReszied,
  imageDstOut,
  getArtworkOnModel,
  multiLayerMerger,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/Button/${productCode}/${productSize}`;

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoordsBack = coordinateData[productCode][productSize].back;
  const patternDstCoordsFront = coordinateData[productCode][productSize].front;

  // (1) 아트워크 리사이징
      // 뒷면 이미지 생성
  await getArtworkReszied(patternSrcCoords, patternDstCoordsBack, categoryName, 'patternImageBack');
      // 앞면 이미지 생성
  await getArtworkReszied(patternSrcCoords, patternDstCoordsFront, categoryName, 'patternImageFront');

  // (2) 아트워크 마스킹 => 버튼의 경우, 앞면 아트워크 이미지만 잘라주면 된다
  await imageDstOut('patternImageFront', productPath, 'frontmask', productCode);

  // (3) 이미지 레이어 머지
    // 버튼 이미지 레이어 순서대로 경로 붙이기

  await multiLayerMerger(LayeringRef[productCode], productCode, productPath);

  await imageDstOut('patternImage', productPath, 'mask', productCode);

  return getArtworkOnModel(productPath, productCode);
}
