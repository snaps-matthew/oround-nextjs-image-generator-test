import {
  getArtworkReszied,
  getImageWrinkled,
  applyInnerWrinkle
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
import ListImageOffset from 'apiResources/constants/ListImageOffset';
import TargetType from 'apiResources/constants/TargetType';

export const createImageOfModelView = async (props:any) => {
  const { categoryName, productCode, productColor, artworkWidth, artworkHeight, optionInfo, thumbnailImage, canvas, tempCanvas, printPosition, target } = props;
    [canvas.width, canvas.height] = [1000, 1000];
  const ctx = canvas.getContext('2d');
  const tempCtx = tempCanvas.getContext('2d');
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  let patternDstCoords = coordinateData[productCode];
  let productPath = `${Config.RESOURCE_CDN_URL}/${productCode}`;
  const imageUniqueKey = uniqueKey();
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${imageUniqueKey}`;
  let productOption = '';
  let extraLayer:any = [];
  let extraLayerImage;
  const isFrontCoordinate = coordinateData[productCode][printPosition] || [];

  if (isFrontCoordinate.length && CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {
    // productOption = 'front';
    productOption = printPosition;
    patternDstCoords = isFrontCoordinate;

  } else if (CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {

    productOption = '';

  } else {

    // productOption = 'back';
    productOption = printPosition;
    patternDstCoords = coordinateData[productCode][productOption];
  }

  if (productOption) {

    productPath += `/${productOption}/model`;

  } else {
    productPath += '/model';
  }

  // ?????? ????????? ???????????? ????????????
  if (LayeringRef[productCode]) {
    if (LayeringRef[productCode][productOption]) {
      extraLayer = LayeringRef[productCode][productOption]
    } else {
      extraLayer = LayeringRef[productCode];
    }
  }

  const productImage = await loadImage(`${productPath}/${productColor}.png`);
  const shadowImage = await loadImage(`${productPath}/shadow.png`);
  const lightImage = await loadImage(`${productPath}/light.png`);

  // (0) ????????? ????????? ????????? ????????? ??????
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // (1) ???????????? ????????? ?????? ????????????
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);
  // (2) ?????? ????????????
  const artworkWrinkled:any = await getImageWrinkled(productPath, productCode, patternImageFileName);
  const artworkImage = await loadImage(`data:image/png;base64,${artworkWrinkled}`);
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(artworkImage, 0, 0, 1000, 1000);
  await applyInnerWrinkle(canvas, artworkImage, shadowImage, lightImage);

  if (extraLayer.length) {
    if (extraLayer.includes('finger')) {
      extraLayerImage = await loadImage(`${productPath}/${extraLayer[0]}.png`);
    } else {
      extraLayerImage = await loadImage(`${productPath}/${extraLayer[0]}_${productColor}.png`);
    }

    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(extraLayerImage, 0, 0, 1000, 1000);
  }

  // (4) ?????? ?????? ?????????
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(productImage, 0, 0, 1000, 1000);

  if (target === TargetType.STORE_LIST_1) {
    tempCtx.drawImage(canvas, 0, 0, 1000, 1000);
    [canvas.width, canvas.height] = [600, 600];
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(
      tempCanvas,
      ListImageOffset[productCode].x, ListImageOffset[productCode].y, ListImageOffset[productCode].width, ListImageOffset[productCode].height,
      0, 0, 600, 600);
  }

  patternImageRemover([patternImageFileName]);

}
