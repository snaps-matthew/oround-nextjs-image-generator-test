export const getFrameSkinPolygonSize = (
  thick: number,
  dug: number,
  padding: number,
  ratio: number,
  widthPX: number,
  heightPX: number
) => {
  const frameThick = Math.round(thick * ratio);     // 우드 프레임 두께
  const frameDug = Math.round(dug * ratio);         // 사진을 틀에 끼우기 위해 파인 크기
  const framePadding = Math.round(padding * ratio); // 재단영역
  const innerMargin = frameThick - frameDug - framePadding;    // 기본 사이즈에 더해줘야하는 프레임 사이즈
  const addSize = innerMargin * 2;
  const frameWidth = widthPX + addSize;
  const frameHeight = heightPX + addSize;
  const heightThick = frameHeight - frameThick;
  const widthThick = frameWidth - frameThick;

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
    frameThick,
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
        height: frameThick
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
  };
};
