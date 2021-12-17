import CommonCode from 'apiResources/constants/CommonCode';
import Config from 'apiResources/constants/Config';
import { loadImage } from 'apiResources/utils/loadImage';
import { paperFull } from 'apiResources/utils/imageAlign';
import { OroundCV } from 'apiResources/utils/OroundCV';


export const stickerPaperEffect = async (paperCode:string, cutLine:number, templateImage:any, contour:any, result:any, width:number, height:number) =>{

  const oroundCV = new OroundCV();
  oroundCV.alphaBinarization(contour.canvas);
  oroundCV.dilation(contour.canvas, cutLine);
  oroundCV.findObjectContour(contour.canvas);
  oroundCV.contourPaintColor(contour.canvas);


  const shadowCanvas = oroundCV.drawShadowColor(contour.canvas, false, 0, 0, 6, "#00000080");
  result.ctx.drawImage(shadowCanvas, 0, 0);

  // 합성이 순서대로 진행되야함 S
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
  // 합성이 순서대로 진행되야함 E
}
