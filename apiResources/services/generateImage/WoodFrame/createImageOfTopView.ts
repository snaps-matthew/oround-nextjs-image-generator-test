import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getPreviewMargin, getScale,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import { getFrameColorUrl } from 'apiResources/services/generateImage/WoodFrame/getFrameColorUrl';
import frameRectangleSkinInfo from 'apiResources/services/generateImage/WoodFrame/frameRectangleSkinInfo';
import { getFrameSkinPolygonSize } from 'apiResources/services/generateImage/WoodFrame/getFrameSkinPolygonSize';
import { OroundCV } from 'apiResources/utils/OroundCV';
import { drawFrame } from 'apiResources/services/generateImage/WoodFrame/drawFrame';
import { makeMatSkin } from 'apiResources/utils/makeMatSkin';

export const createImageOfTopView = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, drawObject} = props;
  const productCode = productEditInfo.productCode
  const directionCode = productEditInfo.directionCode
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const margin = getPreviewMargin(productCode);
  const frameSkinColor = getFrameColorUrl(productCode, optionInfo.colorCode);

  const groupDelimiterName = productEditInfo.groupDelimiterName
  const scale = getScale(groupDelimiterName)
  const width = productEditInfo.edit[0].width * scale
  const height = productEditInfo.edit[0].height * scale

  let ratio = 0
  if(productEditInfo.size.length > 0){
    ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
    // ratio=ratio*scale
  }else{
    //사이즈가 없는경우 더미이미지로 리턴
    const errorImageCanvas = await loadErrorImage("size empty")
    ctx.drawImage(errorImageCanvas, 0, 0);
    return
  }

  const padding = 2;           // 재단 2mm
  const margin2x = margin * 2;
  const frameSkin = frameRectangleSkinInfo[productCode];
  const {
    frameWidth,
    frameHeight,
    innerMargin,
    frameInfo,
    frameThick
  } = getFrameSkinPolygonSize(frameSkin.thick, frameSkin.dug, padding, ratio, width, height);
  const tmp = newCanvas(frameWidth, frameHeight);      // 최종 출력물 캔버스

  tmp.ctx.drawImage(templateImage, innerMargin, innerMargin);

  const matCanvas = makeMatSkin(productEditInfo, scale);
  tmp.ctx.drawImage(matCanvas, innerMargin, innerMargin);

  for (let item of frameInfo) {
    const skinImg = await loadImage(frameSkinColor[item.type]);
    drawFrame(tmp.ctx, skinImg, item);
  }
  const centerOffset = (width + margin2x - frameWidth) / 2;
  const result = newCanvas(width + margin2x, height + margin2x);
  result.ctx.drawImage(tmp.canvas, centerOffset, centerOffset);


  if(target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3) {
    const oroundCV = new OroundCV();
    const tempCanvas = oroundCV.drawShadow(result.canvas, false, 6, 2, 8, '73');
    const size = imageFull(tempCanvas.width, tempCanvas.height, outBox.width, outBox.height, 0);
    ctx.drawImage(tempCanvas, size.x, size.y, size.width, size.height);


  }else if(target === TargetType.STORE_DETAIL_4) {
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);

  }
}


