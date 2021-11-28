import {createCanvas} from "canvas";

export const newCanvas = (width: number, height: number) => {
  const canvas = createCanvas(width, height)
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  return { canvas, ctx,
    createPNGStream(param: {palette: Uint8ClampedArray; backgroundIndex: number}) {
      
    },
  }
}
