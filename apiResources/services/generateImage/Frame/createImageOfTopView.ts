import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getPreviewMargin, getScale,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import { removeCuttingLine } from 'apiResources/services/removeCuttingLine';
import { isCanvasFrame } from 'apiResources/matchProd/isCanvasFrame';
import Config from 'apiResources/constants/Config';
import { getFrameNinePathUrl } from 'apiResources/api/getFrameNinePathUrl';
import {
  metalBrush, paperImageComposite,
} from 'apiResources/services/generateImage/Frame/framePaperEffect';
import CommonCode from 'apiResources/constants/CommonCode';

export const createImageOfTopView = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, drawObject:any}) => {
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
    const dummyOroundImage = await loadErrorImage("size empty")
    ctx.drawImage(dummyOroundImage, 0,0);
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

  if(target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3) {
    const frameWidth = thumbnailCanvas.width + (offset * 2);
    const frameHeight = thumbnailCanvas.height + (offset * 2);
    const tmp = newCanvas(frameWidth, frameHeight);
    tmp.ctx.drawImage(thumbnailCanvas, offset, offset);

    const pattern = newCanvas(10, 10);    // 초기화
    const ninePatchInfo:any = getFrameNinePathUrl(productCode);
    const imagePosition = [
      [ninePatchInfo.top_left, 0, 0, sumOffset, sumOffset],
      [ninePatchInfo.top_center, sumOffset, 0, frameWidth - (sumOffset * 2), sumOffset],
      [ninePatchInfo.top_right, frameWidth - sumOffset, 0, sumOffset, sumOffset],
      [ninePatchInfo.middle_left, 0, sumOffset, sumOffset, frameHeight - (sumOffset * 2)],
      [ninePatchInfo.middle_right, frameWidth - sumOffset, sumOffset, sumOffset, frameHeight - (sumOffset * 2)],
      [ninePatchInfo.bottom_left, 0, frameHeight - sumOffset, sumOffset, sumOffset],
      [ninePatchInfo.bottom_center, sumOffset, frameHeight - sumOffset, frameWidth - (sumOffset * 2), sumOffset],
      [ninePatchInfo.bottom_right, frameWidth - sumOffset, frameHeight - sumOffset, sumOffset, sumOffset]
    ];

    for (let item of imagePosition) {
      const img = await loadImage(item[0]);
      pattern.canvas.width = item[3];
      pattern.canvas.height = item[4];

      pattern.ctx.fillStyle = pattern.ctx.createPattern(img, 'repeat') as CanvasPattern;
      pattern.ctx.fillRect(0, 0, item[3], item[4]);
      tmp.ctx.drawImage(pattern.canvas, item[1], item[2], item[3], item[4]);
    }

    const centerOffset = (width + margin2x - frameWidth) / 2
    const result = newCanvas(width + margin2x, height + margin2x);
    result.ctx.drawImage(tmp.canvas, centerOffset, centerOffset);

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else if (target === TargetType.STORE_DETAIL_4) {
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);

  }
}
