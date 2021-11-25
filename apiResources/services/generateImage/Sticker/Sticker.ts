import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/Sticker/createImageOfStoreList";
import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_1";
import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_0";
import {loadImage} from "../../../utils/loadImage";

class AcrylicKeyring extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, optionInfo, target} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage
    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // if (this.target === TargetType.STORE_LIST_1) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_2) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_3) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_4) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // }
  }
}

export default AcrylicKeyring;
