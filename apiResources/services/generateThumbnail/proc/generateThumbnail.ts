import { newCanvas } from 'apiResources/utils/newCanvas';
import { Canvas, CanvasRenderingContext2D } from 'canvas';
import { ObjectType } from 'apiResources/constants/objectType';
import Config from 'apiResources/constants/Config';
import { loadImage } from 'apiResources/utils/loadImage';

const generateThumbnail = async (scene: any, scale: number = 1) => {
  const objects = scene.object;
  const sceneWidth = scene.width * scale;
  const sceneHeight = scene.height * scale;
  const tmp = newCanvas(sceneWidth, sceneHeight);

  for (const object of objects) {
    const objectType = object.type;
    let canvasObject;

    switch (objectType) {
      case ObjectType.background:
        canvasObject = new ObjectCanvasBackground(object, scale, tmp.canvas);
        break;

      case ObjectType.image:
        canvasObject = new ObjectCanvasImage(object, scale, tmp.canvas);
        break;

      default:
        canvasObject = new ObjectNotDraw(object, scale, tmp.canvas);
        break;
    }
    await canvasObject.draw();
  }
  return tmp.canvas;
};

export default generateThumbnail;

class ObjectCanvas {
  object: any;
  canvas: Canvas;
  self: {
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
  };
  ctx: CanvasRenderingContext2D;
  scale: number;

  constructor (object: any, scale: number, canvas: Canvas) {
    this.scale = scale;
    this.object = object;
    this.self = newCanvas(object.width* this.scale, object.height* this.scale);
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  async draw () {
  }

  drawObject (obj: any, target: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, angle: number = 0, alpha: number = 1) {
    let halfWidth = 0, halfHeight = 0, realX = x, realY = y;

    target.save();
    if (angle !== 0) {
      halfWidth = width / 2;
      halfHeight = height / 2;
      target.translate(x + halfWidth, y + halfHeight);
      target.rotate(angle * Math.PI / 180);
      realX = 0;
      realY = 0;
    }

    if (alpha !== 1) target.globalAlpha = alpha;
    target.drawImage(obj, realX - halfWidth, realY - halfHeight, width, height);
    target.restore();
  }
}

class ObjectCanvasBackground extends ObjectCanvas {
  async draw () {
    this.ctx.save();
    this.ctx.globalAlpha = this.object.alpha;
    this.ctx.fillStyle = this.object.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width* this.scale, this.canvas.height* this.scale);
    this.ctx.restore();
  }
}

class ObjectCanvasImage extends ObjectCanvas {
  async draw () {
    const url = Config.DOMAIN_RESOURCE +"/"+ this.object.original.middleImagePath;
    let image = await loadImage(url);
    this.drawInnerImage(image);
  }

  drawInnerImage (image: HTMLImageElement) {
    const innerImage = this.object.innerImage;
    const innerX = innerImage.x * this.scale;
    const innerY = innerImage.y * this.scale;
    const innerWidth = innerImage.width * this.scale;
    const innerHeight = innerImage.height * this.scale;
    this.drawObject(image, this.self.ctx, innerX, innerY, innerWidth, innerHeight, innerImage.angle, innerImage.alpha);

    const { x, y, width, height, angle, alpha } = this.object;
    this.drawObject(this.self.canvas, this.ctx, x* this.scale, y* this.scale, width* this.scale, height* this.scale, angle, alpha);
  }
}

class ObjectNotDraw extends ObjectCanvas {
  async draw () {
  }
}
