const minSize = 10;                // 10mm
const cutLine = 2;                 // 칼선 2mm
const innerLine = 1;               // 안쪽 칼선 여백
const holeSize = 3;                // hole size 3mm
const padding = 2;                 // 여백 2mm
const buffer = padding + cutLine + holeSize + cutLine;            // 여백 2mm, 링 7(2+3+2)mm // 생산 요청으로 여백수정
const buffer2 = buffer * 2;    // 총여백

export const getKeyringLimitSize = () => {
  return minSize;
}

export const getKeyringPadding = () => {
  return buffer2;
}

export const getKeyringHoleSize = () => {
  return holeSize;
};

export const getKeyringCutLineSize = () => {
  return cutLine;
};

export const getKeyringInnerAreaSize = (ratio: number) => {
  return Math.round((innerLine * ratio) + (getKeyringHoleSize() * ratio / 2));
};

export const getKeyringOuterAreaSize = (ratio: number) => {
  return Math.round((getKeyringCutLineSize() * ratio) + (getKeyringHoleSize() * ratio / 2));
};

export const isMinKeyringSize = (width: number, height: number, ratio: number) => {
  const minSizePx = minSize * ratio;
  return minSizePx > width || minSizePx > height;
};

export const getKeyringClipSizeInfo = (mmWidth: number, mmHeight: number, pxWidth: number) => {
  const ratio = pxWidth / mmWidth;
  const pxSceneWidth = mmWidth * ratio;
  const pxSceneHeight = mmHeight * ratio;
  const width = pxSceneWidth - (buffer2 * ratio);
  const height = pxSceneHeight - (buffer2 * ratio);

  return {
    x: (pxSceneWidth - width) / 2,
    y: (pxSceneHeight - height) / 2,
    width: width,
    height: height
  };
};

export const getInnerImageInfo = (left: number, top: number, width: number, height: number, originWidth: number, originHeight: number, clipSize: any) => {
  const ratio = clipSize.width / width;
  return {
    x: -left * ratio,
    y: -top * ratio,
    width: originWidth * ratio,
    height: originHeight * ratio,
  }
}
