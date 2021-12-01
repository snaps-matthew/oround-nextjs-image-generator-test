import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getPreviewMargin,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { isWoodFrame } from 'apiResources/matchProd/isWoodFrame';
import { loadImage } from 'apiResources/utils/loadImage';
import { getFrameNinePathUrl } from 'apiResources/api/getFrameNinePathUrl';
import { removeCuttingLine } from 'apiResources/services/removeCuttingLine';
import { isCanvasFrame } from 'apiResources/matchProd/isCanvasFrame';
import { isAluminiumFrame } from 'apiResources/matchProd/isAluminiumFrame';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, paperImage?:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target, paperImage} = props;
  const scene = getSelectedScene(productEditInfo, optionInfo)
  const width = scene.width
  const height = scene.height
  const productCode = productEditInfo.productCode
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
  const margin = getPreviewMargin(productCode);

  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    const isCanvas  = isCanvasFrame(productCode);
    const ninePatchInfo = getFrameNinePathUrl(productCode);
    const padding = isCanvas? 30: 2;       // 재단 30mm
    const paddingPx = padding * ratio;
    const margin2x = margin * 2;
    const offset = isCanvas? 30: 22;        // 스킨 이미지가 60px 크기로 밖으로 30px (이사이즈 만큼 밖으로 나가야한다.)
    const offset2 = isCanvas? 30: 28;       // 스킨 이미지가 60px 크기로 안으로 30px
    const sumOffset = offset + offset2;
    const thumbnailCanvas = removeCuttingLine(templateImage, paddingPx);

    const frameWidth = thumbnailCanvas.width + (offset * 2);
    const frameHeight = thumbnailCanvas.height + (offset * 2);
    const tmp = newCanvas(frameWidth, frameHeight);
    tmp.ctx.drawImage(thumbnailCanvas, offset, offset);

    const pattern = newCanvas(10, 10);    // 초기화

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

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
