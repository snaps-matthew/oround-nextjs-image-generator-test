import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import { loadImage } from 'apiResources/utils/loadImage';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productColor, artworkWidth, artworkHeight, thumbnailImage, canvas } = props;
  const ctx = canvas.getContext('2d');

  const productPath = `${Config.RESOURCE_CDN_URL}/SmartTok/${productCode}/${productColor}`;
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${uniqueKey()}`;
  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoords = coordinateData[productCode].map((coord:any) => {
    return coord / 2;
  });

  let patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // (0) 썸네일 이미지 텍스트 파일로 변환하기
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName)

  // (1) 아트워크 리사이징
  const artworkResized = await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 아트워크 마스킹 => 틴케이스의 경우, 아트워크 코너들을 둥글게 잘라줘야 한다
  await imageDstOut(patternImageFileName, productPath, 'mask', productCode);

  // (3) 상품 위에 올리기
  const finalResult =  await getArtworkOnModel(productPath, productCode, patternImageFileName);

  // (4) 임시 생성된 파일들 삭제하기
  patternImageRemover([patternImageFileName])
  //
  return finalResult;

    // 아트워크 마스킹
  // const productMaskImage = await loadImage(`data:image/png;base64,${artworkResized}`);
  //
  // ctx.globalCompositeOperation = 'destination-out';
  // ctx.drawImage(productMaskImage);
}
