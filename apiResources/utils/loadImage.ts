import Canvas from "canvas";
import {NotFound} from "apiResources/utils/GeneralError";

export const loadImage = async (url: string): Promise<any> => {
  return await Canvas.loadImage(url).catch(()=> {
    console.log(`DEBUG : URL : ${url}`);
    throw NotFound('Not found resource image');
  });
}
