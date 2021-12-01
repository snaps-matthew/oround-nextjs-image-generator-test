import Config from "apiResources/constants/Config";
import ProductCode from "apiResources/constants/ProductCode";

import {resolve} from "path";

import {loadImage} from "apiResources/utils/loadImage";


export const createImageOfStoreDetail_1 = async (props:{productCode: string, loadedImages: any, canvas: any, drawObject: any}) => {
  let {productCode, loadedImages, canvas, drawObject} = props;
  loadedImages = loadedImages.reverse(); // 뒷장이 먼저 출력되도록 역순으로 재 배열

  const outBox = {width: 1000, height: 1000};
  let inBox = {
    [ProductCode.POLAROID_ORIGINAL]:{
      width: 267,
      height: 318,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/popup_polaroid_original_02@2x.png`,
      pos: [
        {x: 629, y: 373, angle: 40},
        {x: 588, y: 336, angle: 30},
        {x: 534, y: 302, angle: 20},
        {x: 455, y: 283, angle: 10},
        {x: 390, y: 272, angle: 5},
        {x: 320, y: 274, angle: -5},
        {x: 253, y: 282, angle: -10},
        {x: 191, y: 301, angle: -20},
        {x: 146, y: 335, angle: -30},
        {x: 104, y: 373, angle: -40}
      ]
    },
    [ProductCode.POLAROID_MINI]:{
      width: 211,
      height: 336,
      skinPath: `${Config.RESOURCE_CDN_URL}/Polaroid/imgs/popup_polaroid_mini_02@2x.png`,
      pos: [
        {x: 650, y: 362, angle: 40},
        {x: 614, y: 331, angle: 30},
        {x: 564, y: 306, angle: 20},
        {x: 488, y: 292, angle: 10},
        {x: 424, y: 281, angle: 5},
        {x: 355, y: 281, angle: -5},
        {x: 288, y: 288, angle: -10},
        {x: 226, y: 302, angle: -20},
        {x: 180, y: 330, angle: -30},
        {x: 139, y: 363, angle: -40}
      ]
    }
  };

  const target = inBox[productCode];
  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');

  const total =  target.pos.length;
  for(let i=0; i < total; i++){
    drawObject(loadedImages[i], canvas, target.pos[i].x, target.pos[i].y, target.width, target.height, target.pos[i].angle);
  }

  const skinImage = await loadImage(`${target.skinPath}`);
  ctx.drawImage(skinImage, 0, 0, outBox.width, outBox.height);
}
