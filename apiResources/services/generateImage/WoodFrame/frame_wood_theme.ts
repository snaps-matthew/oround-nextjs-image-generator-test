
export default {
  "1010010001": {
    width: 1000,
    height: 1000,
    maxMM: 594,
    minMM: 210,
    maxPX: 467,
    minPX: 166,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/wood-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 500, //Math.floor(467/2+267)
        y: 360, //Math.floor(467/2+127)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 5,
        shadowOffsetY: 4
      },
      {
        type: 'stuff',
        position: 'bottom-left',
        path: "/wood-cabinet.png",
        x: 0,
        y: 431,
      },
      {
        type: 'stuff',
        position: 'bottom-right',
        path: "/wood-chair.png",
        x: 560, //1000-440
        y: 682, //1000-318
      },
    ]
  },
  "1010020001": {
    width: 1000,
    height: 1000,
    maxMM: 594,
    minMM: 210,
    maxPX: 466,
    minPX: 165,
    object: [
      {
        type: 'background',
        position: 'top-left',
        path: "/aluminum-bg.png",
        x: 0,
        y: 0,
      },
      {
        type: 'image',
        position: "mid-center",
        x: 500, //Math.floor(466/2+267)
        y: 348, //Math.floor(466/2+115)
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowBlur: 2,
        shadowOffsetX: 5,
        shadowOffsetY: 4
      },
    ]
  },

}
