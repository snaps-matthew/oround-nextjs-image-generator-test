import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/Polaroid/createImageOfStoreList";
import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_1";
import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_0";
import {loadImage} from "../../../utils/loadImage";

class Polaroid extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {productCode, canvas, drawObject,stream} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage =
      this.thumbnailImage.createJPEGStream({
      quality: 1,
      progressive: true,
      chromaSubsampling: false,
    });

    if (this.target === TargetType.STORE_DETAIL_3) {
      // templateImage = loadedImages[0];
      await createImageOfStoreDetail_0({ productCode, templateImage, canvas});

    } else if (this.target === TargetType.STORE_DETAIL_2) {
      // await createImageOfStoreDetail_1({ productCode, loadedImages, canvas, drawObject });

    } else if (this.target === TargetType.STORE_LIST_1) {
      // templateImage = loadedImages[0];
      // await createImageOfStoreList({ productCode, templateImage, canvas });

      // let imagePath = 'https://cdn.ohprint.me/8315-project/2021/11/03/20211103005138/edit/202111031430255449215.png'
      // templateImage = await loadImage(imagePath)
      await createImageOfStoreList({ productCode, templateImage, canvas });
    }
  }
}

export default Polaroid;
