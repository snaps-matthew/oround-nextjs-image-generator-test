import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/BuzCase/createImageOfStoreList";
// import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/PhoneCase/createImageOfStoreDetail_1";
// import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/PhoneCase/createImageOfStoreDetail_0";
import {loadImage} from "../../../utils/loadImage";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class BuzCase extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, optionInfo, target} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage

    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });

  }
}

export default BuzCase;
