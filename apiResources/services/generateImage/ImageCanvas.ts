import {Canvas, createCanvas, Image} from "canvas";

import {ImageCanvasInterface} from "apiResources/interfaces/ImageCanvasInterface";

import {newCanvas} from "apiResources/utils/newCanvas";

class ImageCanvas implements ImageCanvasInterface {
  protected categoryCode: string;
  protected productCode: string;
  protected paperCode: string;
  protected backCode: string;
  protected target: string;
  protected ext: string;
  protected thumbnailImage: Canvas;
  protected productSizeInfo: any;
  protected canvas: Canvas;
  public contentType: string;
  protected optionInfo: any;
  protected productEditInfo: any;
  constructor() {
    this.categoryCode = '';
    this.productCode = '';
    this.paperCode = '';
    this.backCode = '';
    this.target = '';
    this.ext = '';
    this.contentType = '';
    this.thumbnailImage = createCanvas(10,10);
    this.productSizeInfo = [];
    this.canvas = createCanvas(10,10);
    this.optionInfo = '';
    this.productEditInfo = ''
  }

  init(props: { categoryCode: string, productCode: string, target: string, productEditInfo:any, optionInfo: any;  thumbnailImage: Canvas, productSizeInfo: any}) {
    const ext = props.optionInfo.ext;
    this.categoryCode = props.categoryCode;
    this.productCode = props.productCode;
    this.paperCode = props.optionInfo.paperCode;
    this.backCode = props.optionInfo.backCode;
    this.target = props.target;
    this.thumbnailImage = props.thumbnailImage;
    this.productSizeInfo = props.productSizeInfo;
    this.optionInfo = props.optionInfo;
    this.ext = ext;
    this.contentType = ext === 'jpg'? 'image/jpeg' : 'image/png';
    this.productEditInfo = props.productEditInfo
  }


  async composite(): Promise<void> {}

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

export default ImageCanvas
