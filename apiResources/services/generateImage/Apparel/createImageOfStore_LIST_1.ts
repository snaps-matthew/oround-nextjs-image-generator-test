import {
  getArtworkReszied,
  getImageWrinkled,
  applyInnerWrinkle,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import CommonCode from 'apiResources/constants/CommonCode';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { loadImage } from 'apiResources/utils/loadImage';
import { createCanvas } from 'canvas';
import ListImageOffset from 'apiResources/constants/ListImageOffset';

export const createImageOfStore_LIST_1 = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, optionInfo, thumbnailImage, canvas } = props;

  [canvas.width, canvas.height] = [1000, 1000];
  const ctx = canvas.getContext('2d');
  const tempCanvas = createCanvas(1000, 1000);
  const tempCtx = tempCanvas.getContext('2d');
  let printPosition = '';
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  let patternDstCoords = coordinateData[productCode];
  let productPath = `${Config.RESOURCE_CDN_URL}/Apparel/${productCode}`;
  const imageUniqueKey = uniqueKey();
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${imageUniqueKey}`;
  let productOption = '';
  let extraLayer:any = [];
  let extraLayerImage;

  if (coordinateData[productCode].front && CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {

    productOption = 'front';
    patternDstCoords = patternDstCoords.front;

  } else if (CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {

    if (coordinateData[productCode][productSize]) {

      productOption = productSize;
    }

  } else {

    productOption = 'back';
    patternDstCoords = coordinateData[productCode].back;
  }

  // 옵션이 있는 경우 [이미지경로, 아트워크 들어 갈 좌표 변경해준다]
  if (productOption) {

    productPath += `/${productOption}`;
    patternDstCoords = coordinateData[productCode];
    patternDstCoords = patternDstCoords[productOption];

  } else {

    patternDstCoords = coordinateData[productCode].front || coordinateData[productCode];
  }

  // ** ____ 임시로 psd 좌표 나누기 2 해서 사용 ____ ** //
  patternDstCoords = patternDstCoords.map((coord:number) => {
    return coord / 2;
  });

  // 추가 레이어 확인하고 올려준다
  if (LayeringRef[productCode]) {
    if (LayeringRef[productCode][productOption]) {
      extraLayer = LayeringRef[productCode][productOption]
    } else {
      extraLayer = LayeringRef[productCode];
    }
  }

  const productImage = await loadImage(`${productPath}/${productCode}_${optionInfo.colorCode}.png`);
  const productCropImage = await loadImage(`${productPath}/${productCode}_crop.png`);

  if (extraLayer.length) {
    extraLayerImage = await loadImage(`${productPath}/${productCode}_${extraLayer[0]}.png`);
  }

  // (0) 썸네일 이미지 텍스트 파일로 변환
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // (1) 아트워크 좌표에 맞춰 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 주름 생성하기
  const artworkWrinkled:any = await getImageWrinkled(productPath, productCode, patternImageFileName);
  const artworkImage = await loadImage(`data:image/png;base64,${artworkWrinkled}`);
  tempCtx.globalCompositeOperation = 'source-over';
  tempCtx.drawImage(artworkImage, 0, 0);
  await applyInnerWrinkle(canvas, tempCanvas, productCropImage);

  if (extraLayer.length) {
    if (extraLayer.includes('finger')) {
      extraLayerImage = await loadImage(`${productPath}/${productCode}_${extraLayer[0]}.png`);
    } else {
      extraLayerImage = await loadImage(`${productPath}/${productCode}_${extraLayer[0]}_${optionInfo.colorCode}.png`);
    }
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(extraLayerImage, 0, 0);
  }

  // (4) 상품 위에 올리기
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(productImage, 0, 0, 1000, 1000);

  tempCtx.drawImage(canvas, 0, 0);
  [canvas.width, canvas.height] = [ListImageOffset[productCode].width, ListImageOffset[productCode].height];
  ctx.globalCompositeOperation = 'source-over'
  ctx.drawImage(
    tempCanvas,
    ListImageOffset[productCode].x, ListImageOffset[productCode].y, ListImageOffset[productCode].width, ListImageOffset[productCode].height,
    0, 0, ListImageOffset[productCode].width, ListImageOffset[productCode].height);


  patternImageRemover([patternImageFileName]);

}
