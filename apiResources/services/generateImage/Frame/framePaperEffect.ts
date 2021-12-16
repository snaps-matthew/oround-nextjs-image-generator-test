import CommonCode from 'apiResources/constants/CommonCode';
import Config from 'apiResources/constants/Config';
import { loadImage } from 'apiResources/utils/loadImage';
import { compositeMultiplyFromCanvas } from 'apiResources/utils/compositeMultiplyFromCanvas';
import { paperFull } from 'apiResources/utils/imageAlign';

export const metalBrush = async (colorCode:string, thumbnailCanvas:any) =>{
  if(colorCode === CommonCode.COLOR_METAL_BRUSH){
    const metalBrushColorPath = `${Config.RESOURCE_CDN_URL}/Texture/${colorCode}.png`;
    const metalImage = await loadImage(metalBrushColorPath);
    thumbnailCanvas = compositeMultiplyFromCanvas(thumbnailCanvas, metalImage);
  }
  return thumbnailCanvas
}

export const largePrintGlossy = async (glossyCode:string, thumbnailCanvas:any, width:number, height:number) =>{
  if (glossyCode===CommonCode.EFFECT_LARGE_PRINT_GLOSSY) {
    const glossyPath = `${Config.RESOURCE_CDN_URL}/Texture/${glossyCode}.png`;
    const effectImage = await loadImage(glossyPath);
    const fullSize = paperFull(effectImage.width, effectImage.height, width, height, 0);
    const thumbnailCanvasCtx = thumbnailCanvas.getContext('2d');
    thumbnailCanvasCtx.drawImage(effectImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height);
  }
}
