import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/Airpods/createImageOfStoreList";
// import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/PhoneCase/createImageOfStoreDetail_1";
// import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Airpods/createImageOfStoreDetail_0";
import {loadImage} from "../../../utils/loadImage";

class AirPods extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {productCode, canvas, productEditInfo, optionInfo, drawObject,stream} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage

    if (this.target === TargetType.STORE_LIST_1) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_2) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_3) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_4) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    }
  }
}

export default AirPods;
