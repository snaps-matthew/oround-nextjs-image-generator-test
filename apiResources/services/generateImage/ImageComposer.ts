import {imageTextSaver} from "../../utils/imageTextSaver";
import { Canvas, createCanvas, Image } from 'canvas';
import { createRequire } from 'module';
import {getPSDData, imageConverter} from "../../utils/artworkImageCreator";
import fs from "fs";
import productInfo from '../../constants/productInfo';
import { OptionCodes } from '../../constants/OptionCodes';

const coordinateData = require('../../constants/coordinateData.json')

// import coordinateData from '../../constants/'

class ImageComposer {
  protected categoryName: string;
  protected productOption: string;
  protected productCode: string;
  protected productPath: string;
  protected patternSrcCoords: number[];
  protected patternDstCoords: number[];
  protected optionInfo: any;
  protected colorCode: string;
  protected layerOrder: string[];
  protected wrinkleMag: number;
  protected artworkWidth: any;
  protected artworkHeight: any;
  protected target: string;
  protected thumbnailImage: any;
  protected canvas: Canvas;
  protected sizeCode: string;

  constructor() {
    this.target = '';
    this.productPath = '';
    this.productCode = '';
    this.productOption = '';
    this.colorCode = '';
    this.sizeCode = ''
    this.layerOrder = [];
    this.wrinkleMag = -20;
    this.categoryName = '';
    this.patternSrcCoords = [];
    this.patternDstCoords = [];
    this.canvas = createCanvas(10,10);
  }

  async init(data:{
    thumbnailImage:any,
    categoryName: string,
    productCode: string,
    target: string,
    colorCode: string,
    sizeCode: string,
    productOption: any,
    optionInfo: any,
    productPath: string, }) {

    // 아트워크 이미지 base64 로 변환
    await imageTextSaver(data.thumbnailImage.toDataURL(), 'pattern');
    this.productOption = data.productOption
    this.categoryName = data.categoryName
    this.productPath = data.productPath
    this.productCode = data.productCode
    this.target = data.target
    this.artworkWidth = data.productOption.edit[0].width;
    this.artworkHeight = data.productOption.edit[0].height;
    this.layerOrder = []
    this.wrinkleMag = -20;
    this.patternSrcCoords = [0,0,this.artworkWidth,0,this.artworkWidth,this.artworkHeight,0,this.artworkHeight];
    this.patternDstCoords = coordinateData[data.productCode][`${OptionCodes[data.sizeCode]}/${OptionCodes[data.colorCode]}`];
  }

}

export default ImageComposer
