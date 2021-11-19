import CommonCode from "apiResources/constants/CommonCode";

// 최대, 최소 크기를 설정한 범위안에 실제 상품이 출력될 사이즈를 구한다.
export const getSizeToTargetImage = (themeInfo: any, productSize: any, originImage: any, paperCode: string) => {
  let inputWidthMM = productSize.displaymmWidth;
  let inputHeightMM = productSize.displaymmHeight;

  const isVertical = inputWidthMM < inputHeightMM;
  const maxMM = themeInfo.maxMM;
  const minMM = themeInfo.minMM;
  let maxPX = themeInfo.maxPX;
  let minPX = themeInfo.minPX;

  // 행잉액자의 경우 끈 때문에 사이즈를 좀더 크게 해야한다
  if(paperCode === CommonCode.FRAME_HANGING){
    inputWidthMM = inputWidthMM * originImage.width / productSize.pixelWidth;
    inputHeightMM = inputHeightMM * originImage.height / productSize.pixelHeight;
  }

  const maxInputSize = Math.max(inputHeightMM, inputWidthMM);
  const minInputSize = Math.min(inputHeightMM, inputWidthMM);
  const sceneMaxPX = Math.round((maxPX - minPX) * (maxInputSize - minMM) / (maxMM - minMM)) + minPX;
  const sceneMinPX = Math.round(sceneMaxPX * minInputSize / maxInputSize);
  const width = isVertical? sceneMinPX : sceneMaxPX;
  const height = isVertical? sceneMaxPX : sceneMinPX;

  return {width, height}
}
