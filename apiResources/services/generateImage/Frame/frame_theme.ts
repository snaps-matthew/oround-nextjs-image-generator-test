// 메탈, 캔버스 아크릴, 포스터 대형사진인화, 폼맥스 보드
import { resolve } from 'path';

export default {
  "1010030001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 451,
    minPX: 160,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/metal-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 500, //Math.floor(451/2+275)
        y: 357, //Math.floor(451/2+132)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 3,
        shadowOffsetY: 2
      },
    ]
  },
  "1010040001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 513,
    minPX: 182,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/canvas-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: "shadow",
        position: 'top-left',
        path: "/canvas-shadow.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 517, //Math.floor(513/2+261)
        y: 419, //Math.floor(513/2+163)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 3,
        shadowOffsetY: 2
      },
    ]
  },
  "1010050001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 451,
    minPX: 160,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/acrylic-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 500, //Math.floor(451/2+275)
        y: 357, //Math.floor(451/2+132)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 5,
        shadowOffsetY: 4
      },
    ]
  },
  "1010060001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 564,
    minPX: 200,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/poster-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 594, //Math.floor(564/2+312)
        y: 399, //Math.floor(564/2+117)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
    ]
  },
  "1010070001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 451,
    minPX: 160,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/photo-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 499, //Math.floor(451/2+274)
        y: 357, //Math.floor(451/2+132)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
    ]
  },
  "1010080001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 466,
    minPX: 165,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/fomax-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 537, //Math.floor(466/2+304)
        y: 357, //Math.floor(466/2+124)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
    ]
  },
  "1010090001": {
    width: 1000,
    height: 1000,
    maxMM: 841,
    minMM: 210,
    maxPX: 496,
    minPX: 176,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/board-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 500, //Math.floor(496/2+252)
        y: 377, //Math.floor(496/2+129)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 1,
        shadowOffsetY: 1
      },
    ]
  },
}
