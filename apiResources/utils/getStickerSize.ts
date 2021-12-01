const minSize = 30;                // 30mm
const cutLine = 2;                 // 칼선 2mm
const padding = 2;                 // 여백 2mm
const buffer = padding + cutLine;  // 여백 + 칼선 = 4mm
const buffer2 = buffer * 2;        // 총여백

export const getStickerLimitSize = () => {
  return minSize;
}

export const getStickerPadding = () => {
  return buffer2;
}

export const getStickerCutLineSize = () => {
  return cutLine;
};

export const isMinStickerSize = (width: number, height: number, ratio: number) => {
  const minSizePx = minSize * ratio;
  return minSizePx > width || minSizePx > height;
};

export const getStickerClipSizeInfo = (mmWidth: number, mmHeight: number, pxWidth: number) => {
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
    height: originHeight * ratio
  };
};
