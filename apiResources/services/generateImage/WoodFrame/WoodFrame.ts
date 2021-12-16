import {createImageOfInteriorView} from "apiResources/services/generateImage/WoodFrame/createImageOfInteriorView";
import {createImageOfTopView} from "apiResources/services/generateImage/WoodFrame/createImageOfTopView";
import TargetType from 'apiResources/constants/TargetType';
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class WoodFrame extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target, drawObject} = this;
    let templateImage = this.thumbnailImage

    if (target === TargetType.STORE_DETAIL_2) {
      await createImageOfInteriorView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }else{
      await createImageOfTopView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }
  }
}

export default WoodFrame;
