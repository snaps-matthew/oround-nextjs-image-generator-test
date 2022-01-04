import {createImageOfTopView} from "apiResources/services/generateImage/AcrylicKeyring/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class AcrylicKeyring extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target, thumbnailImage, artProductIndex } = this;
    await createImageOfTopView({thumbnailImage, productEditInfo, optionInfo, artProductIndex, canvas, target });
  }
}

export default AcrylicKeyring;
