// 메탈, 캔버스 아크릴, 포스터 대형사진인화, 폼맥스 보드
import { resolve } from 'path';

export default {
  "S": {
    width: 1000,
    height: 1000,
    maxMM: 70,
    minMM: 30,
    maxPX: 232,
    minPX: 139,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/sticker-s.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 475, //Math.floor(232/2+359)
        y: 601, //Math.floor(232/2+485)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 0,
        shadowOffsetY: 2
      },
    ]
  },
  "M": {
    width: 1000,
    height: 1000,
    maxMM: 140,
    minMM: 71,
    maxPX: 375,
    minPX: 224,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/sticker-m.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 618, //Math.floor(375/2+431)
        y: 495, //Math.floor(375/2+308)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 0,
        shadowOffsetY: 2
      },
    ]
  },
  "L": {
    width: 1000,
    height: 1000,
    maxMM: 220,
    minMM: 141,
    maxPX: 611,
    minPX: 364,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/sticker-l.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 623, //Math.floor(611/2+318)
        y: 496, //Math.floor(611/2+191)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 0,
        shadowOffsetY: 2
      },
    ]
  },
}
