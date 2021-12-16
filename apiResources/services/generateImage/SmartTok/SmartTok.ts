import ImageComposer from "apiResources/services/generateImage/ImageComposer";
import TargetType from 'apiResources/constants/TargetType';
import { createImageOfTopView } from 'apiResources/services/generateImage/SmartTok/createImageOfTopView';
import { createImageOfModelView } from 'apiResources/services/generateImage/SmartTok/createImageOfModelView';

class SmartTok extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {
      target,
      productCode,
      productEditInfo,
      thumbnailImage,
      categoryName,
      productColor,
      directionCode,
      artworkHeight,
      artworkWidth,
      productSize,
      optionInfo,
      canvas } = this;

    if (this.target === TargetType.STORE_LIST_1 || this.target === TargetType.STORE_DETAIL_2) {

      return await createImageOfModelView({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, thumbnailImage, canvas })

    } else if (this.target === TargetType.STORE_DETAIL_3 || this.target === TargetType.STORE_DETAIL_4) {

      await createImageOfTopView({ thumbnailImage, productEditInfo, optionInfo, canvas, target });

    }
  }
}

export default SmartTok;
