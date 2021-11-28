import TargetType from "apiResources/constants/TargetType";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';
import { createImageOfStoreList } from "apiResources/services/generateImage/Apparel/createImageOfStoreList";
import { createImageOfStoreDetail } from 'apiResources/services/generateImage/Apparel/createImageOfStoreDetail';

class Apparel extends ImageComposer {
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
    let templateImage = thumbnailImage;
    if (this.target === TargetType.STORE_LIST_1 || this.target === TargetType.STORE_DETAIL_2) {

      return await createImageOfStoreDetail({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, optionInfo })

    } else if (this.target === TargetType.STORE_DETAIL_3 || this.target === TargetType.STORE_DETAIL_4) {

      await createImageOfStoreList({ templateImage, productEditInfo, optionInfo, canvas, target });

    }
  }
}

export default Apparel;
