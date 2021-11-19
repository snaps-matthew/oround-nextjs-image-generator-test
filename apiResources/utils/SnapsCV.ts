// import UAParser from 'ua-parser-js'
// import { GV } from '../constants/globalVariable'
// import { BASE_FILE } from '../configs/baseFile'

// const uaParser = new UAParser()
// const result = uaParser.getResult()
// const isIE = result.browser.name === 'IE'

import {createCanvas} from "canvas";

export class SnapsCV {
  protected binarizationArray: [];
  protected labelingData: any[] | undefined;
  constructor (){
    this.binarizationArray = []
  }
  grayscale (pixels:any, paperName:string) {
    let d = pixels.data, i = 0, total = d.length
    const brightnessVal = 0.2
    // const brightnessVal = paperName === COMMON_NAME.PAPER_TRANSPARENCY? 0.2 : 0.1
    for (; i < total; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2]
      // const brightness = 0.34 * r + 0.5 * g + 0.16 * b
      // const brightness = 0.299 * r + 0.587 * g + 0.114 * b
      // const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b
      // const brightness = 0.2627 * r + 0.6780 * g + 0.0593 * b
      const brightness = brightnessVal * r + brightnessVal * g + brightnessVal * b
      d[i] = d[i + 1] = d[i + 2] = brightness
    }
    return pixels
  }

  contrast (pixels:any, amount:number) {
    let d = pixels.data, i = 0, total = d.length
    for (; i < total; i += 4) {
      d[i] = ((((d[i] / 255) - 0.5) * amount) + 0.5) * 255
      d[i + 1] = ((((d[i + 1] / 255) - 0.5) * amount) + 0.5) * 255
      d[i + 2] = ((((d[i + 2] / 255) - 0.5) * amount) + 0.5) * 255
    }
    return pixels
  }

  brightness (pixels:any, adjustment:number) {
    let d = pixels.data, i = 0, total = d.length
    for (; i < total; i += 4) {
      d[i] += adjustment
      d[i + 1] += adjustment
      d[i + 2] += adjustment
    }
    return pixels
  }

  threshold (pixels:any, threshold:number) {
    let d = pixels.data, i = 0, total = d.length
    for (; i < total; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2]
      const v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold) ? 255 : 0
      d[i] = d[i + 1] = d[i + 2] = v
    }
    return pixels
  }

  sepia (pixels:any) {
    let d = pixels.data, i = 0, total = d.length
    for (; i < total; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2]
      d[i] = r * 0.3588 + g * 0.7044 + b * 0.1368
      d[i + 1] = r * 0.2990 + g * 0.5870 + b * 0.1140
      d[i + 2] = r * 0.2392 + g * 0.4696 + b * 0.0912
    }
    return pixels
  }

  invert (pixels:any) {
    let d = pixels.data, i = 0, total = d.length
    for (; i < total; i += 4) {
      d[i] = 255 - d[i]     // R
      d[i + 1] = 255 - d[i + 1] // G
      d[i + 2] = 255 - d[i + 2] // B
      d[i + 3] = 255          // Alpha
    }
    return pixels
  }

  multiply(pixels1:any, pixels2:any) {
    let data = pixels1.data, i = 0, total = data.length
    const data2 = pixels2.data

    for (; i < total; i += 4) {
      data[i  ] = data2[i] * data[i] / 255
      data[i+1] = data2[i+1] * data[i+1] / 255
      data[i+2] = data2[i+2] * data[i+2] / 255
      data[i+3] = data2[i+3]
    }
    return pixels1
  }

  imageLoad (url:string) {
    return new Promise((resolve, reject) => {
      let image = document.createElement('img')
      image.crossOrigin = 'Anonymous'
      image.onload = () => { resolve(image) }
      image.onerror = () => { console.log('B: Image load Error : ' + url)}

      image.src = url
    })
  }

  newCanvas (width:number, height:number) {
    const canvas = createCanvas(width, height)
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    return {canvas, ctx}
  }

  convolute (pixels:any, weights:any, opaque:any) {
    const side = Math.round(Math.sqrt(weights.length))
    const halfSide = Math.floor(side / 2)

    const src = pixels.data
    const sw = pixels.width
    const sh = pixels.height

    const w = sw
    const h = sh

    const tc:any = this.newCanvas(w, h)
    const output = tc.ctx.createImageData(w, h)
    const dst = output.data

    const alphaFac = opaque ? 1 : 0

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const sy = y
        const sx = x
        const dstOff = (y * w + x) * 4
        let r = 0, g = 0, b = 0, a = 0
        for (let cy = 0; cy < side; cy++) {
          for (let cx = 0; cx < side; cx++) {
            const scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide))
            const scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide))
            const srcOff = (scy * sw + scx) * 4
            const wt = weights[cy * side + cx]
            r += src[srcOff] * wt
            g += src[srcOff + 1] * wt
            b += src[srcOff + 2] * wt
            a += src[srcOff + 3] * wt
          }
        }
        dst[dstOff] = r
        dst[dstOff + 1] = g
        dst[dstOff + 2] = b
        dst[dstOff + 3] = a + alphaFac * (255 - a)
      }
    }
    return output
  }

  filterConvolute (canvas:any, weights:any, opaque:any) {
    const ctx = canvas.getContext('2d')
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
    return this.convolute(pixels, weights, opaque)
  }

  lightenEmboss (canvas:any) {
    return this.filterConvolute(canvas, [-1, -1, -1, -1, 0, 1, 1, 1, 1],'')
  }

  darkenEmboss (canvas:any) {
    return this.filterConvolute(canvas, [1, 1, 1, 1, 0, -1, -1, -1, -1],'')
  }

  blur (canvas:any) {
    // return this.filterConvolute(canvas, [1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9, 1/9]);
    return this.filterConvolute(canvas, [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16],'')
  }
  filterGray(canvas:any, paperName:string){
    const ctx = canvas.getContext('2d');
    const pixels = ctx.getImageData(0,0, canvas.width, canvas.height);
    const imgData = this.grayscale(pixels, paperName)
    ctx.putImageData(imgData, 0, 0)
  }

  alphaBinarizationColor (canvas:any, cr:any, cg:any, cb:any) {
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data
    const dataLength = data.length

    const r = 0, g = 1, b = 2, a = 3
    for (let p = 0; p < dataLength; p += 4) {
      if (data[p + a] > 125) {
        data[p + r] = cr
        data[p + g] = cg
        data[p + b] = cb
        data[p + a] = 255

      } else {
        data[p + r] = 0
        data[p + g] = 0
        data[p + b] = 0
        data[p + a] = 0
      }
    }
    ctx.putImageData(imgData, 0, 0)
  }

  alphaBinarizationCanvas (canvas:any) {
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data
    const dataLength = data.length

    const r = 0, g = 1, b = 2, a = 3
    for (let p = 0; p < dataLength; p += 4) {
      if (data[p + a] > 125) {
        data[p + r] = 0
        data[p + g] = 0
        data[p + b] = 0
        data[p + a] = 255

      } else {
        data[p + r] = 0
        data[p + g] = 0
        data[p + b] = 0
        data[p + a] = 0
      }
    }
    ctx.putImageData(imgData, 0, 0)
  }

  alphaBinarizationOrigin (canvas:any) {
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data
    const dataLength = data.length

    for (let p = 0; p < dataLength; p += 4) {
      const row = p + 3
      if(data[row] < 125) data[row] = 0

    }
    ctx.putImageData(imgData, 0, 0)
  }

  morphology (canvas:any, mask:any, isErosion:any) {
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    const data = imgData.data
    const width = imgData.width
    const height = imgData.height

    const tmpCanvas:any = this.newCanvas(width, height) //tc
    const output = tmpCanvas.ctx.createImageData(width, height)
    const dst = output.data

    const side = Math.sqrt(mask.length)
    const halfSide = Math.floor(side / 2)
    let i = 0

    const checkMatch = this.checkMatch
    const binarizationArray:any = this.binarizationArray

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dstOff = (y * width + x) * 4  // 한 도트는 4개(R,G,B,A)로 이루어져있다. ex) 255,255,255,255,0,0,0,0... 이러므로 4개씩 끊어서 읽어야한다.
        const check = checkMatch(data, width, side, x - halfSide, y - halfSide, mask, isErosion)

        dst[dstOff] = 255     // red
        dst[dstOff + 1] = 255 // green
        dst[dstOff + 2] = 255 // blue

        if(check){
          dst[dstOff + 3] = 255
          binarizationArray[i]= 1
        }else{
          dst[dstOff + 3] = 0
          binarizationArray[i] = 0
        }
        i++
      }
    }
    ctx.putImageData(output,0,0)
  }

  checkMatch (data:any, width:any, side:any, startX:any, startY:any, mask:any, isErosion:any) {
    for (let maskY = 0; maskY < side; maskY++) {
      for (let maskX = 0; maskX < side; maskX++) {
        const dataOff = ((startY + maskY) * width + (startX + maskX)) * 4
        const alpha = data[dataOff + 3]
        const maskValue = mask[maskY * side + maskX]
        const maskAlpha = maskValue === 1 ? 255 : 0

        if (maskValue === 1) {
          if (isErosion) {
            if (alpha !== maskAlpha) {
              return false
            }
          } else {
            if (alpha === maskAlpha) {
              return true
            }
          }
        }
      }
    }
    return isErosion
  }

  fillColor (canvas:any, width:any, height:any, fillColor:any){
    const temp:any  = this.newCanvas(width, height)
    temp.ctx.fillStyle = fillColor
    temp.ctx.fillRect(0, 0, width, height)
    temp.ctx.globalCompositeOperation = 'destination-atop'
    temp.ctx.drawImage(canvas, 0, 0)
    return temp.canvas
  }

  alphaBinarization (canvas:any) {
    const ctx = canvas.getContext('2d')
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data
    const dataLength = data.length
    const binarizationArray:any = this.binarizationArray
    let i = 0
    let p = 0

    for (; p < dataLength; p += 4, i++) {
      if (data[p + 3] > 125) {
        binarizationArray[i]= 1

      } else {
        binarizationArray[i]= 0
      }
    }
  }

  erosion (canvas:any, mask:any) {
    this.dilation (canvas, mask, false)
  }

  dilation (canvas:any, mask:any, isDilate=true) {
    const width = canvas.width
    const binarizationArray = this.binarizationArray
    const total = binarizationArray.length
    let dilateData:any = binarizationArray.slice(0)

    // let k = 0
    // for (; k < total; k++) {
    //   dilateData[k] = 0
    // }

    let idx = 0
    const checkFourCardinalPoint = this.checkFourCardinalPoint
    const drawPoints = this.getMask(mask, isDilate)

    for(; idx < total; idx++){
      if(binarizationArray[idx] === 1){
        const check = checkFourCardinalPoint(width, idx, binarizationArray)
        if(check){
          let num = 0
          const total = drawPoints.length
          for( ;num < total; num++){
            const point = idx + (drawPoints[num][0]) + (drawPoints[num][1]*width)
            dilateData[point] = isDilate? 1 : 0
          }
        }
      }
    }
    this.binarizationArray = dilateData
  }

  checkFourCardinalPoint (width:number, idx:number, binarizationArray:any) {
    const checkArray = [idx - width, idx - 1, idx + 1, idx + width]
    let num = 0
    const total = checkArray.length
    for( ;num < total; num++){
      if(binarizationArray[checkArray[num]] === 0){
        return true
      }
    }
    return false
  }

  getMask_old (size:number, idx:number, width:number){
    const arr = []
    const halfSize = Math.floor(size / 2)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const value = idx - (width * (halfSize - y)) - (halfSize - x)
        if(y === 0 || y === size-1){
          if(x !== 0 && x !== size-1){
            arr.push(value)
          }
        }else{
          if(x === 0 || x === size-1) {
            arr.push(value)
          }
        }
      }
    }
    return arr
  }

  getMask(radius:number, isDilate:any) {
    const arr = []

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        if(isDilate){
          if (Math.round(Math.sqrt(x*x + y*y)) === radius){
            arr.push([x,y])
          }
        } else{
          if (Math.round(Math.sqrt(x*x + y*y)) <= radius){
            arr.push([x,y])
          }
        }
      }
    }
    return arr
  }

  findObjectContour(canvas:any) {
    const binarizationArray = this.binarizationArray
    const binarizationSize = binarizationArray.length
    const rowSize = canvas.width
    const labelingStack = [0]
    this.labelingData = new Array(binarizationSize)

    while(labelingStack.length !== 0){
      const point:any = labelingStack.shift()
      const checkMask = [ point - rowSize, point + rowSize, point -1, point +1]
      const maskTotal = checkMask.length

      let i = 0
      for(; i < maskTotal; i++){
        const dataNum = checkMask[i]
        if(binarizationArray[dataNum] === 0){
          if(this.labelingData[dataNum] !== 1){
            this.labelingData[dataNum] = 1
            labelingStack.push(dataNum)
          }
        }else if(binarizationArray[dataNum] === 1){
          if(this.labelingData[dataNum] !== 2) {
            this.labelingData[dataNum] = 2
          }
        }
      }
    }
  }

  invertFrontBackColor(canvas:any){
    // @ts-ignore
    const labelingSize = this.labelingData.length
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data

    const r = 0, g = 1, b = 2, a = 3
    let i = 0, p = 0

    for (; i < labelingSize; i++, p += 4){
      // @ts-ignore
      if (this.labelingData[i] === 2) {
        data[p + r] = 255
        data[p + g] = 0
        data[p + b] = 255
        data[p + a] = 255
      } else {
        data[p + r] = 255
        data[p + g] = 255
        data[p + b] = 255
        data[p + a] = 0
      }
    }
    ctx.putImageData(imgData, 0, 0)
  }

  contourPaintColor(canvas:any){
    // @ts-ignore
    const labelingSize = this.labelingData.length
    const ctx = canvas.getContext('2d')
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let data = imgData.data

    const r = 0, g = 1, b = 2, a = 3
    let i = 0, p = 0
    for (; i < labelingSize; i++, p += 4){
      // @ts-ignore
      if (this.labelingData[i] === 2 || this.labelingData[i] === 1) {
        data[p + r] = 0
        data[p + g] = 0
        data[p + b] = 0
        data[p + a] = 0

      }else {
        data[p + r] = 255
        data[p + g] = 255
        data[p + b] = 255
        data[p + a] = 255
      }
    }
    ctx.putImageData(imgData, 0, 0)
  }

  extendCanvas (maskSize:number, canvas:any) {
    const newWidth = canvas.width + maskSize
    const newHeight = canvas.height + maskSize
    const tmp:any = this.newCanvas(newWidth, newHeight)
    const halfMaskSize = maskSize / 2
    tmp.ctx.drawImage(canvas, halfMaskSize, halfMaskSize)
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(tmp.canvas, 0, 0)
  }

  erode (targetCanvas:any, canvas:any) {
    const MASK_5 = [0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0]
    this.extendCanvas(5, canvas)
    this.alphaBinarizationCanvas(canvas)
    this.morphology(canvas, MASK_5, true)
    this.findObjectContour(canvas)
    this.extendCanvas(-5, canvas)
    this.invertFrontBackColor(canvas)

    const ctx = targetCanvas.getContext('2d')
    ctx.drawImage(canvas, 0, 0)
  }

  dilate (targetCanvas:any, canvas:any, mask:any) {
    // console.time()
    this.extendCanvas(mask, canvas)
    this.alphaBinarization(canvas)
    this.dilation(canvas, mask)
    this.findObjectContour(canvas)
    this.invertFrontBackColor(canvas)
    // console.timeEnd()
    this.extendCanvas(mask * -1, canvas)
    const ctx = targetCanvas.getContext('2d')
    ctx.drawImage(canvas, 0, 0)
  }

  clearCanvas(targetCanvas:any){
    const ctx = targetCanvas.getContext('2d')
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height)
  }

  compositeHeatTransfer(targetCanvas:any, thumbnailCanvas:any){
    const width = targetCanvas.width
    const height = targetCanvas.height
    const targetCtx = targetCanvas.getContext('2d')
    const temp:any = this.newCanvas(width, height)

    temp.ctx.drawImage(thumbnailCanvas, 0, 0)

    this.alphaBinarizationColor(temp.canvas, 255, 255, 255)
    const MASK_3 = [0,1,0,1,1,1,0,1,0]
    this.morphology(temp.canvas, MASK_3, true)

    targetCtx.drawImage(temp.canvas, 0, 0)

    this.alphaBinarizationOrigin(thumbnailCanvas)

    targetCtx.drawImage(thumbnailCanvas, 0, 0)
  }

  compositeInkjet(targetCanvas:any, thumbnailCanvas:any){
    targetCanvas.getContext('2d').drawImage(thumbnailCanvas, 0, 0)
  }

  compositeScreen(targetCanvas:any, fillColor:any){
    const width = targetCanvas.width
    const height = targetCanvas.height

    this.alphaBinarizationCanvas(targetCanvas)
    const canvas = this.fillColor(targetCanvas, width, height, fillColor)

    const targetCtx = targetCanvas.getContext('2d')
    targetCtx.clearRect(0, 0, width, height)
    targetCtx.drawImage(canvas, 0, 0)
  }

  compositePaper(targetCanvas:any, paperSize:any, paperName:any, paperImg:any, thumbnailCanvas:any, white100Canvas:any){
    const width = paperSize? paperSize.width : thumbnailCanvas.width
    const height = paperSize? paperSize.height : thumbnailCanvas.height
    const left = paperSize? Math.abs(paperSize.left) : 0
    const top = paperSize? Math.abs(paperSize.top) : 0

    targetCanvas.width = width
    targetCanvas.height = height

    const origin:any = this.newCanvas(width, height)
    const thumbImage:any = this.newCanvas(width, height)
    thumbImage.ctx.fillStyle = "rgba(255,255,255,255)" // IE의 경우 배경을 깔아주지 않으면 검정색이 기본으로 깔린다.
    thumbImage.ctx.fillRect(0,0,width,height);

    thumbImage.ctx.drawImage(thumbnailCanvas, left, top, width, height)

    if(paperName === 'fullDraw'){
      origin.ctx.drawImage(paperImg, 0, 0, width, height)

    }else{
      const imgSize = Math.max(width, height)
      origin.ctx.drawImage(paperImg, 0, 0, imgSize, imgSize)
    }

    if(white100Canvas){
      this.alphaBinarizationColor(white100Canvas, 255, 255, 255)
      origin.ctx.drawImage(white100Canvas, 0, 0)
    }

    if(paperName !== ''){
      // if(GV.UA.isIE){
      //   const imageColor = thumbImage.ctx.getImageData(0, 0, width, height)
      //   const paperColor = origin.ctx.getImageData(0, 0, width, height)
      //   const multiplyData = this.multiply(imageColor, paperColor)
      //   origin.ctx.putImageData(multiplyData, 0, 0)
      //
      // }else{
        origin.ctx.globalCompositeOperation = 'multiply'
        origin.ctx.drawImage(thumbImage.canvas, 0, 0)
      // }

    }else{
      origin.ctx.drawImage(thumbImage.canvas, 0, 0)
    }

    const ctx = targetCanvas.getContext('2d')
    ctx.drawImage(origin.canvas, 0, 0)
  }
  // 마스크 까지 씌워서 화면 표현
  compositePaperWithMask(targetCanvas:any, paperSize:any, paperName:any, paperImg:any, thumbnailCanvas:any, whiteCanvas:any, maskImg:any){
    const width = thumbnailCanvas.width
    const height = thumbnailCanvas.height
    this.compositePaper(targetCanvas, paperSize, paperName, paperImg, thumbnailCanvas, whiteCanvas)
    const ctx = targetCanvas.getContext('2d')
    ctx.save()
    ctx.globalCompositeOperation = "destination-out"
    ctx.drawImage(maskImg ,0 ,0, width, height)
    ctx.restore()
  }

  compositeEffect (targetCanvas:any, effectName:any, effectImg:any, effectBackgroundImg:any, thumbnailCanvas:any, isPattern:boolean=false) {
    const targetCtx = targetCanvas.getContext('2d')
    const width = thumbnailCanvas.width
    const height = thumbnailCanvas.height
    const sc:any = this.newCanvas(width, height)
    const tm:any = this.newCanvas(width, height)
    tm.ctx.drawImage(effectBackgroundImg, 0, 0, width, height)
    tm.ctx.drawImage(thumbnailCanvas, 0, 0, width, height)

    sc.ctx.save()

    if(isPattern){
      const pattern:any = this.newCanvas(effectImg.width, effectImg.height)
      pattern.ctx.drawImage(effectImg, 0, 0)
      sc.ctx.fillStyle = sc.ctx.createPattern(pattern.canvas, 'repeat')
      sc.ctx.fillRect(0,0,width, height)

    } else {
      let imgSize = (width > height) ? width : height
      sc.ctx.drawImage(effectImg, 0, 0, imgSize, imgSize)
    }

    sc.ctx.globalCompositeOperation = effectName
    sc.ctx.drawImage(tm.canvas, 0, 0, width, height)
    sc.ctx.restore()

    targetCtx.drawImage(sc.canvas, 0, 0)
  }

  drawShadow (targetCanvas:any, imageCanvas:any, isInset = false, x=0, y=0){
    const targetCtx = targetCanvas.getContext('2d')
    if(isInset){
      const canvasWidth = targetCanvas.width + 10
      const canvasHeight = targetCanvas.height + 10
      const tmpOutShadow:any = this.newCanvas(canvasWidth, canvasHeight)
      const tmpShadow:any = this.newCanvas(canvasWidth, canvasHeight)

      // 배경 색을 깐다.
      tmpOutShadow.ctx.fillStyle = '#f2f4f7'
      tmpOutShadow.ctx.fillRect(0, 0, canvasWidth, canvasHeight)
      // (배경 색) + 구멍을 뚷는다
      tmpOutShadow.ctx.globalCompositeOperation = 'destination-out'
      tmpOutShadow.ctx.drawImage(imageCanvas, 5, 5)

      // 임시 쉐도우 캔버스에 (배걍 + 구멍) 캔버스를 그리면서 그림자를 생성한다.
      tmpShadow.ctx.shadowColor = '#00000030';
      tmpShadow.ctx.shadowBlur = 5;
      tmpShadow.ctx.shadowOffsetX = 0;
      tmpShadow.ctx.shadowOffsetY = 4;
      tmpShadow.ctx.drawImage(tmpOutShadow.canvas, 0, 0)

      // 타깃에 이미지를 그린다.
      targetCtx.drawImage(imageCanvas, 0, 0)
      // 그위에 그림자를 그린다.
      targetCtx.drawImage(tmpShadow.canvas, -5, -5)
      // (이미지 + 그림자) 에 이미지 만큼 뺀다.
      targetCtx.globalCompositeOperation = 'destination-in'
      targetCtx.drawImage(imageCanvas, 0, 0)

    } else {
      targetCtx.shadowColor = '#00000030';
      targetCtx.shadowBlur = 5;
      targetCtx.shadowOffsetX = 0;
      targetCtx.shadowOffsetY = 4;
      targetCtx.drawImage(imageCanvas, x, y)
    }
  }

  makeDieCutShadow (targetCanvas:any, cutSize:any, canvas:any){
    const sceneWidth = canvas.width
    const sceneHeight = canvas.height
    const tmpCanvas:any = this.newCanvas(sceneWidth, sceneHeight)
    tmpCanvas.ctx.drawImage(canvas, 0, 0)

    this.alphaBinarization(tmpCanvas.canvas)
    this.dilation(tmpCanvas.canvas, cutSize)
    this.findObjectContour(tmpCanvas.canvas)
    this.contourPaintColor(tmpCanvas.canvas)

    const oriCanvas:any = this.newCanvas(sceneWidth, sceneHeight)
    oriCanvas.ctx.drawImage(targetCanvas, 0, 0)
    oriCanvas.ctx.globalCompositeOperation = 'destination-atop'
    oriCanvas.ctx.drawImage(tmpCanvas.canvas, 0, 0)

    // 이미지 박스가 너무 작아서 그림자를 처리하기에 부족해서 +20을 한다.
    targetCanvas.width = sceneWidth + 20
    targetCanvas.height = sceneHeight + 20

    this.drawShadow(targetCanvas, oriCanvas.canvas, false, 10, 10)

  }

  findLabelingArea (canvas:any, labelingData:any) {
    const width = canvas.width
    const height = canvas.height
    let idx:number = 0
    const pos:any = {}

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const labelName:any = labelingData[idx]
        if(labelName !== 0){
          if(pos[labelName] === undefined){
            pos[labelName] = {left: null, right: null, top: null, bottom: null}
          }
          if(pos[labelName].left === null || pos[labelName].left > x){
            pos[labelName].left = x
          }
          if(pos[labelName].right === null || pos[labelName].right < x){
            pos[labelName].right = x
          }
          if(pos[labelName].top === null || pos[labelName].top > y){
            pos[labelName].top = y
          }
          if(pos[labelName].bottom === null || pos[labelName].bottom < y){
            pos[labelName].bottom = y
          }
        }
        idx++
      }
    }
    return pos // 여기서 좌표는 0을 기준으로 하는 좌표다 (이미지 데이터 기준)
  }

  drawLabelingArea (canvas:any, labelingArea:any) {
    const ctx = canvas.getContext('2d')

    for(let i in labelingArea){
      const row = labelingArea[i]
      const x = row.left
      const y = row.top
      const width = row.right - row.left +1
      const height = row.bottom - row.top+1
      ctx.strokeStyle = '#ff206a'
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)
    }
  }

  getLabelingCnt (canvas:any){
    const res = this.labeling(canvas)
    // const res = this.labelingTest(canvas)
    return {
      cnt: res.name - 1, // 이름이 1부터 시작하므로
      data: res.labelingData
    }
  }

  labeling (canvas:any){
    const width = canvas.width
    const binarizationArray = this.binarizationArray
    const total = binarizationArray.length
    const labelingData = new Array(total)

    let name = 1
    let idx = 0

    for(; idx < total; idx++){
      if(binarizationArray[idx] === 0){
        labelingData[idx] = 0

      }else if(binarizationArray[idx] === 1 && labelingData[idx] === undefined){
        const labelingStack = [idx]

        while(labelingStack.length !== 0){
          const point:any = labelingStack.shift()
          labelingData[point] = name

          const checkMask = [ point - width, point -1, point +1, point + width ]
          const maskTotal = checkMask.length

          for(let i = 0; i < maskTotal; i++){
            const dataNum = checkMask[i]
            if(binarizationArray[dataNum] === 1 &&
              labelingData[dataNum] === undefined &&
              !labelingStack.includes(dataNum)){
              labelingStack.push(dataNum)
            }
          }
        }
        name++

      }
    }

    return {labelingData, name}
  }

  labelingTest (canvas:any){
    const width = 5
    const binarizationArray =
      [
        0,0,0,0,0,
        0,1,0,1,0,
        0,1,0,1,0,
        0,0,0,0,0
      ]
    const total = binarizationArray.length
    const labelingData = new Array(total)

    let name = 1
    let idx = 0

    for(; idx < total; idx++){
      if(binarizationArray[idx] === 0){
        labelingData[idx] = 0

      }else if(binarizationArray[idx] === 1 && labelingData[idx] === undefined){
        const labelingStack = [idx]

        while(labelingStack.length !== 0){
          const point:any = labelingStack.shift()
          labelingData[point] = name

          const checkMask = [ point - width, point -1, point +1, point + width ]
          const maskTotal = checkMask.length

          for(let i = 0; i < maskTotal; i++){
            const dataNum = checkMask[i]
            if(binarizationArray[dataNum] === 1 &&
              labelingData[dataNum] === undefined &&
              !labelingStack.includes(dataNum)){
              labelingStack.push(dataNum)
            }
          }
        }
        name++

      }
    }

    return {labelingData, name}
  }

  checkContourOneObject (cutSize:any, blankSizeMM:any, canvas:any, sceneSize:any, imgSize:any){
    // return new Promise((resolve, reject)=>{
    //   const tmpCanvas = this.newCanvas(sceneSize.pixelWidth, sceneSize.pixelHeight)
    //   tmpCanvas.ctx.drawImage(canvas, imgSize.x, imgSize.y, imgSize.width, imgSize.height)
    //
    //   this.alphaBinarization(tmpCanvas.canvas)
    //   this.dilation(tmpCanvas.canvas, cutSize)
    //   const res = this.getLabelingCnt(tmpCanvas.canvas)
    //   const pos = this.findLabelingArea(tmpCanvas.canvas, res.data)
    //   const posData = pos['1']
    //   const posPixelWidth = (posData.right - posData.left)
    //   const posPixelHeight = (posData.bottom - posData.top)
    //
    //   const imgMillimeterWidth =  sceneSize.millimeterWidth * posPixelWidth / sceneSize.pixelWidth
    //   const imgMillimeterHeight = sceneSize.millimeterHeight * posPixelHeight / sceneSize.pixelHeight
    //
    //   const isSmallSize =
    //     imgMillimeterWidth < BASE_FILE.DIE_CUT_MIN_SIZE - blankSizeMM ||
    //     imgMillimeterHeight < BASE_FILE.DIE_CUT_MIN_SIZE - blankSizeMM
    //
    //   if(res.cnt !== 1 || isSmallSize) {
    //     this.drawLabelingArea(tmpCanvas.canvas, pos)
    //
    //     tmpCanvas.canvas.toBlob((blob)=>{
    //       resolve({
    //         status: false,
    //         type: res.cnt !== 1? 'countOver' : 'smallSize',
    //         errorImg: window.URL.createObjectURL(blob)
    //       })
    //     })
    //
    //   }else{
    //     resolve({status: true})
    //   }
    //
    // })
  }

  drawCircle(radius:any, r:any, g:any, b:any) {
    const width = radius*2 + 1
    const tmp:any = this.newCanvas(width, width)
    //const imgData = ctx.createImageData(width, width)
    const imgData = tmp.ctx.getImageData(0,0, width, width)

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        const index = ((x + radius) + (y + radius) * width) * 4
        imgData.data[index]     = r
        imgData.data[index + 1] = g
        imgData.data[index + 2] = b
        imgData.data[index + 3] = 0
        if (Math.round(Math.sqrt(x*x + y*y)) <= radius){
          imgData.data[index + 3] = 255
        }
      }
    }
    tmp.ctx.putImageData(imgData, 0, 0)
    return tmp.canvas
  }

  drawRectangle (width:any, height:any, r:any, g:any, b:any) {
    const tmp:any = this.newCanvas(width, height)
    const imgData = tmp.ctx.getImageData(0,0, width, width)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = ((y * width) + x) * 4
        imgData.data[index]     = r
        imgData.data[index + 1] = g
        imgData.data[index + 2] = b
        if(x === 0 || x === width-1 || y === 0 || y === height-1){
          imgData.data[index + 3] = 255
        } else {
          imgData.data[index + 3] = 0
        }
      }
    }
    tmp.ctx.putImageData(imgData, 0, 0)
    return tmp.canvas
  }

  addStand (helperX:any, helperY:any, helperWidth:any, sceneWidth:any){
    let findLeft = false
    let findRight = false

    let y = helperY

    for(; y >= 0; y--){
      const idxLeft = sceneWidth * y + helperX
      const idxRight = idxLeft + helperWidth - 1
      if(!findLeft){
        if(this.binarizationArray[idxLeft] === 0){
          // @ts-ignore
          this.binarizationArray[idxLeft] = 1
        }else{
          findLeft = true
        }
      }
      if(!findRight){
        if(this.binarizationArray[idxRight] === 0){
          // @ts-ignore
          this.binarizationArray[idxRight] = 1
        }else{
          findRight = true
        }
      }
    }

    const idxLeft = sceneWidth * helperY + helperX
    const idxRight = idxLeft + helperWidth -1

    for(let x = idxLeft; x<= idxRight; x++){
      // @ts-ignore
      this.binarizationArray[x] = 1
    }
  }

}
