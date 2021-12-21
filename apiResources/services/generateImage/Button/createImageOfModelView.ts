import Config from "apiResources/constants/Config";
import { loadImage } from 'apiResources/utils/loadImage'
import LayeringRef from 'apiResources/constants/LayeringRef';
import coordinateData from 'apiResources/constants/coordinateData';
import { canvasLayerMerger, flipImage, imageMasker } from 'apiResources/utils/imageProcessor';
import CommonCode from 'apiResources/constants/CommonCode';

export const createImageOfModelView = async (props:any) => {
  const { productCode, productSize, artworkWidth, artworkHeight, thumbnailImage, canvas, printPosition, optionInfo } = props;
  const productPath = `${Config.RESOURCE_CDN_URL}/${productCode}/${printPosition}/model`;
  const isGloss = optionInfo.glossyCode === CommonCode.EFFECT_LARGE_PRINT_GLOSSY ? true : false;

  // 캔버스 생성하기
  canvas.width = 1000;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // 썸네일 이미지 텍스트 파일로 변환하기

  // 틴케이스의 경우 가로/세로 옵션에 따라 아트워크가 만들어져서 그에 따라 patternSrcCoord 좌표 만들어주어야 한다
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];

  // 틴케이스 patternDstCoords => 사이즈만 고려
  const patternDstCoordsBack = coordinateData[productCode][productSize].back;
  const patternDstCoordsFront = coordinateData[productCode][productSize].front;

  // 아트워크 정보 준비
  // 뒷면
  const [backPatternX, backPatternY] = [1000 - patternDstCoordsBack[0], patternDstCoordsBack[3]];
  const backPatternWidth = patternDstCoordsBack[0] - patternDstCoordsBack[2];
  const backPatternHeight = patternDstCoordsBack[5] - patternDstCoordsBack[3];
  // 앞면
  const [frontPatternX, frontPatternY] = [patternDstCoordsFront[0], patternDstCoordsFront[1]];
  const frontPatternWidth = patternDstCoordsFront[2] - patternDstCoordsFront[0];
  const frontPatternHeight = patternDstCoordsFront[5] - patternDstCoordsFront[3];

  const buttonType = LayeringRef[productCode][3];
  const productImage = await loadImage(`${productPath}/${productSize}.png`);
  const productMaskImage = await loadImage(`${productPath}/${productSize}_mask.png`);
  const artworkFrontMask = await loadImage(`${productPath}/${productSize}_frontmask.png`);
  const glareImage = await loadImage(`${productPath}/${productSize}_glare.png`);
  const buttonBack = await loadImage(`${productPath}/${productSize}_${buttonType}.png`);


  const frontArtworkMasked = await imageMasker(thumbnailImage, artworkFrontMask, frontPatternX, frontPatternY, frontPatternWidth, frontPatternHeight, 1000, 1000);
  const flippedImage = await flipImage(thumbnailImage, backPatternX, backPatternY, backPatternWidth, backPatternHeight, 1000, 1000);
  const artworkMerged = await canvasLayerMerger([frontArtworkMasked, buttonBack, flippedImage]);
  const artworkMasked = await imageMasker(artworkMerged, productMaskImage, 0, 0, 1000, 1000, 1000, 1000);
  const layerOrder = isGloss ? [glareImage, artworkMasked, productImage] : [artworkMasked, productImage];
  const finalResult = await canvasLayerMerger(layerOrder);
  ctx.drawImage(finalResult, 0, 0, 1000, 1000);

}
