import Config from "apiResources/constants/Config";
import Constants from "apiResources/constants/Constants";
import CommonCode from "apiResources/constants/CommonCode";

import {compositeFrame} from "apiResources/services/generateImage/Frame/compositeFrame";
import {compositeHangingFrame} from "apiResources/services/generateImage/Frame/compositeHangingFrame";
import {compositeMaterial} from "apiResources/services/generateImage/Frame/compositeMaterial";
import {getSizeToTargetImage} from "apiResources/services/generateImage/Frame/getSizeToTargetImage";
import {calObjectPosition} from "apiResources/services/generateImage/Frame/calObjectPosition";
import {compositeNinePatchInStoreDetail} from "apiResources/services/generateImage/Frame/compositeNinePatchInStoreDetail";
import frame_a from "apiResources/services/generateImage/Frame/theme/frame/frame_a/frame_a";
import frame_b from "apiResources/services/generateImage/Frame/theme/frame/frame_b/frame_b";
import frame_c from "apiResources/services/generateImage/Frame/theme/frame/frame_c/frame_c";
import frame_d from "apiResources/services/generateImage/Frame/theme/frame/frame_d/frame_d";
import {getRangeToFrameProduct} from "apiResources/services/getRangeToFrameProduct";

import {loadImage} from "apiResources/utils/loadImage";
import {newCanvas} from "apiResources/utils/newCanvas";
import {BadRequest, InvalidRequest} from "apiResources/utils/GeneralError";

export const createImageOfStoreDetail_0 = async (props:{
  productCode: string, paperCode: string, productSize: any, originImage: any, frameColor: string,
  canvas: any, purpose: string, theme: string, drawObject: any}
) => {

  let {
    productCode, paperCode, productSize, originImage, frameColor, canvas,
    drawObject, purpose, theme
  } = props;

  const themeList = {
    frame_a,
    frame_b,
    frame_c,
    frame_d
  };

  // @ts-ignore
  const themeListInfo = themeList[theme];
  if(!themeListInfo){
    throw InvalidRequest(theme);
  }
  // @ts-ignore
  if(!themeListInfo[purpose]){
    throw InvalidRequest(purpose);
  }

  const sizeDivision = getRangeToFrameProduct(productCode, productSize);
  const themeInfo = themeListInfo[purpose][sizeDivision];
  if (!themeInfo) throw BadRequest("not found theme");

  originImage = await compositeFrame(paperCode, productSize, originImage, frameColor);
  originImage = await compositeMaterial(paperCode, originImage, frameColor);
  originImage = await compositeHangingFrame(productCode, paperCode, originImage, frameColor);

  const {width, height} = getSizeToTargetImage(themeInfo, productSize, originImage, paperCode);

  canvas.width = themeInfo.width;
  canvas.height = themeInfo.height;
  const ctx = canvas.getContext('2d');

  for (const obj of themeInfo.object) {
    if (obj.type === Constants.IMAGE) {
      const {x, y} = calObjectPosition(obj.position, obj.x, obj.y, width, height);
      ctx.save();
      ctx.shadowColor = obj.shadowColor;
      ctx.shadowBlur = obj.shadowBlur;
      ctx.shadowOffsetX = obj.shadowOffsetX;
      ctx.shadowOffsetY = obj.shadowOffsetY;

      const tmp = newCanvas(width, height);
      tmp.ctx.drawImage(originImage, 0, 0, width, height);

      // 입체감을 주기위해 라인 반사광을 넣는다.
      if(paperCode !== CommonCode.FRAME_WOOD &&
        paperCode !== CommonCode.FRAME_ALUMINIUM &&
        paperCode != CommonCode.FRAME_HANGING){
        tmp.ctx.save()
        tmp.ctx.lineWidth = 1;
        tmp.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        tmp.ctx.lineWidth = 1;
        tmp.ctx.rect(1,1, width-2, height-2);
        tmp.ctx.stroke()
        tmp.ctx.restore()
      }

      originImage = await compositeNinePatchInStoreDetail(paperCode, tmp.canvas);
      drawObject(originImage, canvas, x, y, width, height);
      ctx.restore();

    } else if (obj.type === Constants.SHADOW) {
      if(obj.paperCode && obj.paperCode !== paperCode) continue
      const img = await loadImage(`${Config.RESOURCE_CDN_URL}${obj.path}`)
      const shadowWidth = height * img.width / img.height;
      const {x, y} = calObjectPosition(obj.position, obj.x, obj.y, shadowWidth, height);
      drawObject(img, canvas, x, y, shadowWidth, height);

    } else {
      const img = await loadImage(`${Config.RESOURCE_CDN_URL}${obj.path}`);
      drawObject(img, canvas, obj.x, obj.y, img.width, img.height);
    }
  }
}
