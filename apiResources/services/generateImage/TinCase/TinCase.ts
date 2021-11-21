import ImageComposer from "../ImageComposer";
import {ExecException} from "child_process";
import {
  getArtworkOnModel,
  getArtworkReszied,
  getImageWrinkled,
  imageDstOut,
} from '../../../utils/artworkImageCreator';
import {imageTextSaver} from "../../../utils/imageTextSaver";
import TargetType from '../../../constants/TargetType';
import { createImageOfStoreDetail_0 } from '../Apparel/createImageOfStoreDetail_0';
const { exec } = require('child_process');

class TinCase extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {

    const { target, productCode, patternSrcCoords, patternDstCoords, productPath, categoryName, productOption, thumbnailImage, colorCode, sizeCode } = this;

    // 리스트 && 상세이미지 용도별로 내려주기
    if (target === TargetType.STORE_DETAIL_1) {
      // 아트워크 리사이징
      await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName);

      // 최종 아트워크 상품위에 올리기
      return await getArtworkOnModel(productPath, productCode);
    }
    else if (target === TargetType.STORE_DETAIL_2) {
      return await createImageOfStoreDetail_0({ productCode, thumbnailImage, productOption, colorCode })
    }
    else if (target === TargetType.STORE_DETAIL_3) {

    }
    else {

    }
  }
}

export default TinCase;
