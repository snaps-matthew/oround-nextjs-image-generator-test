import ImageComposer from "../ImageComposer";
import {ExecException} from "child_process";
import {getArtworkReszied, getImageWrinkled} from "../../../utils/artworkImageCreator";
import {imageTextSaver} from "../../../utils/imageTextSaver";
const { exec } = require('child_process');

class Apparel extends ImageComposer {
  constructor() {
    super();
  }

  async compositeArtwork() {

    const { categoryCode, productCode, patternSrcCoords, patternDstCoords, productPath } = this;

    // 아트워크 리사이징
    await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryCode);

    // 주름 및 그림자 생성하기
    // await getImageWrinkled(productPath, productCode);
    //
    // return new Promise((resolve, reject) => {
    //   exec(`composite 'inline:src/resources/patternImage.txt' '${productPath}/${productCode}.png' PNG:- | base64`, { maxBuffer: 5000 * 5000 }, (err:ExecException, stdout:string) => {
    //     if (err) console.error(err);
    //
    //     imageTextSaver(stdout, 'final');
    //
    //     resolve(stdout);
    //   })
    // })
  }
}

export default Apparel;
