import Config from 'apiResources/constants/Config';
import { loadImage } from 'apiResources/utils/loadImage';
import { compositeMultiplyFromCanvas } from 'apiResources/utils/compositeMultiplyFromCanvas';
import { paperFull } from 'apiResources/utils/imageAlign';

export const metalBrush = async (colorCode:string, thumbnailCanvas:any) =>{
    const metalBrushColorPath = `${Config.RESOURCE_CDN_URL}/Texture/${colorCode}.png`;
    const metalImage = await loadImage(metalBrushColorPath);
    thumbnailCanvas = compositeMultiplyFromCanvas(thumbnailCanvas, metalImage);
  return thumbnailCanvas
}

export const paperImageComposite = async (paperImagePath:string, thumbnailCanvas:any, width:number, height:number) =>{
    const effectImage = await loadImage(paperImagePath);
    const fullSize = paperFull(effectImage.width, effectImage.height, width, height, 0);
    const thumbnailCanvasCtx = thumbnailCanvas.getContext('2d');
    thumbnailCanvasCtx.drawImage(effectImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
}
