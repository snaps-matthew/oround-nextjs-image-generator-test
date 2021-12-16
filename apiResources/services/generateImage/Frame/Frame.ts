import ImageComposer from "apiResources/services/generateImage/ImageComposer";
import {createImageOfTopView} from "apiResources/services/generateImage/Frame/createImageOfTopView";
import {createImageOfInteriorView} from "apiResources/services/generateImage/Frame/createImageOfInteriorView";
import TargetType from 'apiResources/constants/TargetType';

class Frame extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target, drawObject} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage
    if(target === TargetType.STORE_DETAIL_2) {
      await createImageOfInteriorView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }else{
      await createImageOfTopView({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    }
  }
}

export default Frame;
