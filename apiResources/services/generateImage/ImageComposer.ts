import {imageTextSaver} from "apiResources/utils/imageTextSaver";
import { Canvas, createCanvas, Image } from 'canvas';
import { createRequire } from 'module';
import {getPSDData, imageConverter} from "../../utils/artworkImageCreator";
import fs from "fs";
import productInfo from '../../constants/productInfo';
import { OptionCodes } from '../../constants/OptionCodes';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { ImageCanvasInterface } from '../../interfaces/ImageCanvasInterface';

// const coordinateData = require('../../constants/coordinateData.json')

// import coordinateData from '../../constants/'

class ImageComposer {
  protected categoryName: string;
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

  protected categoryCode: string;
  protected paperCode: string;
  protected backCode: string;
  protected ext: string;
  protected productSizeInfo: any;
  public contentType: string;
  protected productEditInfo: any;

  constructor() {
    this.target = '';
    this.productPath = '';
    this.productCode = '';
    this.colorCode = '';
    this.sizeCode = ''
    this.layerOrder = [];
    this.wrinkleMag = -20;
    this.categoryName = '';
    this.patternSrcCoords = [];
    this.patternDstCoords = [];
    this.canvas = createCanvas(10,10);

    this.categoryCode = '';
    this.paperCode = '';
    this.backCode = '';
    this.ext = '';
    this.contentType = '';
    this.thumbnailImage = createCanvas(10,10);
    this.productSizeInfo = [];
    this.optionInfo = '';
    this.productEditInfo = ''
  }

  async init(data:{
    thumbnailImage:any,
    categoryName: string,
    productCode: string,
    target: string,
    colorCode: string,
    sizeCode: string,
    productEditInfo: any,
    optionInfo: any,
    productPath: string,
    categoryCode: string,
    productSizeInfo: any
  }) {
    // 아트워크 이미지 base64 로 변환
    // await imageTextSaver(data.thumbnailImage.toDataURL(), 'pattern');
    this.categoryName = data.categoryName
    this.productPath = data.productPath
    this.productCode = data.productCode
    this.target = data.target
    this.artworkWidth = data.productEditInfo.edit[0].width;
    this.artworkHeight = data.productEditInfo.edit[0].height;
    this.layerOrder = []
    this.wrinkleMag = -20;
    this.patternSrcCoords = [0,0,this.artworkWidth,0,this.artworkWidth,this.artworkHeight,0,this.artworkHeight];
    // this.patternDstCoords = coordinateData[data.productCode][`${OptionCodes[data.sizeCode]}/${OptionCodes[data.colorCode]}`];
    const ext = data.optionInfo.ext;
    this.categoryCode = data.categoryCode;
    this.productCode = data.productCode;
    this.paperCode = data.optionInfo.paperCode;
    this.backCode = data.optionInfo.backCode;
    this.target = data.target;
    this.thumbnailImage = data.thumbnailImage;
    this.productSizeInfo = data.productSizeInfo;
    this.optionInfo = data.optionInfo;
    this.ext = ext;
    this.contentType = ext === 'jpg'? 'image/jpeg' : 'image/png';
    this.productEditInfo = data.productEditInfo
  }

  // async composite(): Promise<void> {}

  drawObject(source: Image | Canvas, target: Canvas, x: number, y: number, width: number, height: number, angle: number = 0, skew: number=0) {
    const ctx = target.getContext('2d');
    let halfWidth = 0, halfHeight = 0, realX = x, realY = y;

    ctx.save();
    if (angle !== 0) {
      halfWidth = width / 2;
      halfHeight = height / 2;
      ctx.translate(x + halfWidth, y + halfHeight);
      ctx.rotate(angle * Math.PI / 180);
      realX = 0;
      realY = 0;
    }
    if (skew) {
      ctx.transform(1, skew, 0, 1, 0, 0);
    }
    ctx.drawImage(source, realX - halfWidth, realY - halfHeight, width, height);
    ctx.restore();
  }

  stream(){
    if(this.ext === 'png'){
      return this.canvas.createPNGStream();

    } else {
      const width = this.canvas.width;
      const height = this.canvas.height;
      const tmp = newCanvas(width, height);
      tmp.ctx.fillStyle = '#ffffff';
      tmp.ctx.fillRect(0,0, width, height);
      tmp.ctx.drawImage(this.canvas, 0, 0);

      return tmp.canvas.createJPEGStream({
        quality: 1,
        progressive: true,
        chromaSubsampling: false,
      });
    }
  }

}

export default ImageComposer
