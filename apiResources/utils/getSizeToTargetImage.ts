import CommonCode from "apiResources/constants/CommonCode";

// 최대, 최소 크기를 설정한 범위안에 실제 상품이 출력될 사이즈를 구한다.
export const getSizeToTargetImage:any = (themeInfo: any, directionCode:string, horizontalSizeMm: any, verticalSizeMm: any) => {
  let inputWidthMM = horizontalSizeMm;
  let inputHeightMM = verticalSizeMm;
  // const isVertical = inputWidthMM < inputHeightMM;
  const isVertical = directionCode===CommonCode.DIRECTION_VERTICAL
  const maxMM = themeInfo.maxMM;
  const minMM = themeInfo.minMM;
  let maxPX = themeInfo.maxPX;
  let minPX = themeInfo.minPX;

  const maxInputSize = Math.max(inputHeightMM, inputWidthMM);
  const minInputSize = Math.min(inputHeightMM, inputWidthMM);
  const sceneMaxPX = Math.round((maxPX - minPX) * (maxInputSize - minMM) / (maxMM - minMM)) + minPX;
  const sceneMinPX = Math.round(sceneMaxPX * minInputSize / maxInputSize);
  const sizeToTargetImageWidth = isVertical? sceneMinPX : sceneMaxPX;
  const sizeToTargetImageHeight = isVertical? sceneMaxPX : sceneMinPX;

  return {sizeToTargetImageWidth, sizeToTargetImageHeight}
}
