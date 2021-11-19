import { getPageMillimeterPerPixel } from 'apiResources/utils/getCoverMillimeterPerPixel'
import { newCanvas } from 'apiResources/utils/newCanvas'
import { getFrameWoodSkinPolygonInfo } from 'apiResources/utils/getFrameWoodSkinPolygonInfo'

export const makeMatSkin = (selectedScene:any, sizeInfo:any, paperCode:string, scale:number=1) => {
  const MAT_CUTTING_PADDING = 2;     // 메트의 잘리는 영역 2mm
  const {pageMillimeterPerPixel} = getPageMillimeterPerPixel(selectedScene);
  const matMargin = (MAT_CUTTING_PADDING * pageMillimeterPerPixel);
  const matPadding = matMargin * 2 * scale;
  const matThickness = matMargin * 1 * scale; // 1mm
  const width = selectedScene.get('@width') * scale;
  const height = selectedScene.get('@height') * scale;
  const mat = newCanvas(width, height);
  const images = selectedScene.get('object').filter((obj:{get:any})=> obj.get('@type') === 'image');

  const {IN, innerBoxTopMargin} = getFrameWoodSkinPolygonInfo('=-= CATEGORY CODE =-=',sizeInfo, paperCode);
  const frameMargin = innerBoxTopMargin/2
  let isMat = true
  images.forEach((obj:{get:any;}) => {
    const objW = Number(obj.get('@width'))
    const objH = Number(obj.get('@height'))
    const objX = Number(obj.get('@x'))
    const objY = Number(obj.get('@y'))
    if(
      isMat && (
        IN[0].X-frameMargin > objX ||
        IN[0].Y-frameMargin > objY ||
        IN[2].X-frameMargin < objX+objW ||
        IN[2].Y-frameMargin < objY+objH
      )
    ){
      isMat = false
    }
  });
  if(!isMat) return mat.canvas;

  mat.ctx.fillStyle = '#ffffff';
  mat.ctx.fillRect(0, 0, width, height);

  images.forEach((obj:{get:any}) => {
    const objW = obj.get('@width') * scale;
    const objH = obj.get('@height') * scale;
    const objX = obj.get('@x') * scale;
    const objY = obj.get('@y') * scale;
    mat.ctx.clearRect(objX + (matMargin * scale), objY + (matMargin * scale), objW - matPadding, objH - matPadding);

    const border = [
      { color: '#e0e0e0', pos: [objX, objY,objX+objW, objY, objX+objW-matThickness, objY+matThickness, objX+matThickness, objY+matThickness]},
      { color: '#f1f1f1', pos: [objX+objW, objY, objX+objW, objY+objH, objX+objW-matThickness, objY+objH-matThickness, objX+objW-matThickness, objY+matThickness]},
      { color: '#ececec', pos: [objX+objW, objY+objH, objX , objY+objH, objX+matThickness, objY+objH-matThickness, objX+objW-matThickness, objY+objH-matThickness]},
      { color: '#d8d8d8', pos: [objX, objY+objH, objX, objY, objX+matThickness, objY+matThickness, objX+matThickness, objY+objH-matThickness]}
    ];

    border.forEach(item => {
      mat.ctx.beginPath();
      mat.ctx.moveTo(item.pos[0], item.pos[1]);
      mat.ctx.lineTo(item.pos[2], item.pos[3]);
      mat.ctx.lineTo(item.pos[4], item.pos[5]);
      mat.ctx.lineTo(item.pos[6], item.pos[7]);
      mat.ctx.closePath();
      mat.ctx.fillStyle=item.color;
      mat.ctx.fill();
    })
    return obj
  });

  return mat.canvas
}
