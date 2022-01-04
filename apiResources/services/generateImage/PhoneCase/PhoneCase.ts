import {createImageOfTopView} from "apiResources/services/generateImage/PhoneCase/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class PhoneCase extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target, artProductIndex } = this;

    let templateImage = this.thumbnailImage
    await createImageOfTopView({templateImage, productEditInfo, optionInfo, artProductIndex, canvas, target });
  }
}

export default PhoneCase;
