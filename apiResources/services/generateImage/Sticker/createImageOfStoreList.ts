import { imageFull, paperFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { OroundCV } from 'apiResources/utils/OroundCV';
import { getStickerCutLineSize } from 'apiResources/utils/getStickerSize';
import {
  getArtworkImage,
  getCreateImageInitInfo,
  getSelectedScene,
} from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage';
import { TYPE } from 'apiResources/constants/type';
import { API_URL } from 'apiResources/constants/apiURL';
import CommonCode from 'apiResources/constants/CommonCode';
import Config from 'apiResources/constants/Config';

export const createImageOfStoreList = async (props:{templateImage: any, productEditInfo:any, optionInfo:any, canvas: any, target:string, paperImage?:any}) => {
  const {templateImage, productEditInfo, optionInfo, canvas, target} = props;
  const width = productEditInfo.edit[0].width
  const height = productEditInfo.edit[0].height

  const {ctx, outBox} = getCreateImageInitInfo(target, canvas)
  const paperCode = optionInfo.paperCode;
  let paperImagePath = "";
  if(paperCode===CommonCode.PAPER_STICKER_GLOSSY ){
    paperImagePath = `${Config.RESOURCE_CDN_URL}/Texture/${paperCode}.png`;
  }
  if (target !== TargetType.STORE_DETAIL_4) {
    //target 1, 2, 3의 경우
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
    const cutLine = getStickerCutLineSize() * ratio;
    const contour = newCanvas(width, height);   // 칼선 캔버스
    const result = newCanvas(width, height);    // 최종 출력물 캔버스

    const oroundCV = new OroundCV();
    oroundCV.alphaBinarization(contour.canvas);
    oroundCV.dilation(contour.canvas, cutLine);
    oroundCV.findObjectContour(contour.canvas);
    oroundCV.contourPaintColor(contour.canvas);

    const shadowCanvas = oroundCV.drawShadow(contour.canvas, false, 0, 1, 3);

    result.ctx.drawImage(contour.canvas, 0, 0);
    result.ctx.drawImage(shadowCanvas, 0, 0);
    result.ctx.drawImage(templateImage, 0, 0);

    if (paperImagePath) {
      const paperImage = await loadImage(paperImagePath);
      const fullSize = paperFull(paperImage.width, paperImage.height, width, height, 0);
      result.ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
    }

    const size = imageFull(width, height, outBox.width, outBox.height, 0);
    ctx.drawImage(result.canvas, size.x, size.y, size.width, size.height);
  }else {
    //target 4의 경우
    const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo)
    const size = imageFull(artworkImageWidth, artworkImageHeight, outBox.width, outBox.height, 0);
    ctx.drawImage(artworkImage, size.x, size.y, size.width, size.height);
  }
}
