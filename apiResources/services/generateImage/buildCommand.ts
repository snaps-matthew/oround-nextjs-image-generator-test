import * as fs from 'fs';
import 'ag-psd/initialize-canvas.js';
import {readPsd} from 'ag-psd'
import { createRequire } from 'module'
import {ExecException} from "child_process";
// const require = createRequire(import.meta.url);
const { exec } = require('child_process');

export interface SizeState {
  width: number;
  height: number
}


export default class buildCommand {
  protected productName: string;
  protected productCode: string;
  protected productSize: string;
  protected productColor: string;
  protected psdPath: string;
  protected savePath: string;
  protected patternPath: string;
  protected pattern: SizeState;
  protected model: SizeState;
  protected patternSrcCoords: number[];
  protected patternDstCoords: number[][];
  protected colorCodes: string;
  protected colorValue : number;
  protected diffd : number;
  protected diffl : number;
  protected layerOrder: string;

  constructor (data:{productName: string, productCode: string, productSize: string, productColor: string, psdPath: string, savePath:string, patternPath:string, colorCodes:string, layerOrder:string}) {
    this.productName = data.productName;
    this.productCode = data.productCode;
    this.productSize = data.productSize ? `_${data.productSize}` : '';
    this.productColor = data.productColor ? `_${data.productColor}` : '';
    this.psdPath = data.psdPath;
    this.savePath = data.savePath;
    this.patternPath = data.patternPath;
    
    this.pattern = {
      width: 0,
      height: 0
    }
    
    this.model = {
      width: 0,
      height: 0
    }
    
    this.patternSrcCoords = [];
    this.patternDstCoords = [];
    
    this.colorCodes = data.colorCodes;
    
    this.colorValue = 0;
    this.diffd = 0;
    this.diffl = 0;
    
    // this.imageContainer = data.imageContainer;
    this.layerOrder = data.layerOrder;
  }
  
