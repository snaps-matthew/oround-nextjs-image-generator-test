import {
  getArtworkReszied,
  getArtworkOnModel,
  multiLayerMerger, getImageWrinkled, changeColor, changeTexture, imageDstOut, changeExtraLayerColor,
} from 'apiResources/utils/artworkImageCreator';
import Config from "apiResources/constants/Config";
import coordinateData from 'apiResources/constants/coordinateData';
import LayeringRef from 'apiResources/constants/LayeringRef';
import CommonCode from 'apiResources/constants/CommonCode';
import { SizeCode, SizeList } from 'apiResources/constants/SizeInfo';
import { ColorHexCode, TextureCode } from 'apiResources/constants/ColorCode';

export const createImageOfStoreDetail = async (props:any) => {
  const { categoryName, productCode, productSize, artworkWidth, artworkHeight, optionInfo } = props;

  let printPosition = '';
  const patternSrcCoords = [0, 0, artworkWidth, 0, artworkWidth, artworkHeight, 0, artworkHeight];
  let patternDstCoords = coordinateData[productCode];
  let productPath = `${Config.RESOURCE_CDN_URL}/Apparel/${productCode}`;
  let productOption = '';
  let extraLayer:any = [];

  if (coordinateData[productCode].front && CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {
    productOption = 'front';
    patternDstCoords = patternDstCoords.front;
    // productPath += '/front';
  } else if (CommonCode.PRINT_POSITION_FRONT === optionInfo.printPositionCode) {

    if (coordinateData[productCode].productSize) {
      productOption = SizeCode[productSize];
      // patternDstCoords = patternDstCoords[SizeCode[productSize]];
      // productPath += `/${SizeCode[productSize]}`;
    }

  } else {
    productOption = 'back';
    patternDstCoords = coordinateData[productCode].back;
    // productPath += '/back';
  }

  // 옵션이 있는 경우 [이미지경로, 아트워크 들어 갈 좌표 변경해준다]
  if (productOption) {
    productPath += `/${productOption}`;
  } else {
    patternDstCoords = coordinateData[productCode].front || coordinateData[productCode];
  }
  // 추가 레이어 확인하고 올려준다
  const extraLayerLength = LayeringRef[productCode];

  if (extraLayerLength) {
    extraLayer = (productOption) ?  LayeringRef[productCode][productOption] : LayeringRef[productCode];
  }

  // (1) 아트워크 좌표에 맞춰 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName, 'patternImage');

  // (2) 주름 생성하기
  await getImageWrinkled(productPath, productCode);

  // (3) 색상 옵션들어왔는지 확인하고 옷 색상 변경해주기 => 텍스처가 있는 경우에는 텍스처로 대신해서 넣어주어야 한다
    // 화이트의 경우 색상변경 하지 않고 기본 이미지에 올려 준다
  if (optionInfo.colorCode && optionInfo.colorCode !== 'T00002') {

    if (ColorHexCode[optionInfo.colorCode]) {
      const colorInfo = ColorHexCode[optionInfo.colorCode];
      await changeColor(productPath, productCode, colorInfo);
      if (extraLayer.length) await changeExtraLayerColor(extraLayer.filter((item:any) => item !== 'patternImage' && item !== 'finger')[0], productPath, productCode, colorInfo);
    } else {
      const texturePath = `${Config.RESOURCE_CDN_URL}/Texture/${TextureCode[optionInfo.colorCode]}`;
      await changeTexture(productPath, productCode, texturePath);
      if (extraLayer.length) await changeExtraLayerColor(extraLayer.filter((item:any) => item !== 'patternImage' && item !== 'finger')[0], productPath, productCode, texturePath);
    }
  }

  // (4) 추가 레이어 확인하기 => 어패럴 몇 상품들은, [후드/ 후드 끈/ 파우치 위 손가락] 등을 올려주어야 하는 는우가 있다
  // if (extraLayer.includes('finger')) await multiLayerMerger(extraLayer, productCode, productPath);

  // return await imageDstOut('finalImage', productPath, 'list', productCode);

  // (5) 아트워크 상품 위에 올리기
  return await getArtworkOnModel(productPath, productCode);
}
