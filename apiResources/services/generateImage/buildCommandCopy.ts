import * as fs from 'fs';
import 'ag-psd/initialize-canvas.js';
import { readPsd } from 'ag-psd';
import { createRequire } from 'module';
import {ExecException} from "child_process";
const { exec } = require('child_process');

export interface SizeState {
  width: number;
  height: number;
}

export default class buildCommand {
  protected productCode: string;
  protected productType: string;
  protected productOption: string;
  protected productColor: string;
  protected psdPath: string;
  protected savePath: string;
  protected patternPath: string;
  protected pattern: SizeState;
  protected model: SizeState;
  protected patternSrcCoords: number[];
  protected patternDstCoords: number[][];
  protected colorCodes: string[];
  protected colorValue : number;
  protected diffd : number;
  protected diffl : number;
  protected layerOrder: string[];
  protected wrinkleMag: number;
  protected myName: string;

  constructor (data:{productType: string, productCode: string, productOption: string, productColor: string, psdPath: string, savePath: string, patternPath: string, patternSrcCoords: number[], patternDstCoords: number[], colorCodes: string[], layerOrder: string[]}) {
    this.productType = data.productType
    this.productCode = data.productCode
    this.productOption = data.productOption
    this.productColor = data.productColor
    this.savePath = data.savePath
    this.psdPath = data.psdPath
    this.patternPath = data.patternPath
    this.wrinkleMag = -20;
    this.myName = `(${this.patternPath.split('.')[0].split('/').slice(-1)[0]})`;

    this.pattern = {
      width: 0,
      height: 0
    }

    this.model = {
      width: 0,
      height: 0
    }

    this.patternSrcCoords = []
    this.patternDstCoords = []

    this.colorCodes = data.colorCodes

    this.colorValue = 0
    this.diffd = 0
    this.diffl = 0

    this.layerOrder = data.layerOrder
  }

