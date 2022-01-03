import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getCreateImageInitInfo,
  getPreviewMargin, getScale,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import { removeCuttingLine } from 'apiResources/services/removeCuttingLine';
import { isCanvasFrame } from 'apiResources/matchProd/isCanvasFrame';
import Config from 'apiResources/constants/Config';
import frame_theme from "apiResources/services/generateImage/Frame/frame_theme";
import { getSizeToTargetImage } from 'apiResources/utils/getSizeToTargetImage';
import { calObjectPosition } from 'apiResources/utils/calObjectPosition';
import {
  metalBrush, paperImageComposite,
} from 'apiResources/services/generateImage/Frame/framePaperEffect';
import CommonCode from 'apiResources/constants/CommonCode';

export const createImageOfInteriorView = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, drawObject} = props;
  const scene = getSelectedScene(productEditInfo, optionInfo)
  const groupDelimiterName = productEditInfo.groupDelimiterName
  const scale = getScale(groupDelimiterName)
  const width = scene.width * scale
  const height = scene.height * scale
  const productCode = productEditInfo.productCode
  const directionCode = productEditInfo.directionCode
  const colorCode = optionInfo.colorCode
  const glossyCode = optionInfo.glossyCode
  const themeImagePath = `${Config.RESOURCE_CDN_URL}/Frame/theme/frame`;
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  let ratio = 0
  if(productEditInfo.size.length > 0){
    ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
    // ratio = ratio * scale
  }else{
    //사이즈가 없는경우 더미이미지로 리턴
    const errorImageCanvas = await loadErrorImage("size empty")
    ctx.drawImage(errorImageCanvas, 0, 0);
    return
  }
  const margin = getPreviewMargin(productCode);
  const isCanvas  = isCanvasFrame(productCode);
  const padding = isCanvas? 30: 2;       // 재단 30mm
  const paddingPx = padding * ratio;
  const margin2x = margin * 2;
  const offset = isCanvas? 30: 22;        // 스킨 이미지가 60px 크기로 밖으로 30px (이사이즈 만큼 밖으로 나가야한다.)
  const offset2 = isCanvas? 30: 28;       // 스킨 이미지가 60px 크기로 안으로 30px
  const sumOffset = offset + offset2;

  let thumbnailCanvas:any = removeCuttingLine(templateImage, paddingPx);

  if(colorCode === CommonCode.COLOR_METAL_BRUSH){
    thumbnailCanvas = await metalBrush(colorCode, thumbnailCanvas)
  }else if (glossyCode===CommonCode.EFFECT_LARGE_PRINT_GLOSSY) {
    const glossyPath = `${Config.RESOURCE_CDN_URL}/Texture/${glossyCode}.png`;
    await paperImageComposite(glossyPath, thumbnailCanvas, width, height)
  }else if(isCanvasFrame(productCode)){
    const canvasEmbossingPath = `${Config.RESOURCE_CDN_URL}/Texture/canvas_pattern_embossing@2x.png`;
    await paperImageComposite(canvasEmbossingPath, thumbnailCanvas, width, height)
  }

  const themeListInfo:any = frame_theme;
  const themeInfo = themeListInfo[productCode];
  const {
    sizeToTargetImageWidth,
    sizeToTargetImageHeight
  } = getSizeToTargetImage(themeInfo, directionCode, productEditInfo.size[0].horizontalSizeMm, productEditInfo.size[0].verticalSizeMm);

  canvas.width = themeInfo.width;
  canvas.height = themeInfo.height;

  for (const obj of themeInfo.object) {

    if (obj.type === "image") {
      const { x, y } = calObjectPosition(obj.position, obj.x, obj.y, sizeToTargetImageWidth, sizeToTargetImageHeight);
      ctx.save();
      ctx.shadowColor = obj.shadowColor;
      ctx.shadowBlur = obj.shadowBlur;
      ctx.shadowOffsetX = obj.shadowOffsetX;
      ctx.shadowOffsetY = obj.shadowOffsetY;

      const tmp = newCanvas(sizeToTargetImageWidth, sizeToTargetImageHeight);
      tmp.ctx.drawImage(thumbnailCanvas, 0, 0, sizeToTargetImageWidth, sizeToTargetImageHeight);
      // 입체감을 주기위해 라인 반사광을 넣는다.
      tmp.ctx.save()
      tmp.ctx.lineWidth = 1;
      tmp.ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      tmp.ctx.lineWidth = 1;
      tmp.ctx.rect(1,1, width-2, height-2);
      tmp.ctx.stroke()
      tmp.ctx.restore()
      drawObject(thumbnailCanvas, canvas, x, y, sizeToTargetImageWidth, sizeToTargetImageHeight);
      ctx.restore();
    } else if (obj.type === "shadow") {
      const img = await loadImage(themeImagePath + obj.path);
      // const shadowWidth = height * img.width / img.height;
      // const {x, y} = calObjectPosition(obj.position, obj.x, obj.y, shadowWidth, height);
      // drawObject(img, canvas, x, y, shadowWidth, height);
      drawObject(img, canvas, obj.x, obj.y, img.width, img.height);
    } else {
      const img = await loadImage(themeImagePath + obj.path);
      drawObject(img, canvas, obj.x, obj.y, img.width, img.height);
    }
  }
}
