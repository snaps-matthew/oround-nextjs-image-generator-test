import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {createImageOfStoreList} from "apiResources/services/generateImage/PhoneCase/createImageOfStoreList";

class PhoneCase extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {productCode, canvas, productEditInfo, optionInfo, target, drawObject,stream} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage
    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // if (this.target === TargetType.STORE_LIST_1) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    // } else if (this.target === TargetType.STORE_DETAIL_2) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    // } else if (this.target === TargetType.STORE_DETAIL_3) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    // } else if (this.target === TargetType.STORE_DETAIL_4) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    // }

  }
}

export default PhoneCase;
