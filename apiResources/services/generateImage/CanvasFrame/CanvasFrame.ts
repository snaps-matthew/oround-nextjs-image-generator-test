// import TargetType from "apiResources/constants/TargetType";
//
// import {loadImages} from "apiResources/services/loadImages";
// import {setDisplayMM} from "apiResources/services/setDisplayMM";
// import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
// import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
// import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
// import {createImageOfStoreList} from "apiResources/services/generateImage/Polaroid/createImageOfStoreList";
// import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_1";
// import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_0";
// import {loadImage} from "../../../utils/loadImage";
//
// class CanvasFrame extends ImageCanvas {
//   constructor() {
//     super();
//   }
//
//   async composite() {
//     const {productCode, canvas, drawObject,stream} = this;
//     // 리스트의 경우 하나의 이미지만 사용한다.
//     let templateImage =
//       this.thumbnailImage.createJPEGStream({
//         quality: 1,
//         progressive: true,
//         chromaSubsampling: false,
//       });
//     console.log('templateImage=-=-22222=',templateImage)
//     // setDisplayMM(productSize, 1);
//     // resizeToCorrectSize(productSize, templateImage.width, templateImage.height);
//     // loadedImages = removeCuttingLine(loadedImages, productSize);
//
//     if (this.target === TargetType.STORE_DETAIL_0) {
//       // templateImage = loadedImages[0];
//       await createImageOfStoreDetail_0({ productCode, templateImage, canvas});
//
//     } else if (this.target === TargetType.STORE_DETAIL_1) {
//       // await createImageOfStoreDetail_1({ productCode, loadedImages, canvas, drawObject });
//
//     } else if (this.target === TargetType.STORE_LIST) {
//       // templateImage = loadedImages[0];
//       // await createImageOfStoreList({ productCode, templateImage, canvas });
//
//       // let imagePath = 'https://cdn.ohprint.me/8315-project/2021/11/03/20211103005138/edit/202111031430255449215.png'
//       // templateImage = await loadImage(imagePath)
//       await createImageOfStoreList({ productCode, templateImage, canvas });
//     }
//   }
// }
//
// export default CanvasFrame;

// import TargetType from "apiResources/constants/TargetType";
// import CommonCode from "apiResources/constants/CommonCode";
//
// import {loadImage} from "apiResources/utils/loadImage";
// import {setDisplayMM} from "apiResources/services/setDisplayMM";
// import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
// import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
// import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
// import {createImageOfStoreList} from "apiResources/services/generateImage/Frame/createImageOfStoreList";
// import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Frame/createImageOfStoreDetail_0";
// import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Frame/createImageOfStoreDetail_1";
//
// class Frame extends ImageCanvas {
//   constructor() {
//     super();
//   }
//
//   async composite() {
//     const [theme, purpose, frameColor, freeSizeVal] = this.option.split(",");
//     const {productCode, paperCode, canvas, drawObject} = this;
//
//     // 기준 사이즈 & 이미지
//     let productSize = this.productSizeInfo[0];
//     const originImage = this.thumbnailImage
//
//     const offset = paperCode === CommonCode.FRAME_CANVAS? 30 : 2;
//     setDisplayMM(productSize, offset, freeSizeVal);
//     resizeToCorrectSize(productSize, originImage.width, originImage.height);
//     //???? loadedImages = removeCuttingLine(loadedImages, productSize);
//     // const originImage = loadedImages[0]
//
//     // 완성된 액자를 전시 용도에 따라 마지막 배경 합성을 한다.
//     if (this.target === TargetType.STORE_DETAIL_0) {
//       await createImageOfStoreDetail_0({ productCode, paperCode, productSize, originImage, frameColor, canvas, purpose, theme, drawObject });
//
//     } else if (this.target === TargetType.STORE_DETAIL_1) {
//       await createImageOfStoreDetail_1({ productCode, paperCode, productSize, originImage, frameColor, canvas});
//
//     } else if (this.target === TargetType.STORE_LIST) {
//       await createImageOfStoreList({ paperCode, productSize, originImage, frameColor, canvas });
//     }
//   }
// }
//
// export default Frame;

import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/CanvasFrame/createImageOfStoreList";
import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_1";
import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_0";
import {loadImage} from "../../../utils/loadImage";

class CanvasFrame extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {
    const {productCode, canvas, productEditInfo, optionInfo, drawObject,stream} = this;
    // 리스트의 경우 하나의 이미지만 사용한다.
    let templateImage = this.thumbnailImage

    if (this.target === TargetType.STORE_LIST_1) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_2) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_3) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    } else if (this.target === TargetType.STORE_DETAIL_4) {
      await createImageOfStoreList({templateImage, productEditInfo, optionInfo, canvas });
    }
  }
}

export default CanvasFrame;

