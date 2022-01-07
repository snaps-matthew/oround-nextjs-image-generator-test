import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import CommonCode from 'apiResources/constants/CommonCode';
import { uniqueKey } from 'apiResources/utils/sugar';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { loadImage } from 'apiResources/utils/loadImage';
import { getCreateImageInitInfo } from 'apiResources/utils/getSelectedScene';

export const createImageOfModelView = async (props:any) => {
  const { categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, thumbnailImage, canvas, printPosition, target } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/${productCode}/${printPosition}/model`;
  let patternSrcCoords = [];
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${uniqueKey()}`;
  const { ctx, outBox } = getCreateImageInitInfo(target, canvas);
  const imageListViewRatio = outBox.width / 1000;

  // (0) 썸네일 이미지 텍스트 파일로 변환하기
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  if (directionCode === CommonCode.DIRECTION_VERTICAL) {
    patternSrcCoords = [artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight, 0, 0];
  } else {
    patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  }

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoords = coordinateData[productCode][productSize].map((c:any) => c * imageListViewRatio);

  // (1) 아트워크 리사이징
  const artworkResized = await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 아트워크 마스킹 => 틴케이스의 경우, 아트워크 코너들을 둥글게 잘라줘야 한다

  // (3) 상품 위에 올리기
  const productImage = await loadImage(`${productPath}/${productColor}_${productSize}.png`);
  const maskImage = await loadImage(`${productPath}/${productSize}_mask.png`);
  const artworkLoaded = await loadImage(`data:image/png;base64,${artworkResized}`);

  ctx.drawImage(artworkLoaded, 0, 0);
  ctx.globalCompositeOperation = 'destination-in';
  ctx.drawImage(artworkLoaded, 0, 0);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(maskImage, 0, 0, outBox.width, outBox.height);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(productImage, 0, 0, outBox.width, outBox.height);

  // 임시 생성한 이미지 텍스트 파일 삭제
  patternImageRemover([patternImageFileName]);
}
