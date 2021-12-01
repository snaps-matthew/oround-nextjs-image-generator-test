import {newCanvas} from "apiResources/utils/newCanvas";

// 모든 탬플릿 이미지는 여백을 포함하고 있어 템플릿 이미지에서 여백을 제거하고 실제품과 같은 사이즈로 이미지를 만든다.
export const removeCuttingLine = (thumbnailCanvas: any, offset: number) => {
  const totalOffset = offset * 2;
  const newWidth = Math.round(thumbnailCanvas.width - totalOffset);
  const newHeight = Math.round(thumbnailCanvas.height - totalOffset);
  const temp = newCanvas(newWidth, newHeight);
  temp.ctx.drawImage(thumbnailCanvas, -offset, -offset);
  return temp.canvas;
}
