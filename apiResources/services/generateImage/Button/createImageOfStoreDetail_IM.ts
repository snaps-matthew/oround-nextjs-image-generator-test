import {
  getArtworkReszied,
  imageDstOut,
  getArtworkOnModel,
  multiLayerMerger,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';

export const createImageOfStoreDetail_IM = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, thumbnailImage } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/Button/${productCode}/${productSize}`;
  const imageUniqueKey = uniqueKey();
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${imageUniqueKey}`;
  const frontPatternPath = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImageFront_${imageUniqueKey}`;
  const backPatternPath = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImageBack_${imageUniqueKey}`;

  // 썸네일 이미지 텍스트 파일로 변환하기
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoordsBack = coordinateData[productCode][productSize].back;
  const patternDstCoordsFront = coordinateData[productCode][productSize].front;

  // (1) 아트워크 리사이징
      // 뒷면 이미지 생성
  await getArtworkReszied(patternSrcCoords, patternDstCoordsBack, categoryName, patternImageFileName, backPatternPath);
      // 앞면 이미지 생성
  await getArtworkReszied(patternSrcCoords, patternDstCoordsFront, categoryName, patternImageFileName, frontPatternPath);

  // (2) 아트워크 마스킹 => 버튼의 경우, 앞면 아트워크 이미지만 잘라주면 된다
  await imageDstOut(frontPatternPath, productPath, 'frontmask', productCode);

  // (3) 이미지 레이어 머지
    // 버튼 이미지 레이어 순서대로 경로 붙이기
  await multiLayerMerger(LayeringRef[productCode], productCode, productPath, patternImageFileName, imageUniqueKey);

  // (4) 최종 이미지 마스킹
  await imageDstOut(patternImageFileName, productPath, 'mask', productCode);

  // (5) 최종 이미지 상품 위에 올려서 보여주기
  const finalResult = await getArtworkOnModel(productPath, productCode, patternImageFileName);

  patternImageRemover([patternImageFileName, frontPatternPath, backPatternPath]);

  return finalResult;
}
