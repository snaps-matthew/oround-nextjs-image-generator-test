import {
  getArtworkReszied,
  getArtworkOnModel,
  multiLayerMerger,
  getImageWrinkled,
  changeColor,
  changeTexture,
  imageDstOut,
  changeExtraLayerColor,
  changeApparelColor,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import CommonCode from 'apiResources/constants/CommonCode';
import { SizeCode, SizeList } from 'apiResources/constants/SizeInfo';
import { ColorHexCode, TextureCode } from 'apiResources/constants/ColorCode';
import ImageProcessingRef from 'apiResources/constants/ImageProcessingRef';
import { uniqueKey } from 'apiResources/utils/sugar';
import { imageTextSaver } from 'apiResources/utils/imageTextSaver';
import { patternImageRemover } from 'apiResources/utils/patternImageRemover';
import { loadImage } from 'apiResources/utils/loadImage';
import { createCanvas } from 'canvas';

export const createImageOfStore_LIST_1 = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, optionInfo, thumbnailImage, canvas } = props;

  [canvas.width, canvas.height] = [1000, 1000];
  const ctx = canvas.getContext('2d');
  const secondaryCanvas = createCanvas(1000, 1000);
  const secondCtx = secondaryCanvas.getContext('2d');
  let printPosition = '';
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  let patternDstCoords = coordinateData[productCode];
  let productPath = `${Config.RESOURCE_CDN_URL}/Apparel/${productCode}`;
  const imageUniqueKey = uniqueKey();
  const patternImageFileName = `${ImageProcessingRef.BASE_RESOURCE_PATH}/patternImage_${imageUniqueKey}`;
  let productOption = '';
  let extraLayer:any = [];

  if (coordinateData[productCode].front && CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {
    productOption = 'front';
    patternDstCoords = patternDstCoords.front;
  } else if (CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {

    if (coordinateData[productCode].productSize) {
      productOption = SizeCode[productSize];
    }

  } else {
    productOption = 'back';
    patternDstCoords = coordinateData[productCode].back;
  }

  // 옵션이 있는 경우 [이미지경로, 아트워크 들어 갈 좌표 변경해준다]
  if (productOption) {
    productPath += `/${productOption}`;
  } else {
    patternDstCoords = coordinateData[productCode].front || coordinateData[productCode];
  }

  // ** ____ 임시로 psd 좌표 나누기 2 해서 사용 ____ ** //
  patternDstCoords = patternDstCoords.map((coord:number) => {
    return coord / 2;
  });

  // 추가 레이어 확인하고 올려준다
  const extraLayerLength = LayeringRef[productCode];

  if (extraLayerLength) {
    extraLayer = (productOption) ?  LayeringRef[productCode][productOption] : LayeringRef[productCode];
  }

  const productImage = await loadImage(`${productPath}/${productCode}.png`);
  const productCropImage = await loadImage(`${productPath}/${productCode}_crop.png`);
  const productListMask = await loadImage(`${productPath}/${productCode}_list.png`);

  // (0) 썸네일 이미지 텍스트 파일로 변환
  await imageTextSaver(thumbnailImage.toDataURL(), patternImageFileName);

  // (1) 아트워크 좌표에 맞춰 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, patternImageFileName, patternImageFileName);

  // (2) 주름 생성하기
  const artworkWrinkled = await getImageWrinkled(productPath, productCode, patternImageFileName);

  ctx.clearRect(0, 0, 1000, 1000);

  // (3) 색상 옵션 확인하고 넣어주기
  if (optionInfo.colorCode && optionInfo.colorCode !== 'T00002') {
      // [Type A] => 색상 값이 있는 경우
    if (ColorHexCode[optionInfo.colorCode]) {
      // (3-1) 옷 색상 변경하기
      await changeApparelColor(canvas, ColorHexCode[optionInfo.colorCode], productCropImage);

      // 옷 위에 패턴 올리기
      ctx.globalCompositeOperation = 'source-over';
      const artworkImage = await loadImage(`data:image/png;base64,${artworkWrinkled}`);
      ctx.drawImage(artworkImage, 0, 0);

      // (3-2) 후드/끈 여부 확인 후 색상 변경
      let stringImage = await loadImage(`${productPath}/${productCode}_string.png`);
      await changeApparelColor(secondaryCanvas, ColorHexCode[optionInfo.colorCode], stringImage);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(secondaryCanvas, 0, 0)

    } else {
      // [Type B] => 텍스처가 들어가야 하는 경우
      // (3-1) 옷 색상 변경하기
      await changeApparelColor(canvas, ColorHexCode[optionInfo.colorCode], productCropImage);

      // 옷 위에 패턴 올리기
      ctx.globalCompositeOperation = 'source-over';
      const artworkImage = await loadImage(`data:image/png;base64,${artworkWrinkled}`);
      ctx.drawImage(artworkImage, 0, 0);

      // (3-2) 후드/끈 여부 확인 후 색상 변경
      let stringImage = await loadImage(`${productPath}/${productCode}_string.png`);
      await changeApparelColor(secondaryCanvas, '#104caf', stringImage);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(secondaryCanvas, 0, 0)
    }
  }

  // (4) 상품 위에 올리기
  ctx.globalCompositeOperation = 'destination-over';
  ctx.drawImage(productImage, 0, 0, 1000, 1000);

  patternImageRemover([patternImageFileName]);

}