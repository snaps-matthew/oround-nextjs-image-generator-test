import {newCanvas} from "apiResources/utils/newCanvas";

export const canvasRoundRect = (width: number, height: number, radius: number, color: string='#ffffff') => {
  const tmp = newCanvas(width, height);
  const x = 0;
  const y = 0;

  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;

  tmp.ctx.beginPath();
  tmp.ctx.moveTo(x + radius, y);
  tmp.ctx.arcTo(x + width, y, x + width, y + height, radius);
  tmp.ctx.arcTo(x + width, y + height, x, y + height, radius);
  tmp.ctx.arcTo(x, y + height, x, y, radius);
  tmp.ctx.arcTo(x, y, x + width, y, radius);
  tmp.ctx.closePath();

  tmp.ctx.fillStyle = "#ffffff";
  tmp.ctx.fill();

  return tmp.canvas;
}
