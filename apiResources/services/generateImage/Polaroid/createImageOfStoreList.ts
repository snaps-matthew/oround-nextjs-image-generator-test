import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";

import {loadImage} from "apiResources/utils/loadImage";
import {Image} from "canvas";

export const createImageOfStoreList = async (props:{ productCode: string, templateImage: any, canvas: any}) => {
  const {productCode, templateImage, canvas} = props;
  const outBox = {width: 720, height: 720};
  let inBox = {
    [ProductCode.POLAROID_ORIGINAL]:{
      width: 491,
      height: 585,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/list_polaroid_original@2x.png`
    },
    [ProductCode.POLAROID_MINI]:{
      width: 367,
      height: 585,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/list_polaroid_mini@2x.png`
    }
  };

  const target = inBox[productCode];
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');

  const x = (outBox.width - target.width) / 2;
  const y = (outBox.height - target.height) / 2;
  ctx.drawImage(templateImage.canvas, x, y, target.width, target.height);
  console.log('=-=-=',22222222)
  // const skinImage = await loadImage(resolve(__dirname, target.skinPath));
  // ctx.drawImage(skinImage, 0, 0, outBox.width, outBox.height);
  ctx.drawImage(templateImage, x, y, target.width, target.height);

  const skinImage = await loadImage(`${Config.RESOURCE_CDN_URL}${target.skinPath}`);
  ctx.drawImage(skinImage, 0, 0, outBox.width, outBox.height);
}
