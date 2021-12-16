import TargetType from "apiResources/constants/TargetType";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';
import { createImageOfTopView } from "apiResources/services/generateImage/Button/createImageOfTopView";
import { createImageOfModelView } from 'apiResources/services/generateImage/Button/createImageOfModelView';

class Button extends ImageComposer {
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

    // 리스트의 경우 하나의 이미지만 사용한다.
    if (this.target === TargetType.STORE_DETAIL_2 || this.target === TargetType.STORE_LIST_1) {

      return await createImageOfModelView({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, thumbnailImage, canvas })

    } else if (this.target === TargetType.STORE_DETAIL_3 || this.target === TargetType.STORE_DETAIL_4) {

      await createImageOfTopView({ thumbnailImage, productEditInfo, optionInfo, canvas, target });

    }
  }
}

export default Button;
