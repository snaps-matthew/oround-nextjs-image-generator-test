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
import { stickerPaperEffect } from './stickerPaperEffect';

export const createImageOfTopView = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any }) => {
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
    const errorImageCanvas = await loadErrorImage("size empty")
    ctx.drawImage(errorImageCanvas, 0, 0);
    return
  }
  const cutLine = getStickerCutLineSize() * ratio;
  const contour = newCanvas(width, height);   // 칼선 캔버스
  const result = newCanvas(width, height);    // 최종 출력물 캔버스
  contour.ctx.drawImage(templateImage, 0, 0);

  await stickerPaperEffect(paperCode, cutLine, templateImage, contour, result, width, height);

  if (target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3) {
    //target 1,  3의 경우
    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
