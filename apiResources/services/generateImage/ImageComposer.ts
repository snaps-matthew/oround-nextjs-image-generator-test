import {imageTextSaver} from "../../utils/imageTextSaver";
import {Image} from "canvas";
import { createRequire } from 'module';
import {getPSDData, imageConverter} from "../../utils/artworkImageCreator";
import fs from "fs";
const coordinateData = require('./coordinateData.json');

class ImageComposer {
  protected categoryCode: string;
  protected productCode: string;
  protected productType: string;
  protected productOption: string;
  protected psdPath: string;
  protected productPath: string;
  protected patternPath: string;
  protected patternSrcCoords: number[];
  protected patternDstCoords: number[];
  protected colorCodes: string[];
  protected layerOrder: string[];
  protected wrinkleMag: number;
  protected artworkSize: number[];

  constructor() {
    this.categoryCode = '';
    this.psdPath = '';
    this.productPath = '';
    this.productType = '';
    this.productCode = '';
    this.productOption = '';
    this.patternPath = '';
    this.colorCodes = [];
    this.layerOrder = [];
    this.wrinkleMag = -20;
    this.artworkSize = [];
    this.patternSrcCoords = []
    this.patternDstCoords = []
  }

  async init(data:{categoryCode: string, paperCode: string, backCode: string, target: string, optionAndFileExt: string; imageData:string, productSizeInfo: object, productType: string, productCode: string, productOption: string, psdPath: string, productPath: string, patternPath: string, patternSrcCoords: number[], patternDstCoords: number[], colorCodes: string[], layerOrder: string[], artworkSize: number[]}) {

    // 아트워크 이미지 base64 로 변환
    // await imageTextSaver(data.imageData, 'pattern');
    const newImage = await imageConverter(data.patternPath);

    await imageTextSaver(newImage, 'pattern');

    this.categoryCode = data.categoryCode;
    this.artworkSize = data.artworkSize;
    this.psdPath = data.psdPath
    this.productPath = data.productPath
    this.productType = data.productType
    this.productCode = data.productCode
    this.productOption = data.productOption
    this.patternPath = data.patternPath
    this.colorCodes = data.colorCodes
    this.layerOrder = data.layerOrder
    this.wrinkleMag = -20;
    this.patternSrcCoords = [0,0,data.artworkSize[0],0,data.artworkSize[0],data.artworkSize[1],0,data.artworkSize[1]];
    this.patternDstCoords = coordinateData[data.productCode][this.productOption];
    // this.patternDstCoords = await getPSDData(this.psdPath, data.categoryCode, 'src/services/generateImage/coordinateData.json', this.productCode, this.productOption);
  }

}

export default ImageComposer
