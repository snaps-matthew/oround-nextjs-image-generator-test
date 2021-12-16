import {createImageOfTopView} from "apiResources/services/generateImage/PhoneCase/createImageOfTopView";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class PhoneCase extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {productCode, canvas, productEditInfo, optionInfo, target, drawObject,stream} = this;
    let templateImage = this.thumbnailImage
    await createImageOfTopView({templateImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default PhoneCase;
