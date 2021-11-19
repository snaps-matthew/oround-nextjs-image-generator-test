export const resizeImageFull = (sourceWidth: number, sourceHeight: number, targetWidth: number, targetHeight: number) => {
  let width = 0;
  let height = 0;
  let sourceRatio = sourceWidth / sourceHeight;
  let targetRatio = targetWidth / targetHeight;

  const calImageSize = (isCorrect: boolean) => {
    if (isCorrect) {
      width = targetWidth;
      height = targetWidth * sourceHeight / sourceWidth;

    } else {
      height = targetHeight
      width = targetHeight * sourceWidth / sourceHeight;
    }
  }

  if ((targetRatio > 0 && sourceRatio > 0) ||
    (targetRatio < 0 && sourceRatio < 0)) {  // 같은 방향의 경우
    calImageSize(targetRatio < sourceRatio)

  } else {  // 다른 방향의 경우 (긴변 기준으로 정렬)
    calImageSize(sourceRatio > 0)
  }

  return {
    width,
    height,
    left: (targetWidth - width) / 2,
    top: (targetHeight - height) / 2,
  }
}


