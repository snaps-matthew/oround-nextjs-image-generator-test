import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import { loadImage } from 'apiResources/utils/loadImage';
import { getCreateImageInitInfo } from 'apiResources/utils/getSelectedScene';

export const createImageOfModelView = async (props:any) => {
  const { categoryName, productCode, productColor, artworkWidth, artworkHeight, thumbnailImage, canvas, printPosition, target } = props;

  const { ctx, outBox } = getCreateImageInitInfo(target, canvas);

  const productPath = `${Config.RESOURCE_CDN_URL}/${productCode}/${printPosition}/model`;
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${uniqueKey()}`;

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoords = coordinateData[productCode];

  let patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // (0) 썸네일 이미지 텍스트 파일로 변환하기
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName)

  // (1) 아트워크 리사이징
  const artworkResized = await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 필요 이미지
  const artworkLoaded = await loadImage(`data:image/png;base64,${artworkResized}`);
  const maskImage = await loadImage(`${productPath}/mask.png`);
  const productImage = await loadImage(`${productPath}/${productColor}.png`);

  ctx.drawImage(artworkLoaded, 0, 0, outBox.width, outBox.height);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(maskImage, 0, 0, outBox.width, outBox.height);
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(productImage, 0, 0, outBox.width, outBox.height);

  // (4) 임시 생성된 파일들 삭제하기
  patternImageRemover([patternImageFileName])
}
