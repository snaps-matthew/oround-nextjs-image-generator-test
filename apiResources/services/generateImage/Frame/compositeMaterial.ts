import CommonCode from "apiResources/constants/CommonCode";

import Config from "apiResources/constants/Config";

import {loadImage} from "apiResources/utils/loadImage";
import {canvasRoundRect} from "apiResources/utils/canvasRoundRect";
import {compositeMultiplyFromCanvas} from "apiResources/utils/compositeMultiplyFromCanvas";

// 매탈액자, 캔바스 액자의 경우 재질 이미지 합성
export const compositeMaterial = async (paperCode: string, originImage: any, frameColor: string) => {
  let ctx;

  switch (paperCode){
    case CommonCode.FRAME_METAL:
      if(frameColor === 'brush'){
        const metalImage = await loadImage(`${Config.RESOURCE_CDN_URL}/Frame/theme/frame/imgs/metal-texture.png`);
        originImage = compositeMultiplyFromCanvas(originImage, metalImage);

      } else {
        originImage = await drawReflectedLight(originImage);
      }
      // 매탈의 경우 제질 처리도 하면서 모서리도 라운드 처리한다.
      ctx = originImage.getContext('2d');
      const rect = canvasRoundRect(originImage.width, originImage.height, 8);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-atop';
      ctx.drawImage(rect, 0, 0 );
      ctx.restore();
      return originImage

    case CommonCode.FRAME_CANVAS:
      const canvasImage = await loadImage(`${Config.RESOURCE_CDN_URL}/Frame/theme/frame/imgs/canvas-pattern-embossing-50.png`);
      ctx = originImage.getContext('2d');
      ctx.fillStyle = ctx.createPattern(canvasImage, 'repeat');
      ctx.fillRect(0, 0, originImage.width, originImage.height);
      return originImage

    case CommonCode.FRAME_BIRCH:
    case CommonCode.FRAME_ACRYLIC:
      return await drawReflectedLight(originImage);

    default:
      return originImage;
  }
}


const drawReflectedLight = async (originImage: any) => {
  const reflectedListImage = await loadImage(`${Config.RESOURCE_CDN_URL}/Frame/theme/frame/imgs/frame_effect.png`);
  const ctx = originImage.getContext('2d');
  ctx.drawImage(reflectedListImage, 0, 0, originImage.width, originImage.height);
  return originImage;
}
