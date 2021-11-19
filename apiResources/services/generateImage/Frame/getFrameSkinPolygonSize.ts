export const getFrameSkinPolygonSize = (isFixed: boolean, thick: number, dug: number, widthMM: number, heightMM: number, widthPX: number, heightPX: number) => {
  const mpp = widthPX / widthMM;                    // 1mm 당 몇 px
  const frameThick = isFixed? thick : Math.round(thick * mpp);    // 우드 프레임 두께
  const frameDug = isFixed? dug : Math.round(dug * mpp);        // 사진을 틀에 끼우기 위해 파인 크기
  const addSize = (frameThick - frameDug) * 2;      // 기본 사이즈에 더해줘야하는 프레임 사이즈
  const frameWidth = widthPX + addSize;
  const frameHeight = heightPX + addSize;
  const heightThick = frameHeight-frameThick
  const widthThick = frameWidth-frameThick
  const innerMargin = (frameHeight - heightPX) / 2;

  /* 박스 각 꼭지점 사용
   0              1
    ┏━━━━━OUT━━━━┓
    ┃ \        / ┃
    ┃  ┏━━IN━━┓  ┃
    ┃  ┃      ┃  ┃
    ┃  ┃      ┃  ┃
    ┃  ┗━━━━━━┛  ┃
    ┃ /        \ ┃
    ┗━━━━━━━━━━━━┛
   3              2
   */

  return {
    frameWidth,
    frameHeight,
    innerMargin,
    frameInfo: [
      {
        type: 'top',
        drawPoints: [0, 0, frameWidth, 0, frameWidth, frameThick, 0, frameThick],
        // drawPoints: [0, 0, frameWidth, 0, frameWidth, widthThick, frameThick, frameThick],
        x: 0,
        y: 0,
        width: frameWidth,
        height: frameThick
      },
      {
        type: 'bottom',
        x: 0,
        y: heightThick,
        drawPoints: [0, 0, frameWidth, 0, frameWidth, frameThick, 0, frameThick],
        // drawPoints: [0, frameThick, frameWidth, frameThick, widthThick, 0, frameThick, 0],
        width: frameWidth,
        height: frameThick,
      },
      {
        type: 'right',
        x: widthThick,
        y: 0,
        drawPoints: [frameThick, 0, frameThick, frameHeight, 0, heightThick, 0, frameThick],
        width: frameThick,
        height: frameHeight
      },
      {
        type: 'left',
        x: 0,
        y: 0,
        drawPoints: [0, frameHeight, 0, 0, frameThick, frameThick, frameThick, heightThick],
        width: frameThick,
        height: frameHeight
      }
    ]
  }
}
