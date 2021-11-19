import Config from "apiResources/constants/Config";

import {loadImage} from "apiResources/utils/loadImage";
import {BadRequest} from "apiResources/utils/GeneralError";

export const loadImages = async (imagePathList: any) => {
  const loadedImages = [];

  for(let path of imagePathList){
    const templateImagPath = `${Config.apiDomain}${path}`;
    const templateImage = await loadImage(templateImagPath)
      .catch(() => {
        throw BadRequest("not found template image");
      });
    loadedImages.push(templateImage);
  }

  return loadedImages;
}
