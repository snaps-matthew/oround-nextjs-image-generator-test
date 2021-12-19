import Canvas from "canvas";
import { BadRequest, NotFound } from 'apiResources/utils/GeneralError';
import { imageFull } from 'apiResources/utils/imageAlign';
import { newCanvas } from 'apiResources/utils/newCanvas';
import Config from 'apiResources/constants/Config';

export const loadImage = async (url: string): Promise<any> => {
  return await Canvas.loadImage(url).catch((err)=> {
    console.log(`-=-loadImage error-=- : ${url}`);
  });
}

export const loadErrorImage = async (errorMessage:string): Promise<any> => {
  console.log('-=-loadErrorImage-=-',errorMessage)
  const outBox = {width: 1000, height: 1000};
  const tmpCanvas = newCanvas(outBox.width, outBox.height);
  tmpCanvas.ctx.fillStyle = '#f1f1f1';
  tmpCanvas.ctx.fillRect(0, 0, outBox.width, outBox.height);
  const errorImagePath = `${Config.ERROR_IMAGE_URL}`;
  const errorImage  = await loadImage(errorImagePath)
  const size = imageFull(errorImage.width, errorImage.height, outBox.width, outBox.height, 0);
  tmpCanvas.ctx.drawImage(errorImage, size.x, size.y, size.width, size.height);
  return tmpCanvas.canvas
  }
