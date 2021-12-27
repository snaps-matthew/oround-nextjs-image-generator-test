import Config from 'apiResources/constants/Config';
import TargetType from 'apiResources/constants/TargetType';
import { Canvas, createCanvas } from 'canvas';
import { loadImage } from 'apiResources/utils/loadImage';
import { newCanvas } from 'apiResources/utils/newCanvas';
import { getArtworkImage } from 'apiResources/utils/getSelectedScene';
import { imageFull } from 'apiResources/utils/imageAlign';

class EventProduct {
  protected productResourcePath: string;
  protected canvas: Canvas;
  protected target: string;
  protected  artworkImage: Canvas;
  protected  artworkImageWidth: number;
  protected  artworkImageHeight: number;
  protected ext: string;

  constructor() {
    this.productResourcePath = '';
    this.artworkImage = createCanvas(1000, 1000);
    this.artworkImageWidth = 0;
    this.artworkImageHeight = 0;
    this.target = '';
    this.ext = '';
    this.canvas = createCanvas(1000, 1000);
  }

  async init(data: {
    thumbnailImage:any, target:string, productEditInfo:any, optionInfo:any, artProductIndex:string
  }) {
    const productCode = data.productEditInfo.productCode;
    const { thumbnailImage, target, productEditInfo, optionInfo, artProductIndex } = data;
    this.target = data.target;
    this.ext = optionInfo.ext;

    if (data.target === TargetType.STORE_LIST_1) {

      this.productResourcePath = productCode === '1040190002' ? `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_list0.png` : `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_list.png`;

    } else if (data.target === TargetType.STORE_DETAIL_2) {

      this.productResourcePath = `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_view.png`;

    } else if (data.target === TargetType.STORE_DETAIL_3) {

      this.productResourcePath = productCode === '1040190002' ? `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_list1.png` : `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}_list.png`;

    } else {
      const {artworkImage, artworkImageWidth, artworkImageHeight}  = await getArtworkImage(productEditInfo, optionInfo);
      this.artworkImage = artworkImage;
      this.artworkImageWidth = artworkImageWidth;
      this.artworkImageHeight = artworkImageHeight;
    }
  }

  async composite() {
    const ctx = this.canvas.getContext('2d');
    if (this.target !== TargetType.STORE_DETAIL_4) {
      const loadedImage = await loadImage(this.productResourcePath);
      ctx.drawImage(loadedImage, 0, 0);
    } else {

      const size = imageFull(this.artworkImageWidth, this.artworkImageHeight, 1000, 1000, 0);
      ctx.drawImage(this.artworkImage, size.x, size.y, size.width, size.height);
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
