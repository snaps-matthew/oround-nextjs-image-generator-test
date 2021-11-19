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
          path: "/Frame/theme/frame/frame_d/d-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: "shadow",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_d/d-desk-shadow.png",
          x: 715,
          y: 802,
        },
        {
          type: "shadow",
          paperCode: "023008",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_d/birch.png",
          x: 715,
          y: 802,
        },
        {
          type: "image",
          position: "bottom-right",
          x: 715,
          y: 802,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 1,
          shadowOffsetX: 0,
          shadowOffsetY: 1
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_d/d-desk-object.png",
          x: 0,
          y: 471,
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
          path: "/Frame/theme/frame/frame_d/d-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 400,
          y: 363,
          shadowColor: 'rgba(94,71,50,0.3)',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_d/d-desk-object.png",
          x: 0,
          y: 471,
        },
      ]
    },
    medium: {
      width: 1000,
      height: 1000,
      maxMM: 420,
      minMM: 210,
      maxPX: 447,
      minPX: 212,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_d/d-wall-01-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 291,
          y: 343,
          shadowColor: 'rgba(94,71,50,0.3)',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        },
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
          path: "/Frame/theme/frame/frame_d/d-wall-02-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 708,
          y: 302,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 4,
          shadowOffsetX: 7,
          shadowOffsetY: 2
        },
      ]
    }

  }
}
