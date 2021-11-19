import ImageComposer from "../ImageComposer";
import {ExecException} from "child_process";
import {getArtworkReszied, getImageWrinkled, imageDstOut} from "../../../utils/artworkImageCreator";
import {imageTextSaver} from "../../../utils/imageTextSaver";
const { exec } = require('child_process');

class SmartTok extends ImageComposer {
  constructor() {
    super();
  }

  async compositeArtwork() {
    const { categoryCode, productCode, patternSrcCoords, patternDstCoords, productPath } = this;
    console.log(categoryCode, productCode, patternSrcCoords, patternDstCoords, productPath)
    // 아트워크 리사이징
    await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryCode);

    // 마스킹으로 잘라내기
    console.log(`마스킹하기 ${productPath}/${productCode}_mask.png`)
    await imageDstOut(`${productPath}/${productCode}_mask.png`)

    return new Promise((resolve, reject) => {
      exec(`composite 'inline:src/resources/patternImage.txt' '${productPath}/${productCode}.png' PNG:- | base64`, { maxBuffer: 2000 * 2000 }, (err:ExecException, stdout:string) => {
        // exec(`composite 'inline:src/resources/patternImage.txt' '${productPath}' PNG:- | base64`, { maxBuffer: 2000 * 2000 }, (err:ExecException, stdout:string) => {
        if (err) console.error(err);

        imageTextSaver(stdout, 'final');

        resolve(stdout);
      })
    })
  }
}

export default SmartTok;
