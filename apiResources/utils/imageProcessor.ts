import { createCanvas } from 'canvas';
import { imageTextSaver } from './imageTextSaver';

export const flipImage = async (srcImg:any, xCoord:number, yCoord:number, imgWidth:number, imgHeight:number, canvasWidth:number, canvasHeight:number) => {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.translate(2000,0);
  ctx.scale(-1,1);

  ctx.drawImage(srcImg, xCoord, yCoord, imgWidth, imgHeight);

  return canvas;
}

export const imageMasker = async (srcImg:any,
                                  maskImg:any,
                                  xCoord:number,
                                  yCoord:number,
                                  imgWidth:number,
                                  imgHeight:number,
                                  canvasHeight:number,
                                  canvasWidth:number) => {

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(srcImg, xCoord, yCoord, imgWidth, imgHeight);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.drawImage(maskImg, 0, 0, canvasWidth, canvasHeight);

  return canvas;
}

export const canvasLayerMerger = async (layers:any) => {
  const canvas = createCanvas(2000, 2000);
  const ctx = canvas.getContext('2d');
  for (let i=0; i < layers.length; i++) {
    ctx.drawImage(layers[i], 0,0);
    ctx.globalCompositeOperation = 'destination-over';
  }
  return canvas;
}
