import { newCanvas } from 'apiResources/utils/newCanvas';

export const drawFrame = (frameCtx: CanvasRenderingContext2D, skinImg: any, item: any): void => {
  const pattern = newCanvas(item.width, item.height);
  const isHorizontal = item.width > item.height;
  const imgHeight = isHorizontal ? item.height : item.height * skinImg.width / item.width;
  const imgWidth = isHorizontal ? item.width * skinImg.height / item.height : item.width;
  pattern.ctx.drawImage(skinImg, 0, 0, imgWidth, imgHeight);

  const temp:any = newCanvas(item.width, item.height);

  temp.ctx.fillStyle = pattern.ctx.createPattern(pattern.canvas, 'repeat') as CanvasPattern;
  temp.ctx.beginPath();
  temp.ctx.moveTo(item.drawPoints[0], item.drawPoints[1]);
  temp.ctx.lineTo(item.drawPoints[2], item.drawPoints[3]);
  temp.ctx.lineTo(item.drawPoints[4], item.drawPoints[5]);
  temp.ctx.lineTo(item.drawPoints[6], item.drawPoints[7]);
  temp.ctx.closePath();
  // temp.ctx.globalAlpha = 0.3;
  temp.ctx.fill();

  frameCtx.drawImage(temp.canvas, item.x, item.y);
};
