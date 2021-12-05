import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {createImageOfStoreList} from "apiResources/services/generateImage/Frame/createImageOfStoreList";

class Frame extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage
    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default Frame;
