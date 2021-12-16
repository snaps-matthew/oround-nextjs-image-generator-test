import ImageComposer from "apiResources/services/generateImage/ImageComposer";
import { createImageOfTopView } from 'apiResources/services/generateImage/Note/createImageOfTopView';

class Note extends ImageComposer {
  constructor() {
    super();
  }

  async composite() {
    const { canvas, productEditInfo, optionInfo, target } = this;
    let templateImage = this.thumbnailImage
    await createImageOfTopView({ templateImage, productEditInfo, optionInfo, canvas, target });
  }
}

export default Note;
