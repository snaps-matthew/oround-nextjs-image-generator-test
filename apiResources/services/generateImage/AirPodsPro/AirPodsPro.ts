import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {createImageOfStoreList} from "apiResources/services/generateImage/AirPodsPro/createImageOfStoreList";

class AirPodsPro extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, optionInfo, target, thumbnailImage } = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    await createImageOfStoreList({thumbnailImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default AirPodsPro;
