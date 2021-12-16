import {createImageOfTopView} from "apiResources/services/generateImage/Airpods/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class AirPods extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, optionInfo, target, thumbnailImage} = this;

    await createImageOfTopView({thumbnailImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default AirPods;
