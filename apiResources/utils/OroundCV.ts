// import UAParser from 'ua-parser-js';
import { newCanvas } from 'apiResources/utils/newCanvas';
// const uaParser = new UAParser();
// const result = uaParser.getResult();
// const isIE = result.browser.name === 'IE';

export class OroundCV {
  binarizationArray: number[];
  cutLineLength: number;
  labelingData: number[];

  constructor () {
    this.binarizationArray = [];
    this.cutLineLength = 0;
    this.labelingData = [];
  }

  multiply (pixels1: ImageData, pixels2: ImageData) {
    let data = pixels1.data, i = 0, total = data.length;
    const data2 = pixels2.data;

    for (; i < total; i += 4) {
      data[i] = data2[i] * data[i] / 255;
      data[i + 1] = data2[i + 1] * data[i + 1] / 255;
      data[i + 2] = data2[i + 2] * data[i + 2] / 255;
      data[i + 3] = data2[i + 3];
    }
    return pixels1;
  }

  alphaBinarizationColor (canvas: any, cr: number, cg: number, cb: number) {
    const ctx: any = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    const dataLength = data.length;

    const r = 0, g = 1, b = 2, a = 3;
    for (let p = 0; p < dataLength; p += 4) {
      if (data[p + a] > 125) {
        data[p + r] = cr;
        data[p + g] = cg;
        data[p + b] = cb;
        data[p + a] = 255;

      } else {
        data[p + r] = 0;
        data[p + g] = 0;
        data[p + b] = 0;
        data[p + a] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  alphaBinarizationCanvas (canvas: any) {
    const ctx: any = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    const dataLength = data.length;

    const r = 0, g = 1, b = 2, a = 3;
    for (let p = 0; p < dataLength; p += 4) {
      if (data[p + a] > 125) {
        data[p + r] = 0;
        data[p + g] = 0;
        data[p + b] = 0;
        data[p + a] = 255;

      } else {
        data[p + r] = 0;
        data[p + g] = 0;
        data[p + b] = 0;
        data[p + a] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  alphaBinarizationOrigin (canvas: any) {
    const ctx: any = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    const dataLength = data.length;

    for (let p = 0; p < dataLength; p += 4) {
      const row = p + 3;
      if (data[row] < 125) data[row] = 0;

    }
    ctx.putImageData(imgData, 0, 0);
  }

  fillColor (canvas: any, width: number, height: number, fillColor: string) {
    const temp = newCanvas(width, height);
    temp.ctx.fillStyle = fillColor;
    temp.ctx.fillRect(0, 0, width, height);
    temp.ctx.globalCompositeOperation = 'destination-atop';
    temp.ctx.drawImage(canvas, 0, 0);
    return temp.canvas;
  }

  alphaBinarization (canvas: any) {
    const ctx: any = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    const dataLength = data.length;
    const binarizationArray = this.binarizationArray;
    let i = 0;
    let p = 0;

    for (; p < dataLength; p += 4, i++) {
      if (data[p + 3] > 125) {
        binarizationArray[i] = 1;

      } else {
        binarizationArray[i] = 0;
      }
    }
  }

  erosion (canvas: any, mask: number) {
    this.dilation(canvas, mask, false);
  }

  dilation (canvas: any, mask: number, isDilate = true) {
    const width = canvas.width;
    const binarizationArray = this.binarizationArray;
    const total = binarizationArray.length;
    let dilateData = binarizationArray.slice(0);

    let idx = 0;
    const checkFourCardinalPoint = this.checkFourCardinalPoint;
    const drawPoints = this.getMask(mask, isDilate);

    for (; idx < total; idx++) {
      if (binarizationArray[idx] === 1) {
        const check = checkFourCardinalPoint(width, idx, binarizationArray);
        if (check) {
          let num = 0;
          const total = drawPoints.length;
          for (; num < total; num++) {
            const point = idx + (drawPoints[num][0]) + (drawPoints[num][1] * width);
            dilateData[point] = isDilate ? 1 : 0;
          }
        }
      }
    }
    this.binarizationArray = dilateData;
  }

  checkFourCardinalPoint (width: number, idx: number, binarizationArray: any) {
    const checkArray = [idx - width, idx - 1, idx + 1, idx + width];
    let num = 0;
    const total = checkArray.length;
    for (; num < total; num++) {
      if (binarizationArray[checkArray[num]] === 0) {
        return true;
      }
    }
    return false;
  }

  getMask (radius: number, isDilate: boolean) {
    const arr = [];

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        if (isDilate) {
          if (Math.round(Math.sqrt(x * x + y * y)) === radius) {
            arr.push([x, y]);
          }
        } else {
          if (Math.round(Math.sqrt(x * x + y * y)) <= radius) {
            arr.push([x, y]);
          }
        }
      }
    }
    return arr;
  }

  findObjectContour (canvas: any) {
    const binarizationArray = this.binarizationArray;
    const binarizationSize = binarizationArray.length;
    const rowSize = canvas.width;
    const labelingStack = [0];
    this.labelingData = new Array(binarizationSize);

    while (labelingStack.length !== 0) {
      const point: any = labelingStack.shift();
      const checkMask = [point - rowSize, point + rowSize, point - 1, point + 1];
      const maskTotal = checkMask.length;

      let i = 0;
      for (; i < maskTotal; i++) {
        const dataNum = checkMask[i];
        if (binarizationArray[dataNum] === 0) {
          if (this.labelingData[dataNum] !== 1) {
            this.labelingData[dataNum] = 1;
            labelingStack.push(dataNum);
          }
        } else if (binarizationArray[dataNum] === 1) {
          if (this.labelingData[dataNum] !== 2) {
            this.labelingData[dataNum] = 2;
          }
        }
      }
    }
  }

  invertFrontBackColor (canvas: any) {
    const labelingSize = this.labelingData.length;
    const ctx: any = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    const r = 0, g = 1, b = 2, a = 3;
    let i = 0, p = 0;
    this.cutLineLength = 0;
    for (; i < labelingSize; i++, p += 4) {
      if (this.labelingData[i] === 2) {
        data[p + r] = 255;
        data[p + g] = 0;
        data[p + b] = 255;
        data[p + a] = 255;
        this.cutLineLength++;
      } else {
        data[p + r] = 255;
        data[p + g] = 255;
        data[p + b] = 255;
        data[p + a] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  contourPaintColor (canvas: any) {
    const labelingSize = this.labelingData.length;
    const ctx: any = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    const r = 0, g = 1, b = 2, a = 3;
    let i = 0, p = 0;
    for (; i < labelingSize; i++, p += 4) {
      if (this.labelingData[i] === 2 || this.labelingData[i] === 1) {
        data[p + r] = 0;
        data[p + g] = 0;
        data[p + b] = 0;
        data[p + a] = 0;

      } else {
        data[p + r] = 255;
        data[p + g] = 255;
        data[p + b] = 255;
        data[p + a] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  extendCanvas (maskSize: number, canvas: any) {
    const newWidth = canvas.width + maskSize;
    const newHeight = canvas.height + maskSize;
    const tmp = newCanvas(newWidth, newHeight);
    const halfMaskSize = maskSize / 2;
    tmp.ctx.drawImage(canvas, halfMaskSize, halfMaskSize);
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx: any = canvas.getContext('2d');
    ctx.drawImage(tmp.canvas, 0, 0);
  }

  clearCanvas (targetCanvas: any) {
    const ctx: any = targetCanvas.getContext('2d');
    ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  }

  compositePaper (
    targetCanvas: any,
    paperSize: any,
    paperName: string,
    paperImg: any,
    thumbnailCanvas: any,
    white100Canvas: any
  ) {
    const width = paperSize ? paperSize.width : thumbnailCanvas.width;
    const height = paperSize ? paperSize.height : thumbnailCanvas.height;
    const left = paperSize ? Math.abs(paperSize.left) : 0;
    const top = paperSize ? Math.abs(paperSize.top) : 0;

    targetCanvas.width = width;
    targetCanvas.height = height;

    const origin = newCanvas(width, height);
    const thumbImage = newCanvas(width, height);
    thumbImage.ctx.fillStyle = 'rgba(255,255,255,255)'; // IE의 경우 배경을 깔아주지 않으면 검정색이 기본으로 깔린다.
    thumbImage.ctx.fillRect(0, 0, width, height);

    thumbImage.ctx.drawImage(thumbnailCanvas, left, top, width, height);

    if (paperName === 'fullDraw') {
      origin.ctx.drawImage(paperImg, 0, 0, width, height);

    } else {
      const imgSize = Math.max(width, height);
      origin.ctx.drawImage(paperImg, 0, 0, imgSize, imgSize);
    }

    if (white100Canvas) {
      this.alphaBinarizationColor(white100Canvas, 255, 255, 255);
      origin.ctx.drawImage(white100Canvas, 0, 0);
    }

    if (paperName !== '') {
      // if (isIE) {
      //   const imageColor = thumbImage.ctx.getImageData(0, 0, width, height);
      //   const paperColor = origin.ctx.getImageData(0, 0, width, height);
      //   const multiplyData = this.multiply(imageColor, paperColor);
      //   origin.ctx.putImageData(multiplyData, 0, 0);
      //
      // } else {
      origin.ctx.globalCompositeOperation = 'multiply';
      origin.ctx.drawImage(thumbImage.canvas, 0, 0);
      // }

    } else {
      origin.ctx.drawImage(thumbImage.canvas, 0, 0);
    }

    const ctx: any = targetCanvas.getContext('2d');
    ctx.drawImage(origin.canvas, 0, 0);
  }

  // 마스크 까지 씌워서 화면 표현
  compositePaperWithMask (
    targetCanvas: any,
    paperSize: string,
    paperName: string,
    paperImg: any,
    thumbnailCanvas: any,
    whiteCanvas: any,
    maskImg: any
  ) {
    const width = thumbnailCanvas.width;
    const height = thumbnailCanvas.height;
    this.compositePaper(targetCanvas, paperSize, paperName, paperImg, thumbnailCanvas, whiteCanvas);
    const ctx: any = targetCanvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(maskImg, 0, 0, width, height);
    ctx.restore();
  }

  compositeEffect (
    targetCanvas: any,
    effectName: string,
    effectImg: any,
    effectBackgroundImg: any,
    thumbnailCanvas: any,
    isPattern = false
  ) {
    const targetCtx: any = targetCanvas.getContext('2d');
    const width = thumbnailCanvas.width;
    const height = thumbnailCanvas.height;
    const sc:any = newCanvas(width, height);
    const tm = newCanvas(width, height);
    tm.ctx.drawImage(effectBackgroundImg, 0, 0, width, height);
    tm.ctx.drawImage(thumbnailCanvas, 0, 0, width, height);

    sc.ctx.save();
    if (isPattern) {
      const pattern = newCanvas(effectImg.width, effectImg.height);
      pattern.ctx.drawImage(effectImg, 0, 0);
      sc.ctx.fillStyle = sc.ctx.createPattern(pattern.canvas, 'repeat') as CanvasPattern;
      sc.ctx.fillRect(0, 0, width, height);

    } else {
      let imgSize = (width > height) ? width : height;
      sc.ctx.drawImage(effectImg, 0, 0, imgSize, imgSize);
    }

    sc.ctx.globalCompositeOperation = effectName;
    sc.ctx.drawImage(tm.canvas, 0, 0, width, height);
    sc.ctx.restore();

    targetCtx.drawImage(sc.canvas, 0, 0);
  }

  drawShadow (
    imageCanvas: any,
    isInset = false,
    x: number = 0,
    y: number = 0,
    blur: number = 5,
    opacity: number = 30
  ) {
    const result = newCanvas(imageCanvas.width, imageCanvas.height);

    if (isInset) {
      const canvasWidth = imageCanvas.width + 10;
      const canvasHeight = imageCanvas.height + 10;
      const tmpOutShadow = newCanvas(canvasWidth, canvasHeight);
      const tmpShadow = newCanvas(canvasWidth, canvasHeight);

      // 배경 색을 깐다.
      tmpOutShadow.ctx.fillStyle = '#f2f4f7';
      tmpOutShadow.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      // (배경 색) + 구멍을 뚷는다
      tmpOutShadow.ctx.globalCompositeOperation = 'destination-out';
      tmpOutShadow.ctx.drawImage(imageCanvas, 5, 5);

      // 임시 쉐도우 캔버스에 (배걍 + 구멍) 캔버스를 그리면서 그림자를 생성한다.
      tmpShadow.ctx.shadowColor = `#000000${opacity}`;
      tmpShadow.ctx.shadowBlur = blur;
      tmpShadow.ctx.shadowOffsetX = x;
      tmpShadow.ctx.shadowOffsetY = y;
      tmpShadow.ctx.drawImage(tmpOutShadow.canvas, 0, 0);

      // 타깃에 이미지를 그린다.
      result.ctx.drawImage(imageCanvas, 0, 0);
      // 그위에 그림자를 그린다.
      result.ctx.drawImage(tmpShadow.canvas, -5, -5);
      // (이미지 + 그림자) 에 이미지 만큼 뺀다.
      result.ctx.globalCompositeOperation = 'destination-in';
      result.ctx.drawImage(imageCanvas, 0, 0);

    } else {
      result.ctx.save();
      result.ctx.shadowColor = `#000000${opacity}`;
      result.ctx.shadowBlur = blur;
      result.ctx.shadowOffsetX = x;
      result.ctx.shadowOffsetY = y;
      result.ctx.drawImage(imageCanvas, 0, 0);
      result.ctx.restore();
    }

    return result.canvas;
  }

  makeDieCutShadow (
    targetCanvas: any,
    cutSize: number,
    canvas: any
  ) {
    const sceneWidth = canvas.width;
    const sceneHeight = canvas.height;
    const tmpCanvas = newCanvas(sceneWidth, sceneHeight);
    tmpCanvas.ctx.drawImage(canvas, 0, 0);

    this.alphaBinarization(tmpCanvas.canvas);
    this.dilation(tmpCanvas.canvas, cutSize);
    this.findObjectContour(tmpCanvas.canvas);
    this.contourPaintColor(tmpCanvas.canvas);

    const oriCanvas = newCanvas(sceneWidth, sceneHeight);
    oriCanvas.ctx.drawImage(targetCanvas, 0, 0);
    oriCanvas.ctx.globalCompositeOperation = 'destination-atop';
    oriCanvas.ctx.drawImage(tmpCanvas.canvas, 0, 0);

    // 이미지 박스가 너무 작아서 그림자를 처리하기에 부족해서 +20을 한다.
    targetCanvas.width = sceneWidth + 20;
    targetCanvas.height = sceneHeight + 20;

    return this.drawShadow(oriCanvas.canvas, false, 10, 10, 3);
  }

  findLabelingArea (canvas: any, labelingData: any) {
    const width = canvas.width;
    const height = canvas.height;
    let idx = 0;
    const pos: any = {};

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const labelName = labelingData[idx];
        if (labelName !== 0) {
          if (pos[labelName] === undefined) {
            pos[labelName] = { left: null, right: null, top: null, bottom: null };
          }
          if (pos[labelName].left === null || pos[labelName].left > x) {
            pos[labelName].left = x;
          }
          if (pos[labelName].right === null || pos[labelName].right < x) {
            pos[labelName].right = x;
          }
          if (pos[labelName].top === null || pos[labelName].top > y) {
            pos[labelName].top = y;
          }
          if (pos[labelName].bottom === null || pos[labelName].bottom < y) {
            pos[labelName].bottom = y;
          }
        }
        idx++;
      }
    }
    return pos; // 여기서 좌표는 0을 기준으로 하는 좌표다 (이미지 데이터 기준)
  }

  drawLabelingArea (canvas: any, labelingArea: any) {
    const ctx: any = canvas.getContext('2d');

    for (let i in labelingArea) {
      const row = labelingArea[i];
      const x = row.left;
      const y = row.top;
      const width = row.right - row.left + 1;
      const height = row.bottom - row.top + 1;
      ctx.strokeStyle = '#ff206a';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);
    }
  }

  getLabelingCnt (canvas: any) {
    const res = this.labeling(canvas);
    return {
      cnt: res.name - 1, // 이름이 1부터 시작하므로
      data: res.labelingData
    };
  }

  labeling (canvas: any) {
    const width = canvas.width;
    const binarizationArray = this.binarizationArray;
    const total = binarizationArray.length;
    const labelingData = new Array(total);

    let name = 1;
    let idx = 0;

    for (; idx < total; idx++) {
      if (binarizationArray[idx] === 0) {
        labelingData[idx] = 0;

      } else if (binarizationArray[idx] === 1 && labelingData[idx] === undefined) {
        const labelingStack = [idx];

        while (labelingStack.length !== 0) {
          const point: any = labelingStack.shift();
          labelingData[point] = name;

          const checkMask = [point - width, point - 1, point + 1, point + width];
          const maskTotal = checkMask.length;

          for (let i = 0; i < maskTotal; i++) {
            const dataNum = checkMask[i];
            if (binarizationArray[dataNum] === 1 &&
              labelingData[dataNum] === undefined &&
              !labelingStack.includes(dataNum)) {
              labelingStack.push(dataNum);
            }
          }
        }
        name++;

      }
    }

    return { labelingData, name };
  }

  checkContourOneObject (
    cutSize: number,
    blankSizeMM: number,
    canvas: any,
    sceneSize: { pixelWidth: number; pixelHeight: number; millimeterWidth: number; millimeterHeight: number },
    imgSize: { x: number; y: number; width: number; height: number },
    minSize: number
  ) {
    return new Promise((resolve, reject) => {
      const tmpCanvas:any = newCanvas(sceneSize.pixelWidth, sceneSize.pixelHeight);
      tmpCanvas.ctx.drawImage(canvas, imgSize.x, imgSize.y, imgSize.width, imgSize.height);

      this.alphaBinarization(tmpCanvas.canvas);
      this.dilation(tmpCanvas.canvas, cutSize);
      const res = this.getLabelingCnt(tmpCanvas.canvas);
      const pos = this.findLabelingArea(tmpCanvas.canvas, res.data);
      const posData = pos['1'];
      const posPixelWidth = (posData.right - posData.left);
      const posPixelHeight = (posData.bottom - posData.top);

      const imgMillimeterWidth = sceneSize.millimeterWidth * posPixelWidth / sceneSize.pixelWidth;
      const imgMillimeterHeight = sceneSize.millimeterHeight * posPixelHeight / sceneSize.pixelHeight;

      const isSmallSize =
        imgMillimeterWidth < minSize - blankSizeMM ||
        imgMillimeterHeight < minSize - blankSizeMM;

      if (res.cnt !== 1 || isSmallSize) {
        this.drawLabelingArea(tmpCanvas.canvas, pos);

        tmpCanvas.canvas.toBlob((blob:any) => {
          resolve({
            status: false,
            type: res.cnt !== 1 ? 'countOver' : 'smallSize',
            errorImg: window.URL.createObjectURL(blob)
          });
        });

      } else {
        resolve({ status: true });
      }

    });
  }

  drawCircle (radius: number, r: number, g: number, b: number) {
    const width = radius * 2 + 1;
    const tmp = newCanvas(width, width);
    const imgData = tmp.ctx.getImageData(0, 0, width, width);

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        const index = ((x + radius) + (y + radius) * width) * 4;
        imgData.data[index] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        imgData.data[index + 3] = 0;
        if (Math.round(Math.sqrt(x * x + y * y)) <= radius) {
          imgData.data[index + 3] = 255;
        }
      }
    }
    tmp.ctx.putImageData(imgData, 0, 0);
    return tmp.canvas;
  }

  drawRectangle (width: number, height: number, r: number, g: number, b: number) {
    const tmp = newCanvas(width, height);
    const imgData = tmp.ctx.getImageData(0, 0, width, width);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = ((y * width) + x) * 4;
        imgData.data[index] = r;
        imgData.data[index + 1] = g;
        imgData.data[index + 2] = b;
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          imgData.data[index + 3] = 255;
        } else {
          imgData.data[index + 3] = 0;
        }
      }
    }
    tmp.ctx.putImageData(imgData, 0, 0);
    return tmp.canvas;
  }

  addStand (helperX: number, helperY: number, helperWidth: number, sceneWidth: number) {
    let findLeft = false;
    let findRight = false;

    let y = helperY;

    for (; y >= 0; y--) {
      const idxLeft = sceneWidth * y + helperX;
      const idxRight = idxLeft + helperWidth - 1;
      if (!findLeft) {
        if (this.binarizationArray[idxLeft] === 0) {
          this.binarizationArray[idxLeft] = 1;
        } else {
          findLeft = true;
        }
      }
      if (!findRight) {
        if (this.binarizationArray[idxRight] === 0) {
          this.binarizationArray[idxRight] = 1;
        } else {
          findRight = true;
        }
      }
    }

    const idxLeft = sceneWidth * helperY + helperX;
    const idxRight = idxLeft + helperWidth - 1;

    for (let x = idxLeft; x <= idxRight; x++) {
      this.binarizationArray[x] = 1;
    }
  }
}
