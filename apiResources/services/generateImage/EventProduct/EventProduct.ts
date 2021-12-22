import Config from 'apiResources/constants/Config';
import TargetType from 'apiResources/constants/TargetType';
import { Canvas, createCanvas } from 'canvas';
import { loadImage } from 'apiResources/utils/loadImage';
import { newCanvas } from 'apiResources/utils/newCanvas';

class EventProduct {
  protected productResourcePath: string;
  protected canvas: Canvas;
  protected target: string;
  protected ext: string;

  constructor() {
    this.productResourcePath = '';
    this.target = '';
    this.ext = '';
    this.canvas = createCanvas(1000, 1000);
  }

  async init(data: {
    thumbnailImage:any, target:string, productEditInfo:any, optionInfo:any, artProductIndex:string
  }) {
    const productCode = data.productEditInfo.productCode;
    const { thumbnailImage, target, productEditInfo, optionInfo, artProductIndex } = data;
    const productGroupName = productEditInfo.groupDelimitterName;
    const colorCode = data.optionInfo.colorCode;
    this.target = data.target;
    this.ext = optionInfo.ext;
    if (data.target === TargetType.STORE_LIST_1 || data.target === TargetType.STORE_DETAIL_3) {
      this.productResourcePath = productGroupName === 'slide' ?
        `${Config.RESOURCE_CDN_URL}/${productCode}/${colorCode}_list.png`
        :`${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_list.png` ;
    } else if (data.target === TargetType.STORE_DETAIL_2) {
      this.productResourcePath = `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_view.png`;
    } else {
      this.canvas = thumbnailImage;
    }
  }

  async composite() {
    const ctx = this.canvas.getContext('2d');
    if (this.target !== TargetType.STORE_DETAIL_4) {
      const loadedImage = await loadImage(this.productResourcePath);
      ctx.drawImage(loadedImage, 0, 0);
    }
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

export default EventProduct
