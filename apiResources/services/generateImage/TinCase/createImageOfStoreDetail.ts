import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import CommonCode from 'apiResources/constants/CommonCode';
import { uniqueKey } from 'apiResources/utils/sugar';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { loadImage } from 'apiResources/utils/loadImage';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, thumbnailImage, canvas } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/TinCase/${productCode}/${productSize}/${productColor}`;
  let patternSrcCoords = [];
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${uniqueKey()}`;
  const ctx = canvas.getContext('2d');
  [canvas.width, canvas.height] = [1000, 1000];

  // (0) 썸네일 이미지 텍스트 파일로 변환하기
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  if (directionCode === CommonCode.DIRECTION_VERTICAL) {
    patternSrcCoords = [artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight, 0, 0];
  } else {
    patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  }

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoords = coordinateData[productCode][productSize].map((coord:any) => {
    return coord / 2;
  })

  // (1) 아트워크 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 아트워크 마스킹 => 틴케이스의 경우, 아트워크 코너들을 둥글게 잘라줘야 한다
  const artworkMasked = await imageDstOut(patternImageFileName, productPath, 'mask', productCode);

  // (3) 상품 위에 올리기
  const finalImage = await loadImage(`data:image/png;base64,${artworkMasked}`);
  const productImage = await loadImage(`${productPath}/${productCode}.png`);

  ctx.drawImage(productImage, 0, 0);
  ctx.drawImage(finalImage, 0, 0);

  // 임시 생성한 이미지 텍스트 파일 삭제
  patternImageRemover([patternImageFileName]);
}
