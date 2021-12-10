import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { loadImage } from 'apiResources/utils/loadImage'
import { canvasLayerMerger, flipImage, imageMasker } from 'apiResources/utils/imageProcessor';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, thumbnailImage, canvas } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/Button/${productCode}/${productSize}`;
  const imageUniqueKey = uniqueKey();
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${imageUniqueKey}`;
  const frontPatternPath = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImageFront_${imageUniqueKey}`;
  const backPatternPath = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImageBack_${imageUniqueKey}`;

  // 캔버스 생성하기
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // 썸네일 이미지 텍스트 파일로 변환하기

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoordsBack = coordinateData[productCode][productSize].back.map((coord:any) => {
    return coord / 2;
  });
  const patternDstCoordsFront = coordinateData[productCode][productSize].front.map((coord:any) => {
    return coord / 2;
  });

    // 아트워크 정보 준비
  // 뒷면
  const [backPatternX, backPatternY] = [1000 - patternDstCoordsBack[0], patternDstCoordsBack[3]];
  const backPatternWidth = patternDstCoordsBack[0] - patternDstCoordsBack[2];
  const backPatternHeight = patternDstCoordsBack[5] - patternDstCoordsBack[3];
  // 앞면
  const [frontPatternX, frontPatternY] = [patternDstCoordsFront[0], patternDstCoordsFront[1]];
  const frontPatternWidth = patternDstCoordsFront[2] - patternDstCoordsFront[0];
  const frontPatternHeight = patternDstCoordsFront[5] - patternDstCoordsFront[3];

  // (1) 아트워크 리사이징
      // 뒷면 이미지 생성 => 뒤집어서 위치로
  // ctx.drawImage(thumbnailImage, backPatternX, backPatternY, backPatternWidth, backPatternHeight);
      // 앞면 이미지 생성
  // ctx.drawImage(thumbnailImage, frontPatternX, frontPatternY, frontPatternWidth, frontPatternHeight);

  const buttonType = LayeringRef[productCode][3];
  const productImage = await loadImage(`${productPath}/${productCode}.png`);
  const productMaskImage = await loadImage(`${productPath}/${productCode}_mask.png`);
  const artworkFrontMask = await loadImage(`${productPath}/${productCode}_frontmask.png`);
  const glareImage = await loadImage(`${productPath}/${productCode}_glare.png`);
  const buttonBack = await loadImage(`${productPath}/${productCode}_${buttonType}.png`);

  // ctx.translate(2000,0);
  // ctx.scale(-1,1);
  // ctx.drawImage(thumbnailImage, backPatternX, backPatternY, backPatternWidth, backPatternHeight);
  const frontArtworkMasked = await imageMasker(thumbnailImage, artworkFrontMask, frontPatternX, frontPatternY, frontPatternWidth, frontPatternHeight, 1000, 1000);
  const flippedImage = await flipImage(thumbnailImage, backPatternX, backPatternY, backPatternWidth, backPatternHeight, 1000, 1000);
  const artworkMerged = await canvasLayerMerger([frontArtworkMasked, buttonBack, flippedImage]);
  const artworkMasked = await imageMasker(artworkMerged, productMaskImage, 0, 0, 1000, 1000, 1000, 1000);
  const finalResult = await canvasLayerMerger([glareImage, artworkMasked, productImage]);
  ctx.drawImage(finalResult, 0, 0, 1000, 1000);

  // console.log(`<img src='${canvas.toDataURL()}' />`);
  // return canvas
}
