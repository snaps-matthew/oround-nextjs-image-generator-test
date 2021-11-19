export default {
  desk: {
    small: {
      width: 1000,
      height: 1000,
      maxMM: 254,   // 10 inch  8x10 제일 큰 사이즈 : 실제 사이즈
      minMM: 102,   // 4 inch   4x6 제일 작은 사이즈
      maxPX: 540,   // 10 inch to pixel : zeplin 에 정의됨
      minPX: 216,   // 4 inch to pixel : zeplin 에 정의됨
      object: [
        {
          type: "background",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: "shadow",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_c/c-desk-shadow-01.png",
          x: 821,
          y: 835,
        },
        {
          type: "shadow",
          paperCode: "023008",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_c/birch.png",
          x: 821,
          y: 835,
        },
        {
          type: "image",
          position: "bottom-right",
          x: 821,
          y: 835,
          shadowColor: 'rgba(0,0,0,0.4',
          shadowBlur: 1,
          shadowOffsetX: 0,
          shadowOffsetY: 1
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-object.png",
          x: 53,
          y: 466,
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-shadow-02.png",
          x: 0,
          y: 0,
        }
      ]
    }
  },
  wall : {
    small: {
      width: 1000,
      height: 1000,
      maxMM: 254,
      minMM: 102,
      maxPX: 540,
      minPX: 216,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 370,
          y: 384,
          shadowColor: 'rgba(94,71,50,0.45',
          shadowBlur: 6,
          shadowOffsetX: 10,
          shadowOffsetY: 3
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-object.png",
          x: 53,
          y: 466,
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-desk-shadow-02.png",
          x: 0,
          y: 0,
        }
      ]
    },
    medium: {
      width: 1000,
      height: 1000,
      maxMM: 420,
      minMM: 210,
      maxPX: 559,
      minPX: 280,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-wall-01-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 526,
          y: 385,
          shadowColor: 'rgba(94,71,50,0.45',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-wall-01-object.png",
          x: 0,
          y: 356,
        },
      ]
    },
    large: {
      width: 1000,
      height: 1000,
      maxMM: 841,
      minMM: 406,
      maxPX: 560,
      minPX: 270,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-wall-02-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 630,
          y: 400,
          shadowColor: 'rgba(94,71,50,0.45',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_c/c-wall-01-shadow.png",
          x: 0,
          y: 0,
        },
      ]
    }

  }
}
