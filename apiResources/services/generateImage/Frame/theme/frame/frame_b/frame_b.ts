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
          path: "/Frame/theme/frame/frame_b/b-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: "shadow",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_b/b-desk-shadow.png",
          x: 670,
          y: 835,
        },
        {
          type: "shadow",
          paperCode: "023008",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_b/birch.png",
          x: 670,
          y: 835,
        },
        {
          type: "image",
          position: "bottom-right",
          x: 670,
          y: 835,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 1,
          shadowOffsetX: 0,
          shadowOffsetY: 1
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_b/b-desk-object.png",
          x: 634,
          y: 628,
        },
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
          path: "/Frame/theme/frame/frame_b/b-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 500,
          y: 429,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 6,
          shadowOffsetX: 10,
          shadowOffsetY: 3
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_b/b-desk-object.png",
          x: 634,
          y: 628,
        },
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
          path: "/Frame/theme/frame/frame_b/b-wall-01-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 331,
          y: 399,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        }
      ]
    },
    large: {
      width: 1000,
      height: 1000,
      maxMM: 841,
      minMM: 406,
      maxPX: 447,
      minPX: 215,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_b/b-wall-02-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 499,
          y: 303,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        }
      ]
    }
  }
}
