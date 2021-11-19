import TargetType from "apiResources/constants/TargetType";
import CommonCode from "apiResources/constants/CommonCode";

import {loadImage} from "apiResources/utils/loadImage";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/Frame/createImageOfStoreList";
import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Frame/createImageOfStoreDetail_0";
import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Frame/createImageOfStoreDetail_1";

class Frame extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const [theme, purpose, frameColor, freeSizeVal] = this.option.split(",");
    const {productCode, paperCode, canvas, drawObject} = this;

    // 기준 사이즈 & 이미지
    let productSize = this.productSizeInfo[0];
    const originImage = this.thumbnailImage

    const offset = paperCode === CommonCode.FRAME_CANVAS? 30 : 2;
    setDisplayMM(productSize, offset, freeSizeVal);
    resizeToCorrectSize(productSize, originImage.width, originImage.height);
    //???? loadedImages = removeCuttingLine(loadedImages, productSize);
    // const originImage = loadedImages[0]

    // 완성된 액자를 전시 용도에 따라 마지막 배경 합성을 한다.
    if (this.target === TargetType.STORE_DETAIL_0) {
      await createImageOfStoreDetail_0({ productCode, paperCode, productSize, originImage, frameColor, canvas, purpose, theme, drawObject });

    } else if (this.target === TargetType.STORE_DETAIL_1) {
      await createImageOfStoreDetail_1({ productCode, paperCode, productSize, originImage, frameColor, canvas});

    } else if (this.target === TargetType.STORE_LIST) {
      await createImageOfStoreList({ paperCode, productSize, originImage, frameColor, canvas });
    }
  }
}

export default Frame;
