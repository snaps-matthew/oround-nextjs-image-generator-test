import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";

import {loadImage} from "apiResources/utils/loadImage";

export const createImageOfStoreDetail_0 = async (props:{productCode: string, templateImage: any, canvas: any}) => {
  const {productCode, templateImage, canvas} = props;
  const outBox = {width: 1000, height: 1000};
  let inBox = {
    [ProductCode.POLAROID_ORIGINAL]:{
      width: 570,
      height: 679,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/popup_polaroid_original_01@2x.png`
    },
    [ProductCode.POLAROID_MINI]:{
      width: 427,
      height: 680,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/popup_polaroidl_mini_01@2x.png`
    }
  };

  const target = inBox[productCode];
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');

  const x = (outBox.width - target.width) / 2;
  const y = (outBox.height - target.height) / 2;

  ctx.drawImage(templateImage, x, y, target.width, target.height);

  const skinImage = await loadImage(`${Config.RESOURCE_CDN_URL}${target.skinPath}`);
  ctx.drawImage(skinImage, 0, 0, outBox.width, outBox.height);
}
