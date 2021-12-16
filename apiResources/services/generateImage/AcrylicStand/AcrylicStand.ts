import {createImageOfTopView} from "apiResources/services/generateImage/AcrylicStand/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class AcrylicStand extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target, thumbnailImage} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    await createImageOfTopView({thumbnailImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default AcrylicStand;
