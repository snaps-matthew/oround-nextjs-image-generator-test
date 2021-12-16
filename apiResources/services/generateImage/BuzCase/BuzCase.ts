import {createImageOfTopView} from "apiResources/services/generateImage/BuzCase/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class BuzCase extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, optionInfo, target} = this;
    let templateImage = this.thumbnailImage

    await createImageOfTopView({templateImage, productEditInfo, optionInfo, canvas, target });

  }
}

export default BuzCase;
