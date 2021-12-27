import { newCanvas } from 'apiResources/utils/newCanvas'
import { TYPE } from 'apiResources/constants/type';

export const makeMatSkin = (productEditInfo:any, scale:number) => {

  const productCode:string = productEditInfo.productCode
  const sizeInfo = productEditInfo.size[0];
  const pagePXWidth:number = sizeInfo.horizontalSizePx;
  const pageMMWidth:number = sizeInfo.horizontalSizeMm
  const sceneWidth:number = productEditInfo.edit[0].width;
  const sceneHeight:number = productEditInfo.edit[0].height;
  const imageObject = productEditInfo.edit[0].object.find((obj:any) => {
    const type = obj.type
    return type === TYPE.OBJECT_IMAGE
  })

  const objX:number = imageObject.x * scale;
  const objY:number = imageObject.y * scale;
  const objW:number = imageObject.width * scale;
  const objH:number = imageObject.height * scale;
  const MAT_CUTTING_PADDING = 2;     // 메트의 잘리는 영역 2mm
  const pageMillimeterPerPixel = pagePXWidth / pageMMWidth;      // page
  const matMargin = (MAT_CUTTING_PADDING * pageMillimeterPerPixel);
  const matPadding = matMargin * 2 * scale;
  const matThickness = matMargin * 1 * scale; // 1mm
  const width = sceneWidth  * scale;
  const height = sceneHeight * scale;
  const mat = newCanvas(width, height);

  // const {IN, innerBoxTopMargin} = getFrameWoodSkinPolygonInfo( sizeInfo, productCode);
  // const frameMargin = innerBoxTopMargin/2
  // let isMat = true
  //   if(
  //     isMat && (
  //       IN[0].X-frameMargin > imageObject.x ||
  //       IN[0].Y-frameMargin > imageObject.y ||
  //       IN[2].X-frameMargin < imageObject.x+imageObject.width ||
  //       IN[2].Y-frameMargin < imageObject.y+imageObject.height
  //     )
  //   ){
  //     isMat = false
  //   }
  // if(!isMat) return mat.canvas;

  mat.ctx.fillStyle = '#ffffff';
  mat.ctx.fillRect(0, 0, width, height);

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

  return mat.canvas
}
