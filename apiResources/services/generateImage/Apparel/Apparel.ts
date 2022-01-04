import Config from 'apiResources/constants/Config';
import isEcoBag from 'apiResources/constants/isEcoBag';
import TargetType from "apiResources/constants/TargetType";
import { loadImage } from 'apiResources/utils/loadImage';
import { createImageOfModelView } from 'apiResources/services/generateImage/Apparel/createImageOfModelView'
import { createImageOfStoreList } from "apiResources/services/generateImage/Apparel/createImageOfStoreList";
import { getCreateImageInitInfo } from 'apiResources/utils/getSelectedScene';
import { EventProductArtProdIdx } from 'apiResources/constants/EventProductRef';
import ImageComposer from 'apiResources/services/generateImage/ImageComposer';

class Apparel extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const {
      target,
      productCode,
      productEditInfo,
      artProductIndex,
      thumbnailImage,
      categoryName,
      productColor,
      directionCode,
      artworkHeight,
      artworkWidth,
      productSize,
      optionInfo,
      canvas,
      tempCanvas,
      printPosition
    } = this;

    const { ctx, outBox } = getCreateImageInitInfo(target, canvas);

    if (target !== TargetType.STORE_DETAIL_4 && EventProductArtProdIdx.includes(artProductIndex)) {
      let eventProdImagePath = `${Config.RESOURCE_CDN_URL}/EventProduct/${artProductIndex}/`;
      if (target === TargetType.STORE_LIST_1 ) {
        eventProdImagePath += 'list0.png';
      } else if (target === TargetType.STORE_DETAIL_3) {
        eventProdImagePath += 'view.png';
      } else {
        eventProdImagePath += 'list1.png';
      }
      const eventProdImage = await loadImage(eventProdImagePath);
      ctx.drawImage(eventProdImage, 0, 0, outBox.width, outBox.height);
    }
    else if (this.target === TargetType.STORE_LIST_1) {
      // 리스트의 경우 하나의 이미지만 사용한다.
      // 잡화의 경우에는 탑뷰로 보여준다
      if (isEcoBag.includes(productCode)) {
        await createImageOfStoreList({ thumbnailImage, productEditInfo, optionInfo, canvas, target });
      } else {
        await createImageOfModelView({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, optionInfo, thumbnailImage, canvas, tempCanvas, printPosition, target })
      }

    } else if (this.target === TargetType.STORE_DETAIL_2) {

      await createImageOfModelView({ categoryName, productCode, productColor, productSize, directionCode, artworkWidth, artworkHeight, optionInfo, thumbnailImage, canvas, tempCanvas, printPosition, target })

    } else if (this.target === TargetType.STORE_DETAIL_3 || this.target === TargetType.STORE_DETAIL_4) {

      await createImageOfStoreList({ thumbnailImage, productEditInfo, optionInfo, canvas, target });

    }


  }
}

export default Apparel;
