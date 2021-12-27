import {createImageOfStoreList} from "apiResources/services/generateImage/Sticker/createImageOfStoreList";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';
import TargetType from 'apiResources/constants/TargetType';
import { createImageOfInteriorView } from 'apiResources/services/generateImage/Sticker/createImageOfInteriorView';
import { createImageOfTopView } from 'apiResources/services/generateImage/Sticker/createImageOfTopView';

class Sticker extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, thumbnailImage, optionInfo, target, drawObject} = this;
    let templateImage = thumbnailImage;
    if (target === TargetType.STORE_DETAIL_2) {
      await createImageOfInteriorView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }else{
      await createImageOfTopView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }
  }
}

export default Sticker;
