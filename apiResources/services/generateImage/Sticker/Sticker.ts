import {createImageOfStoreList} from "apiResources/services/generateImage/Sticker/createImageOfStoreList";
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class AcrylicKeyring extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {canvas, productEditInfo, thumbnailImage, optionInfo, target, drawObject} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = thumbnailImage;

    await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target, drawObject });
    // if (this.target === TargetType.STORE_LIST_1) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_2) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_3) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // } else if (this.target === TargetType.STORE_DETAIL_4) {
    //   await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas, target });
    // }
  }
}

export default AcrylicKeyring;
