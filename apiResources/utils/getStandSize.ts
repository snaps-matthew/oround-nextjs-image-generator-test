const minSize = 20;                // 10mm
const mmStickWith = 14;        // 고정대 넓이 14mm
const mmStickHeight = 3;       // 고정대 두께 3mm
const mmHelperWith = 20;       // 지지대 넓이 20mm (최소 프린트 사이즈)
// const mmHelperHeight = 1;      // 지지대 높이 1mm
const cutLine = 2;             // 칼선 2mm
const padding = 2;
const buffer = padding + cutLine;  // 여백 3mm
const buffer2 = buffer * 2; // 총여백

export const getStandCutLineSize = () => {
  return cutLine;
};

export const getStandLimitSize = () => {
  return minSize;
};

export const getStandPadding = () => {
  return buffer2;
}

export const getStandHelperWidth = () => {
  return mmHelperWith;
};

export const getStandStickSize = () => {
  return {
    width: mmStickWith,
    height: mmStickHeight
  };
};

export const isMinStandSize = (width: number, height: number) => {
  const minSizePx = mmHelperWith;
  return minSizePx > width || minSizePx > height;
};

export const getStandClipSizeInfo = (mmWidth: number, mmHeight: number, pxWidth: number) => {
  // 스탠드 특성상 높이가 합해져 있다.
  const ratio = pxWidth / mmWidth;
  const pxSceneWidth = mmWidth * ratio;
  const pxSceneHeight = mmHeight * ratio;
  const pxStickHeight = mmStickHeight * ratio;
  const width = pxSceneWidth - (buffer2 * ratio);
  const height = pxSceneHeight - pxStickHeight - (buffer2 * ratio);
  const margin = (pxSceneWidth - width) / 2;
  // 주의 x, y 좌표가 같으므로 같은 수치를 쓴다. (높이는 stick 를 합한 수치므로 주의)
  return {
    x: margin,
    y: margin,
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
