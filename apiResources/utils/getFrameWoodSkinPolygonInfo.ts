import ProductCode from 'apiResources/constants/ProductCode';

export const getFrameWoodSkinPolygonInfo = ( sizeInfo:any, productCode:string)=> {
  // const sceneType = selectedScene.get('@type')
  // const sceneSubType = selectedScene.get('@subType')
  // const sizeInfo = GV.product.sizeInfoList[sceneType + sceneSubType]
  let pageWidthPixel = sizeInfo? sizeInfo.horizontalSizePx : 0
  let pageHeightPixel = sizeInfo? sizeInfo.verticalSizePx : 0
  let pageWidthMm = sizeInfo? sizeInfo.horizontalSizeMm : 0

  let frameThick = 0;
  let frameDug = 0;
  if(productCode === ProductCode.FRAME_WOOD){
    frameThick = 15      // 원목액자 프레임 두께
    frameDug = 8        // 원목액자 안으로 파고 들어간 크기 5가 실제 크기지만 생산 고려 여유값을 준다.
  }else if(productCode === ProductCode.FRAME_ALUMINIUM){
    frameThick = 7      // 알루미늄 프레임 두께
    frameDug = 7        // 알루미늄 안으로 파고 들어간 크기 5가 실제 크기지만 생산 고려 여유값을 준다.
  }
  const scaledWidth  = Number(pageWidthPixel);
  const scaledHeight = Number(pageHeightPixel);
  const ratio = scaledWidth / Number(pageWidthMm); // 1mm 당 몇 px
  const frameThickPx = frameThick * ratio;   // 우드 프레임 두께
  const frameDugPx = frameDug * ratio;       // 사진을 틀에 끼우기 위해 파인 크기
  const addSize = (frameThickPx - frameDugPx) * 2;                // 기본 사이즈에 더해줘야하는 프레임 사이즈

  const frameWidth = scaledWidth + addSize;
  const frameHeight = scaledHeight + addSize;
  const topMargin = (frameHeight - scaledHeight) / 2;
  const leftMargin = (frameWidth - scaledWidth) / 2;
  const innerBoxTopMargin = topMargin + frameDugPx;
  const outBoxTopMargin = topMargin - frameDugPx;
  const innerBoxWidth = scaledWidth - (frameDugPx * 2) + 2; // UI상 얀간 밖으로 빼깅 위해 임의로 2를 더한다.
  const innerBoxHeight = scaledHeight - (frameDugPx * 2) + 2; // UI상 얀간 밖으로 빼깅 위해 임의로 2를 더한다.
  const outBoxWidth = scaledWidth + (frameDugPx * 2) + 2; // UI상 얀간 밖으로 빼깅 위해 임의로 2를 더한다.
  const outBoxHeight = scaledHeight + (frameDugPx * 2) + 2; // UI상 얀간 밖으로 빼깅 위해 임의로 2를 더한다.


  /* 배열에 들어 있는 순서
   0           1
   ┏━━━━OUT━━━┓
   ┃━┏━━IN━━┓━┃
   ┃ ┃      ┃ MID
   ┃ ┃      ┃ ┃
   ┃━┗━━━━━━┛━┃
   ┗━━━━━━━━━━┛
   3           2
   */

  return {
    OUT: [
      {X: 0, Y: 0},
      {X: frameWidth, Y: 0},
      {X: frameWidth, Y: frameHeight},
      {X: 0, Y: frameHeight}
    ],

    MID: [
      {X: 0, Y: frameThickPx},
      {X: frameWidth, Y: frameThickPx},
      {X: frameWidth, Y: frameHeight-frameThickPx},
      {X: 0, Y: frameHeight-frameThickPx}
    ],

    IN: [
      {X: frameThickPx, Y: frameThickPx},
      {X: frameWidth-frameThickPx, Y: frameThickPx},
      {X: frameWidth-frameThickPx, Y: frameHeight-frameThickPx},
      {X: frameThickPx, Y: frameHeight-frameThickPx}
    ],
    scaledWidth,
    scaledHeight,
    frameWidth,
    frameHeight,
    topMargin,
    leftMargin,
    frameThickPx,
    innerBoxWidth,
    innerBoxHeight,
    outBoxWidth,
    outBoxHeight,
    innerBoxTopMargin,
    outBoxTopMargin
  };
};
