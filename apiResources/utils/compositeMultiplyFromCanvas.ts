import {newCanvas} from "apiResources/utils/newCanvas";

// multiply 합성
export const compositeMultiplyFromCanvas = (target: any, sourceImage: any) => {
  const width = target.width;
  const height = target.height;
  const source = newCanvas(width, height);
  source.ctx.save();
  source.ctx.drawImage(sourceImage, 0, 0, width, height);
  source.ctx.globalCompositeOperation = "multiply";
  source.ctx.drawImage(target, 0, 0);
  source.ctx.restore();
  return source.canvas;
}
