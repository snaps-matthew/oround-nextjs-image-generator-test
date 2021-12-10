import Config from 'apiResources/constants/Config';
import { OroundCV } from 'apiResources/utils/OroundCV';
import { newCanvas } from 'apiResources/utils/newCanvas';
import TargetType from 'apiResources/constants/TargetType';
import CommonCode from 'apiResources/constants/CommonCode';
import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import {
  getKeyringCutLineSize,
  getKeyringHoleSize,
} from 'apiResources/utils/getKeyringSize';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';


export const createImageOfStoreList = async (props:{thumbnailImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string}) => {
  const {thumbnailImage, productEditInfo, optionInfo, canvas, target} = props;
  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)

  const acrylicCode = optionInfo.acrylicCode;
  const glitterColorCode = optionInfo.glitterColorCode;

  let paperImagePath = "";
  if(acrylicCode===CommonCode.PAPER_ACRYLIC_GLITTER ){
    paperImagePath = `${Config.RESOURCE_CDN_URL}/Texture/${glitterColorCode}.png`;
  }else if(acrylicCode===CommonCode.PAPER_ACRYLIC_HOLOGRAM){
    paperImagePath = `${Config.RESOURCE_CDN_URL}/Texture/${acrylicCode}.png`;
  }
  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
    let scene:any = getSelectedScene(productEditInfo);
    const width = scene.width
    const height = scene.height
    let ratio = 0
    if(productEditInfo.size.length > 0){
      ratio = productEditInfo.size[0].horizontalSizePx / productEditInfo.size[0].horizontalSizeMm;
    }else{
      //사이즈가 없는경우 더미이미지로 리턴
      const dummyOroundImage = await loadErrorImage("size empty")
      const size = imageFull(width, height, outBox.width, outBox.height, 0);
      ctx.drawImage(dummyOroundImage, size.x, size.y, size.width, size.height);
      return
    }
    const cutLine = getKeyringCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스

    const holeObject = scene.object.find((obj: { type: string; }) => obj.type === 'hole');
    const holeX = holeObject.x;
    const holeY = holeObject.y;
    contour.ctx.drawImage(thumbnailImage, 0, 0);

    const oroundCV = new OroundCV();
    oroundCV.alphaBinarization(contour.canvas);
    oroundCV.dilation(contour.canvas, cutLine);
    oroundCV.findObjectContour(contour.canvas);
    oroundCV.contourPaintColor(contour.canvas);

    const holeSize = getKeyringHoleSize() * ratio;
    const keyOutlineRadius = (holeSize + cutLine + cutLine) / 2;
    const keyOutline = oroundCV.drawCircle(keyOutlineRadius, 255, 255, 255);
    contour.ctx.drawImage(keyOutline, holeX - cutLine, holeY - cutLine);

    if (paperImagePath) {
      const paperImage = await loadImage(paperImagePath);
      const fullSize = paperFull(paperImage.width, paperImage.height, width, height, 0);
      result.ctx.save();
      result.ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
      result.ctx.globalCompositeOperation = 'destination-in';
      result.ctx.drawImage(contour.canvas, 0, 0);
      result.ctx.restore();
    } else {
     result.ctx.drawImage(contour.canvas, 0, 0);
    }

    const shadowCanvas = oroundCV.drawShadow(result.canvas, false, 0, 1, 3);
    result.ctx.drawImage(shadowCanvas, 0, 0);
    result.ctx.drawImage(thumbnailImage, 0, 0);

    const keyInlineRadius = holeSize / 2;
    const keyInlineCanvas = oroundCV.drawCircle(keyInlineRadius, 242, 244, 247);
    const inShadow = oroundCV.drawShadow(keyInlineCanvas, true, 0, 0, 3);
    result.ctx.drawImage(inShadow, holeX - cutLine + cutLine, holeY - cutLine + cutLine);

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);

  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
