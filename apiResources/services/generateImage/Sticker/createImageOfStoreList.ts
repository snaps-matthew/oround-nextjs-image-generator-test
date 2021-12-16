import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import { getStickerCutLineSize } from 'apiResources/utils/getStickerSize';
import {
  getArtworkImage,
  getCreateImageInitInfo, getScale, getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import CommonCode from 'apiResources/constants/CommonCode';
import Config from 'apiResources/constants/Config';
import { calObjectPosition } from '../../../utils/calObjectPosition';
import sticker_theme from "apiResources/services/generateImage/Sticker/sticker_theme";
import { getSizeToTargetImage } from '../../../utils/getSizeToTargetImage';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any }) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, drawObject} = props;
  const groupDelimiterName = productEditInfo.groupDelimiterName
  const scale = getScale(groupDelimiterName)
  const scene = getSelectedScene(productEditInfo, optionInfo);
  const width = scene.width * scale;
  const height = scene.height * scale;
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const paperCode = optionInfo.paperCode;
  const sizeCode = optionInfo.sizeCode;
  const directionCode = productEditInfo.directionCode;

  let ratio = 0
  if(productEditInfo.size.length > 0){
    ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
    ratio = ratio * scale
  }else{
    //사이즈가 없는경우 더미이미지로 리턴
    const dummyOroundImage = await loadErrorImage("size empty")
    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(dummyOroundImage, size.x, size.y, size.width, size.height);
    return
  }
  const cutLine = getStickerCutLineSize() * ratio;
  const contour = newCanvas(width, height);   // 칼선 캔버스
  const result = newCanvas(width, height);    // 최종 출력물 캔버스
  contour.ctx.drawImage(templateImage, 0, 0);

  const oroundCV = new OroundCV();
  oroundCV.alphaBinarization(contour.canvas);
  oroundCV.dilation(contour.canvas, cutLine);
  oroundCV.findObjectContour(contour.canvas);
  oroundCV.contourPaintColor(contour.canvas);


  const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 2, '4d');

  result.ctx.drawImage(shadowCanvas, 0, 0);
  if(paperCode===CommonCode.PAPER_STICKER_TRANSPARENCY ){
    result.ctx.save()
    result.ctx.globalCompositeOperation = 'destination-out';
    result.ctx.drawImage(contour.canvas, 0, 0);
    result.ctx.restore();
  }
  result.ctx.drawImage(templateImage, 0, 0);

  if(paperCode===CommonCode.PAPER_STICKER_GLOSSY ){
    const paperImagePath = `${Config.RESOURCE_CDN_URL}/Texture/${paperCode}.png`;
    const paperImage = await loadImage(paperImagePath);
    const fullSize = paperFull(paperImage.width, paperImage.height, width, height, 0);
    result.ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
    result.ctx.save();
    result.ctx.globalCompositeOperation = 'destination-in';
    result.ctx.drawImage(contour.canvas, 0, 0);
    result.ctx.restore();
  }

  if (target === TargetType.STORE_DETAIL_2) {
    const themeImagePath = `${Config.RESOURCE_CDN_URL}/Sticker`;
    const themeListInfo:any = sticker_theme;
    let sizeName ="";
    if(sizeCode === "T00032" || sizeCode === "T00033"){
      sizeName ="S";
    }else if(sizeCode === "T00035" || sizeCode === "T00036"){
      sizeName ="L";
    }else if(sizeCode === "T00034"){
      sizeName ="M";
    }
    const themeInfo = themeListInfo[sizeName];
    const {
      sizeToTargetImageWidth,
      sizeToTargetImageHeight
    } = getSizeToTargetImage(themeInfo, directionCode, productEditInfo.size[0].horizontalSizeMm, productEditInfo.size[0].verticalSizeMm);

    for (const obj of themeInfo.object) {

      if (obj.type === "image") {
        const { x, y } = calObjectPosition(obj.position, obj.x, obj.y, sizeToTargetImageWidth, sizeToTargetImageHeight);
        ctx.save();
        ctx.shadowColor = obj.shadowColor;
        ctx.shadowBlur = obj.shadowBlur;
        ctx.shadowOffsetX = obj.shadowOffsetX;
        ctx.shadowOffsetY = obj.shadowOffsetY;

        const tmp = newCanvas(sizeToTargetImageWidth, sizeToTargetImageHeight);
        tmp.ctx.drawImage(result.canvas, 0, 0, sizeToTargetImageWidth, sizeToTargetImageHeight);
        // 입체감을 주기위해 라인 반사광을 넣는다.
        tmp.ctx.save()
        tmp.ctx.lineWidth = 1;
        tmp.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        tmp.ctx.lineWidth = 1;
        tmp.ctx.rect(1,1, width-2, height-2);
        tmp.ctx.stroke()
        tmp.ctx.restore()
        drawObject(result.canvas, canvas, x, y, sizeToTargetImageWidth, sizeToTargetImageHeight);
        ctx.restore();
      } else {
        const img = await loadImage(themeImagePath + obj.path);
        drawObject(img, canvas, obj.x, obj.y, img.width, img.height);
      }

    }

  }else if (target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3) {
    //target 1,  3의 경우
    ctx.shadowColor ='rgba(0,0,0,0.3)';
    ctx.shadowBlur = 2;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
