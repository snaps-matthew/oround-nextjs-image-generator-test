import ImageComposer from "apiResources/services/generateImage/ImageComposer";
import TargetType from 'apiResources/constants/TargetType';
import { createImageOfStoreList } from 'apiResources/services/generateImage/SmartTok/createImageOfStoreList';
import { createImageOfStoreDetail } from 'apiResources/services/generateImage/SmartTok/createImageOfStoreDetail';

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

    // 리스트의 경우 하나의 이미지만 사용한다.
    if (this.target === TargetType.STORE_LIST_1 || this.target === TargetType.STORE_DETAIL_2) {

      return await createImageOfStoreDetail({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, thumbnailImage, canvas })

    } else if (this.target === TargetType.STORE_DETAIL_3 || this.target === TargetType.STORE_DETAIL_4) {

      await createImageOfStoreList({ thumbnailImage, productEditInfo, optionInfo, canvas, target });

    }
  }
}

export default SmartTok;