  createFolder() {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.savePath)) {
        fs.mkdirSync(this.savePath, { recursive: true });
      }
      
      resolve(true);
    })
  }
  
  psdLayerExtractor(idx:number) {
    return new Promise((resolve, reject) => {
      exec(`magick '${this.psdPath}[0,${idx}]' \\( -clone 0 -fill white -colorize 100 \\) -swap 0,2 +delete -flatten -transparent white '${this.savePath}/${this.productCode}.png'`, (err:ExecException) => {
        if (err) reject(err);
        
        resolve(true);
      });
    })
  }
  
  async getPSDInfo(productType:string) {
    const buffer = fs.readFileSync(this.psdPath);
    const psdData:any = readPsd(buffer);
    // 메인 사이즈
    this.model.width = psdData.width;
    this.model.height = psdData.height;
    switch (productType) {
      case 'APPAREL':
        this.patternDstCoords.push(psdData.children && psdData.children[0].placedLayer.transform);
        break;
      case 'PINBUTTON':
        this.patternDstCoords = [psdData.children && psdData.children[1].placedLayer.transform, psdData.children[0].placedLayer.transform];
        break;
      case 'SMARTTOK':
        this.patternDstCoords.push(psdData.children && psdData.children[0].placedLayer.nonAffineTransform);
        break;
      default:
        this.patternDstCoords.push(psdData.children && psdData.children[0].placedLayer.nonAffineTransform);
    }
    
    return psdData;
  }
  
  getPatternSize() {
    return new Promise((resolve, reject) => {
      exec(`identify -format "%[fx:w] %[fx:h]" '${this.patternPath}'`, (err:ExecException, stdout:string) => {
        if (err) reject(err);
        this.pattern.width = parseInt(stdout.split(" ")[0]);
        this.pattern.height = parseInt(stdout.split(" ")[1]);
        
        this.patternSrcCoords = [0,0,this.pattern.width,0,this.pattern.width, this.pattern.height, 0,this.pattern.height];
        
        resolve(true);
      });
    })
  }
  
  async patternResizer(patternPath:string, targetCoords:number[], tempIdx:number) {
    await this.getPatternSize();
    
    const perspectiveCoords: number[] = [];

    for (let i=0; i < targetCoords.length; i+=2) {
      perspectiveCoords.push(this.patternSrcCoords[i], this.patternSrcCoords[i+1], targetCoords[i], targetCoords[i+1]);
    }
    
    return new Promise((resolve, reject) => {
      exec(`convert '${patternPath}' -matte -virtual-pixel transparent -background transparent -extent ${this.model.width}x${this.model.height} \
        -distort perspective \
        "${perspectiveCoords}" \
        '${this.savePath}/${this.productCode}_PatternModified${tempIdx}.png'
      `, (err:ExecException, stdout:string) => {
        if (err) console.error(err);

        resolve(true);
      })
    })
  }
  
  getGrayScaleOf() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_blur.png' -colorspace gray '${this.savePath}/${this.productCode}_GrayScale.png'`, (err:ExecException) => {
        if (err) reject(err);
        
        resolve(true);
      })
    })
  }
  
  getMaskImage() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_blur.png' \ -bordercolor white -border 1 \ -fuzz 0.2% \ -fill black \ -draw 'color 0,0 floodfill' \ -alpha off \ -fill white +opaque black \ -blur 0x1 -level 50x100% -shave 1x1 \ '${this.savePath}/${this.productCode}_ProductMaskImage.png'`, (err:ExecException) => {
        if (err) reject(err);
        
        resolve(true);
      });
    })
  }
  
  getColorValue() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_GrayScale.png' -colorspace gray '${this.savePath}/${this.productCode}_ProductMaskImage.png' -alpha off -compose copy_opacity -composite \\
        -scale 1x1! -alpha off -type grayscale -format "%[pixel:u.p{0,0}]" info: | tr -cs "0-9*\\n" " "
      `, (err:ExecException, stdout:string) => {
        if (err) reject(err);
        const res = parseInt(stdout.trim().split(" ").join("."));
        this.diffd = 40 - 100 * (res / 255);
        this.diffl = 50 - 100 * (res / 255);
        resolve(stdout);
      })
    })
  }
  
  getDisplaceImage() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_GrayScale.png' \ -evaluate add -${this.diffd}% -sigmoidal-contrast 5x50% \ '${this.savePath}/${this.productCode}_ProductMaskImage.png' \ -alpha off -compose copy_opacity -composite \ -alpha background '${this.savePath}/${this.productCode}_DisplaceImage.png'`, (err:ExecException, stdout:string) => {
        if (err) reject(err);
        
        resolve(true);
      })
    })
  }
  
  getLightImage() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_GrayScale.png' \
      -evaluate add -${this.diffl}% \ '${this.savePath}/${this.productCode}_LightImage.png'`, (err:ExecException, stdout:string) => {
        if (err) reject(err);
        resolve(true);
      })
    })
  }
  
  getOverlayImage() {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}_LightImage.png' -compose multiply -composite \ '${this.savePath}/${this.productCode}_DisplaceImage.png' -compose displace -set option:compose:args -10x-15 -composite '${this.savePath}/${this.productCode}_PatternModified.png'`, (err:ExecException, stdout:string) => {
      // exec(`convert '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}_LightImage.png' -compose multiply -composite \ '${this.savePath}/${this.productCode}_DisplaceImage.png' -auto-gamma -alpha set -virtual-pixel transparent -compose displace -set option:compose:args -25x-25 -composite '${this.savePath}/${this.productCode}_PatternModified.png'`, (err, stdout) => {
        if (err) reject(err);
        resolve(true)
      })
    })
  }
  
  overlayCutter() {
    return new Promise((resolve, reject) => {
      // exec(`convert '/Users/david/Documents/work/imageBuilder/result/apparel/resources/artworkMask.png' -fill white -colorize 100 '/Users/david/Documents/work/imageBuilder/result/apparel/resources/overlayImage.png' -compose multiply -composite '/Users/david/Documents/work/imageBuilder/result/apparel/resources/NEWoverlay.png'`)
      exec(`composite -compose Dst_Out -gravity center ${this.savePath}/${this.productCode}_mask.png ${this.savePath}/${this.productCode}_PatternModified.png -alpha Set ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
        if (err) console.error(err);
        
        resolve(true);
      })
    })
  }
  
  finalize() {
    return new Promise((resolve, reject) => {
      exec(`composite '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}${this.productColor}.png' '${this.savePath}/${this.productCode}${this.productColor}_Final.png'`, (err:ExecException) => {
        if (err) console.error(err);
        
        resolve(true);
      })
    })
  }
  
  colorChanger() {
    // facad2
    return new Promise((resolve, reject) => {
      exec(`composite ${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}.png ${this.savePath}/${this.productCode}_Final.png`, (err:ExecException) => {
        if (err) console.error(err);
        
        resolve(true);
      })
    })
  }
  
  addCoordinateData() {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const data = JSON.parse(fs.readFileSync('../../coordinateData.json'));
      if (!data[this.productCode]) {
        if (this.productCode.includes('_')) {
          const productCode = this.productCode.split("_")[0];
          const productSize = this.productCode.split("_")[1];
          data[productCode] = {}
          data[productCode].productName = `${this.productName}${this.productSize}`;
          data[productCode][productSize] = this.patternDstCoords;
        }
        else {
          data[this.productCode] = {
            productName: `${this.productName}${this.productSize}`,
            coordinates: this.patternDstCoords
          }
        }
      }

      fs.writeFileSync('../../coordinateData.json', JSON.stringify(data));
    })
  }
  
  mergeLayers() {
    let imageLayers = '';
    
    if (this.layerOrder.length > 1) {
      for (let i=0; i < this.layerOrder.length; i++) {
        if (this.layerOrder[i] === 'PatternModified') {
          for (let j=this.patternDstCoords.length -1; j >= 0; j--) {
            imageLayers += `${this.savePath}/${this.productCode}_PatternModified${j}.png `;
          }
        }
        else {
          imageLayers += `${this.savePath}/${this.productCode}_${this.layerOrder[i]}.png`
        }
      }
    }
    else {
      imageLayers += `${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_${this.layerOrder[0]}.png`
    }
    
    return new Promise((resolve, reject) => {
      exec(`convert ${imageLayers.trim()} -background None -layers Flatten ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
        if (err) console.error(err);
        resolve(true);
      });
    })
  }

  async buildTempImages() {
    if (this.patternDstCoords.length > 1) {
      for (let i=0; i < this.patternDstCoords.length; i++) {
        await this.patternResizer(`${this.patternPath}`, this.patternDstCoords[i], i);
      }
    }
    else {
      await this.patternResizer(`${this.patternPath}`, this.patternDstCoords[0],0);
    }
    
  }
  
  getStatus() {
    console.log(this);
  }
}
