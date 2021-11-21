import { TYPE } from 'apiResources/constants/type'
import { getImagePath, getResourceIdUrl } from 'apiResources/constants/resourcePath'
import {createCanvas} from "canvas";
import {loadImage} from "../../../utils/loadImage";
import {newCanvas} from "../../../utils/newCanvas";
import { SnapsCV } from 'apiResources/utils/SnapsCV'
// 기본 썸네일 만드는 함수
export const generateThumbnail = async (scene:any, isImageMaskPrint:boolean = false, scale:number=1) => {
  const sceneWidth = scene.width * scale
  const sceneHeight = scene.height * scale

  const canvas = createCanvas(sceneWidth,sceneHeight)
  canvas.width = sceneWidth
  canvas.height = sceneHeight
  for (const obj of scene.object) {
     await createObject(obj, canvas, isImageMaskPrint, scale)
  }
  return canvas
}

const createObject = async (object:any, canvas:any, isImageMaskPrint:boolean, scale:number) => {
  const ctx = canvas.getContext('2d');
  const objectType = object.type
  let canvasObject:ObjectCanvas;
  switch (objectType) {

    case TYPE.OBJECT_IMAGE:
      canvasObject = new ObjectCanvasImage(object)
      break

    case TYPE.OBJECT_FORM_IMAGE:
    case TYPE.OBJECT_STICKER:
      canvasObject = new ObjectCanvasSticker(object)
      break

    case TYPE.OBJECT_TEXT:
      canvasObject = new ObjectCanvasText(object)
      break

    case TYPE.OBJECT_HOLE:
    case TYPE.OBJECT_GRID_TABLE:
    case TYPE.OBJECT_SCENE_MASK:
      canvasObject = new ObjectCanvas(object)
      break

    default:
      canvasObject = new ObjectCanvas(object)
      break
  }
  canvasObject.init(canvas, ctx, isImageMaskPrint, scale);
  await canvasObject.draw();
}

export class ObjectCanvas {
  protected object: any;
  protected canvas: any;
  protected ctx: any;
  protected isImageMaskPrint: any;
  protected scale: any;

  constructor (object: any) {
    this.object = object
    this.canvas = null
    this.ctx = null
    this.isImageMaskPrint = null
  }
  draw () {}
  init (canvas: any, ctx: any, isImageMaskPrint: any, scale: any) {
    this.canvas = canvas
    this.ctx = ctx
    this.isImageMaskPrint = isImageMaskPrint
    this.scale = scale
  }
  drawObject (obj: any, canvas: any, x:number, y:number, width:number, height:number, angle:number = 0, alpha:number = 1) {
    let type = (typeof obj === 'string') ? 'color' : 'image'
    const ctx = canvas.getContext('2d')
    let halfWidth = 0, halfHeight = 0, realX = x, realY = y

    ctx.save()
    if (angle !== 0) {
      halfWidth = width / 2
      halfHeight = height / 2
      ctx.translate(x + halfWidth, y + halfHeight)
      ctx.rotate(angle * Math.PI / 180)
      realX = 0
      realY = 0
    }

    if (alpha !== 1) ctx.globalAlpha = alpha
    if (type === 'color') {
      ctx.fillStyle = obj
      ctx.fillRect(realX - halfWidth, realY - halfHeight, width, height)
    } else {
      ctx.drawImage(obj, realX - halfWidth, realY - halfHeight, width, height)
    }
    ctx.restore()
  }
  drawClear (canvas:any) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  drawAlpha (alpha:any, canvas:any) {
    const width = canvas.width
    const height = canvas.height
    const temp:any = this.newCanvas(width, height)

    temp.ctx.drawImage(canvas, 0, 0, width, height)

    const ctx = canvas.getContext('2d')
    ctx.save()
    this.drawClear(canvas)
    ctx.globalAlpha = alpha
    ctx.drawImage(temp.canvas, 0, 0, width, height)
    ctx.restore()
  }
  newCanvas (width:number, height:number) {
    const canvas = createCanvas(width,height)
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    return {canvas, ctx}
  }
  getObjectInfo () {
    return {
      x: this.object.x * this.scale,
      y: this.object.y * this.scale,
      width: this.object.width * this.scale,
      height: this.object.height * this.scale,
      angle: this.object.angle,
      alpha: this.object.alpha
    }
  }
}

class ObjectCanvasBackground extends ObjectCanvas {
  draw () {
    const canvas = this.canvas
    let {x, y, width, height, angle, alpha} = this.getObjectInfo()
    x = x * this.scale
    y = y * this.scale
    width = width * this.scale
    height = height * this.scale
    this.drawObject(this.object.bgColor, canvas, x, y, width, height, angle, alpha);
  }
}
class ObjectCanvasSticker extends ObjectCanvas {
  async draw () {
    const canvas = this.canvas
    const {x, y, width, height, angle, alpha} = this.getObjectInfo()
    const url:any = getImagePath(this.object, true)
    let image:any = await loadImage(url)
    if(this.object['fillColor']){
      const snapsCV = new SnapsCV()
      image = snapsCV.fillColor(image, image.width, image.height, this.object['fillColor'])
    }
    this.drawObject(image, canvas, x, y, width, height, angle, alpha)
  }
}


class ObjectCanvasText extends ObjectCanvas {
  async draw () {
    const canvas = this.canvas
    const {x, y, width, angle, alpha} = this.getObjectInfo()

    const url:any = getImagePath(this.object, false)
    const image:any = await loadImage(url)
    const textHeight = width * image.height / image.width  // 택스트는 폰트 서버에서 내려주는 이미지의 크기가 달라지므로 이미지의 비례에 맞추어 크기를 정한다
    this.drawObject(image, canvas, x, y, width, textHeight, angle, alpha)
  }
}

class ObjectCanvasImage extends ObjectCanvas {
  async draw () {
    const canvas = this.canvas
    let {x, y, width, height, angle, alpha} = this.getObjectInfo()
    x = x * this.scale
    y = y * this.scale
    width = width * this.scale
    height = height * this.scale
    const url:any = getImagePath(this.object, true)
    if(this.isImageMaskPrint === false && url === ''){
      return
    }
    const image:any = await loadImage(url)
    await this.drawInnerImage(image)
    this.drawObject(image, canvas, x, y, width, height, angle, alpha)
  }

  async drawInnerImage (image:any) {
    let {width, height} = this.getObjectInfo()
    width = width  * this.scale
    height = height  * this.scale
    // const border = this.object.border
    const img = this.object.innerImage
    const innerX = img.x * this.scale
    const innerY = img.y * this.scale
    const innerWidth = img.width * this.scale
    const innerHeight = img.height * this.scale
    const innerAlpha = img.alpha
    const innerAngle = img.angle

    const temp = this.newCanvas(width, height)

    if(image === null){
      temp.ctx.save()
      temp.ctx.fillStyle = '#dddddd'
      temp.ctx.fillRect(0, 0, width, height)
      temp.ctx.restore()
    }else{
      this.drawObject(image, temp.canvas, innerX, innerY, innerWidth, innerHeight, innerAngle, innerAlpha)
    }
    return temp.canvas
  }
}

