import ImageComposer from "../ImageComposer";
import {ExecException} from "child_process";
import {
  getArtworkOnModel,
  getArtworkReszied,
  getImageWrinkled,
  imageDstOut,
} from 'apiResources/utils/artworkImageCreator';
import {imageTextSaver} from "apiResources/utils/imageTextSaver";
import TargetType from 'apiResources/constants/TargetType';
import { createImageOfStoreList } from 'apiResources/services/generateImage/SmartTok/createImageOfStoreList';
const { exec } = require('child_process');

class SmartTok extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {

    const { canvas, productEditInfo, target, productCode, patternSrcCoords, patternDstCoords, productPath, categoryName, thumbnailImage, colorCode, sizeCode, optionInfo } = this;
    let templateImage = this.thumbnailImage
    // 리스트 && 상세이미지 용도별로 내려주기
    if (target === TargetType.STORE_LIST_1) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    }else if (target === TargetType.STORE_DETAIL_2) {
      // 아트워크 리사이징
      // await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName);
      // // 아트워크 패턴 둥글게 자르기
      // await imageDstOut(productPath, productCode);
      // // 최종 아트워크 상품위에 올리기
      // await getArtworkOnModel(productPath, productCode);
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    }
    else if (target === TargetType.STORE_DETAIL_3 || target === TargetType.STORE_DETAIL_4) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    }
  }
}

export default SmartTok;
