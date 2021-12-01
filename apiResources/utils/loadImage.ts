import Canvas from "canvas";
import { BadRequest, NotFound } from 'apiResources/utils/GeneralError';

export const loadImage = async (url: string): Promise<any> => {
  return await Canvas.loadImage(url).catch((err)=> {
    console.log(`DEBUG : URL : ${url}`);
    throw BadRequest('Not found resource image');
    // const dummyOroundImage = `https://cdn.oround.com/artwork/2021/11/25/21436/ED/26eRL3-20211125210905694.jpg`
    // return Canvas.loadImage(dummyOroundImage)
  });
}