  createFolder () {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.savePath)) {
        fs.mkdirSync(this.savePath, { recursive: true })
      }

      resolve(true)
    })
  }

  psdLayerExtractor (idx:number) {
    return new Promise((resolve, reject) => {
      exec(
        `magick '${this.psdPath}[0,${idx}]' \\( -clone 0 -fill white -colorize 100 \\) -swap 0,2 +delete -flatten -transparent white '${this.savePath}/${this.productCode}.png'`,
        (err:ExecException) => {
          if (err) reject(err)

          resolve(true)
        })
    })
  }

  async getPSDInfo () {
    const buffer = fs.readFileSync(this.psdPath)
    const psdData:any = readPsd(buffer)
    console.log(psdData.children[0].placedLayer)
    // 메인 사이즈
    this.model.width = psdData.width
    this.model.height = psdData.height

    switch (this.productType) {
      case 'HOOD':
      case 'STRAP':
        this.patternDstCoords.push(psdData.children[0].placedLayer.transform)
        break
      case 'PIN':
      case 'MAGNET':
      case 'MIRROR':
        this.patternDstCoords = [
          psdData.children[1].placedLayer.transform,
          psdData.children[0].placedLayer.transform
        ]
        break
      case 'SMARTTOK':
      case 'TINCASE':
      case 'ECOBAG':
      case 'APPAREL':
      case 'FINGER':
        if (psdData.children[0].placedLayer.nonAffineTransform) {
          this.patternDstCoords.push(psdData.children[0].placedLayer.nonAffineTransform)
        }
        else {
          this.patternDstCoords.push(psdData.children[0].placedLayer.transform)
        }
        break
      default:
        if (psdData.children[0].placedLayer.nonAffineTransform) {
          this.patternDstCoords.push(psdData.children[0].placedLayer.nonAffineTransform)
        }
        else {
          this.patternDstCoords.push(psdData.children[0].placedLayer.transform)
        }
    }

    return psdData
  }

  getPatternSize () {
    return new Promise((resolve, reject) => {
      exec(`identify -format "%[fx:w] %[fx:h]" '${this.patternPath}'`,
        (err:ExecException, stdout:string) => {
          if (err) reject(err)

          this.pattern.width = parseInt(stdout.split(' ')[0])
          this.pattern.height = parseInt(stdout.split(' ')[1])

          this.patternSrcCoords = [
            0,
            0,
            this.pattern.width,
            0,
            this.pattern.width,
            this.pattern.height,
            0,
            this.pattern.height]

          resolve(true)
        })
    })
  }

  async patternResizer (patternPath:string, targetCoords:number[], tempIdx:string) {
    await this.getPatternSize()

    const perspectiveCoords: number[] = [];

    for (let i = 0; i < targetCoords.length; i += 2) {
      perspectiveCoords.push(this.patternSrcCoords[i],
        this.patternSrcCoords[i + 1], targetCoords[i]+this.wrinkleMag+8, targetCoords[i + 1]+this.wrinkleMag)
    }

    return new Promise((resolve, reject) => {
      exec(
        `convert '${patternPath}' -matte -virtual-pixel transparent -background transparent -extent ${this.model.width}x${this.model.height} \
        -distort Perspective \
        "${perspectiveCoords}" \
        '${this.savePath}/${this.productCode}_PatternModified${tempIdx}.png'
      `, (err:ExecException, stdout:string) => {
          if (err) console.error(err)

          resolve(true)
        })
    })
  }

  getGrayScaleOf () {
    return new Promise((resolve, reject) => {
      exec(
        `convert '${this.savePath}/${this.productCode}_blur.png' -colorspace gray '${this.savePath}/${this.productCode}_GrayScale.png'`,
        (err:ExecException) => {
          if (err) reject(err)

          resolve(true)
        })
    })
  }

  getMaskImage () {
    return new Promise((resolve, reject) => {
      exec(
        `convert '${this.savePath}/${this.productCode}_blur.png' \ -bordercolor white -border 1 \ -fuzz 0.2% \ -fill black \ -draw 'color 0,0 floodfill' \ -alpha off \ -fill white +opaque black \ -blur 0x1 -level 50x100% -shave 1x1 \ '${this.savePath}/${this.productCode}_ProductMaskImage.png'`,
        (err:ExecException) => {
          if (err) reject(err)

          resolve(true)
        })
    })
  }

  getColorValue () {
    return new Promise((resolve, reject) => {
      exec(
        `convert '${this.savePath}/${this.productCode}_GrayScale.png' -scale 1x1! -alpha off -type grayscale -format "%[pixel:u.p{0,0}]" info: | tr -cs "0-9*\\n" " "
      `, (err:ExecException, stdout:string) => {
          if (err) reject(err)
          const res = parseInt(stdout.trim().split(' ').join('.'))
          this.diffd = 40 - 100 * (res / 255)
          this.diffl = 50 - 100 * (res / 255)
          resolve(stdout)
        })
    })
  }

  getDisplaceImage () {

    return new Promise((resolve, reject) => {
      exec(
        `convert '${this.savePath}/${this.productCode}_GrayScale.png' \ -evaluate add -${this.diffd}% -sigmoidal-contrast 5x50% \ '${this.savePath}/${this.productCode}_ProductMaskImage.png' \ -alpha off -compose copy_opacity -composite \ -alpha background '${this.savePath}/${this.productCode}_DisplaceImage.png'`,
        (err:ExecException, stdout:string) => {
          if (err) reject(err)

          resolve(true)
        })
    })
  }

  getLightImage () {

    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_GrayScale.png' \
      -evaluate add -${this.diffl}% \ '${this.savePath}/${this.productCode}_LightImage.png'`,
        (err:ExecException, stdout:string) => {
          if (err) reject(err)
          resolve(true)
        })
    })
  }

  getOverlayImage () {
    return new Promise((resolve, reject) => {

      exec(
        `convert '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}_LightImage.png' -compose multiply -composite \ '${this.savePath}/${this.productCode}_DisplaceImage.png' -compose displace -set option:compose:args 4x4 -composite '${this.savePath}/${this.productCode}_PatternModified.png'`,
        // `convert '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}_LightImage.png' -compose multiply -composite \ '${this.savePath}/${this.productCode}_DisplaceImage.png' -compose displace -set option:compose:args -10x-15 -composite '${this.savePath}/${this.productCode}_PatternModified.png'`,
        (err:ExecException, stdout:string) => {
          if (err) reject(err)
          resolve(true)
        })
    })
  }

  overlayDstOut (maskImg:string, targetImg:string, savePath:string) {

    return new Promise((resolve, reject) => {
      exec(
        `composite -compose Dst_Out -gravity center ${maskImg} ${targetImg} -alpha Set ${savePath}`,
        (err:ExecException) => {
          if (err) console.error(err)

          resolve(true)
        })
    })
  }

  async overlayDstIn (maskImg:string, targetImg: string, savePath:string) {
    await this.shadowPutter();

    return new Promise((resolve, reject) => {
      exec(
        `composite -compose Dst_In -gravity center ${maskImg} ${targetImg} ${savePath}`,
        (err:ExecException) => {
          if (err) console.error(err)

          resolve(true)
        })
    })
  }

  shadowPutter() {

    return new Promise((resolve, reject) => {
      exec(`composite ${this.savePath}/${this.productCode}_channels.png ${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_PatternWithShadow.png`, (err:ExecException) => {
        if (err) console.error(err)

        resolve(true);
      })
    })
  }

  async finalize () {

    return new Promise((resolve, reject) => {
      exec(
        `composite '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}.png' '${this.savePath}/${this.productCode}_Final${this.myName}.png'`,
        (err:ExecException) => {
          if (err) console.error(err)
      })
      if (this.colorCodes) {
        for (let i = 0; i < this.colorCodes.length; i++) {
          exec(
            `composite '${this.savePath}/${this.productCode}_${this.colorCodes[i]}.png' '${this.savePath}/${this.productCode}.png' '${this.savePath}/${this.productCode}_${this.colorCodes[i]}_Final.png'`,
            (err:ExecException) => {
              if (err) console.error(err)
            })
        }
      } else if (this.productColor) {
        for (let i = 0; i < this.productColor.length; i++) {
          exec(
            `composite '${this.savePath}/${this.productCode}_PatternModified.png' '${this.savePath}/${this.productCode}_${this.productColor[i]}.png' '${this.savePath}/${this.productCode}_${this.productColor[i]}_Final.png'`,
            (err:ExecException) => {
              if (err) console.error(err)

            })
        }
      }

      resolve(true)
    })
  }

  async colorGenerator () {
      for (let i = 0; i < this.colorCodes.length; i++) {
        if (this.colorCodes[i][0] === '#') {
          await this.changeColor(this.colorCodes[i])
        }
        else {
          await this.changeTexture(this.colorCodes[i]);
        }
      }
  }

  changeColor (color:string) {
    return new Promise((resolve, reject) => {
      exec(`convert '${this.savePath}/${this.productCode}_crop.png' \\( -clone 0 +level-colors '${color}' \\) -compose multiply -composite '${this.savePath}/${this.productCode}_crop.png' -compose multiply -composite '${this.savePath}/${this.productCode}_crop.png' -compose multiply -composite '${this.savePath}/${this.productCode}_${color}.png'`, (err:ExecException) => {
        if (err) console.error(err);

        resolve(true);
      })
    })
  }

  changeTexture (texture:string) {
    return new Promise((resolve, reject) => {
      exec(`magick ${this.savePath}/${this.productCode}_crop.png ${this.savePath}/${texture}.png -compose multiply -composite ${this.savePath}/${this.productCode}_crop.png -compose multiply -composite ${this.savePath}/${this.productCode}_crop.png -compose multiply -composite ${this.savePath}/${this.productCode}_${texture}.png`, (err:ExecException) => {
        if (err) console.error(err);

        resolve(true);
      })
    })
  }

  brightnessAdjuster () {
    return new Promise((resolve, reject) => {
      exec(`convert ${this.savePath}/${this.productCode}_PatternModified.png -evaluate Multiply 1.02 ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
        if (err) {
          console.error(err);
        }

        resolve(true);
      });
    })
  }

  addCoordinateData () {
    return new Promise((resolve, reject) => {

      const file = JSON.parse(fs.readFileSync('/Users/david/Documents/work/oround-image-generator-server/src/constants/coordinateData.json', 'utf-8'));

      if (file[this.productCode]) {
        if (!file[this.productCode][this.productOption]) {
          if (this.productOption) {
            file[this.productCode][this.productOption] = this.patternDstCoords;
          }
          else {
            file[this.productCode] = this.patternDstCoords;
          }
        }
      }
      else {
        file[this.productCode] = {}
        if (this.productOption) {
          file[this.productCode][this.productOption] = this.patternDstCoords;
        }
        else {
          file[this.productCode] = this.patternDstCoords;
        }
      }

      fs.writeFileSync('/Users/david/Documents/work/oround-image-generator-server/src/constants/coordinateData.json', JSON.stringify(file));

      resolve(true);
    })
  }

  async mergeLayers () {
    // await this.overlayDstOut(`${this.savePath}/${this.productCode}_mask.png`,
    //   `${this.savePath}/${this.productCode}_PatternModified.png`,
    //   `${this.savePath}/${this.productCode}_PatternModified.png`)
    let imageLayers = ''

    if (this.layerOrder.length > 2) {
      for (let i = 0; i < this.layerOrder.length; i++) {
        if (this.layerOrder[i] === 'PatternModified') {
          for (let j = this.patternDstCoords.length - 1; j >= 0; j--) {
            imageLayers += `${this.savePath}/${this.productCode}_PatternModified${j}.png `
          }
        } else {
          imageLayers += `${this.savePath}/${this.productCode}_${this.layerOrder[i]}.png `
        }
      }
    }
    else if (this.layerOrder.length === 1) {
      imageLayers += `${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_${this.layerOrder[0]}.png`
    }
    else {
      imageLayers += `${this.savePath}/${this.productCode}_PatternModified.png`
    }

    return new Promise((resolve, reject) => {
      exec(
        `convert ${imageLayers.trim()} -background None -layers Flatten ${this.savePath}/${this.productCode}_PatternModified.png`,
        (err:ExecException) => {
          if (err) console.error(err)

          resolve(true)
        })
    })
  }

  async buildTempImages () {
    if (this.patternDstCoords.length > 1) {
      for (let i = 0; i < this.patternDstCoords.length; i++) {
        await this.patternResizer(`${this.patternPath}`,
          this.patternDstCoords[i], i.toString())
      }

      // 버튼류에만 사용...
      await this.overlayDstOut(
        `${this.savePath}/${this.productCode}_frontmask.png`,
        `${this.savePath}/${this.productCode}_PatternModified0.png`,
        `${this.savePath}/${this.productCode}_PatternModified0.png`)
    } else {

      await this.patternResizer(`${this.patternPath}`, this.patternDstCoords[0],
        '')
    }

  }

  getBase64() {
    return new Promise((resolve, reject) => {
      exec(`convert ${this.savePath}/${this.productCode}_Final.png png:- | base64`, {maxBuffer: 2000 * 2000}, (err:ExecException, stdout:string) => {
        if (err) console.error(err);

        resolve(stdout);
      })
    })
  }

  displacePattern() {
    return new Promise((resolve, reject) => {
      exec(`convert ${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_blur.png -alpha set -virtual-pixel transparent -compose displace -set option:compose:args ${this.wrinkleMag}x${this.wrinkleMag} -composite ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
        if (err) console.error(err);

        resolve(true);

      })
    })
  }

  wrinklePattern() {
    return new Promise((resolve, reject) => {
      exec(`convert ${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_crop.png -compose multiply -composite ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
      // exec(`convert ${this.savePath}/${this.productCode}_PatternModified.png ${this.savePath}/${this.productCode}_blur.png -compose multiply -composite ${this.savePath}/${this.productCode}_PatternModified.png`, (err:ExecException) => {
        if (err) console.error(err);

        resolve(true);

      })
    })
  }

  async getApparelResult () {
    // await this.colorGenerator()
    await this.getPSDInfo()
    await this.buildTempImages()
    await this.displacePattern()
    await this.wrinklePattern()
    await this.mergeLayers()
    await this.finalize()
  }

  async getOthersResult () {
    await this.getPSDInfo()
    await this.addCoordinateData()
    await this.buildTempImages()
    await this.mergeLayers()
    await this.finalize()
  }

  getStatus () {
    console.log(this)
  }
}
