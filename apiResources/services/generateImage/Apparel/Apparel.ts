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
import { createImageOfStoreList } from 'apiResources/services/generateImage/Apparel/createImageOfStoreList';
const { exec } = require('child_process');

class Apparel extends ImageComposer {
  constructor() {
    super();
  }

  //

  async composite() {
    const { target, optionInfo, canvas, productEditInfo  } = this;

    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage
    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });

    // if (this.target === TargetType.STORE_LIST_1) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    //
    // } else if (this.target === TargetType.STORE_DETAIL_2) {
    //
    //   return true;
    //
    // } else if (this.target === TargetType.STORE_DETAIL_3) {
    //
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    //
    // } else if (this.target === TargetType.STORE_DETAIL_4) {
    //
    //
    // }
  }
}

export default Apparel;
