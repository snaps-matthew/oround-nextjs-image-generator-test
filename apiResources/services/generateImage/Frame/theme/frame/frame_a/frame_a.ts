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
          path: "/Frame/theme/frame/frame_a/a-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: "shadow",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_a/a-desk-shadow.png",
          x: 632,
          y: 762,
        },
        {
          type: "shadow",
          paperCode: "023008",
          position: 'bottom-left',
          path: "/Frame/theme/frame/frame_a/birch.png",
          x: 632,
          y: 762,
        },
        {
          type: "image",
          position: "bottom-right",
          x: 632,
          y: 762,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 1,
          shadowOffsetX: 0,
          shadowOffsetY: 1
        },
        {
          type: "stuff",
          position: 'top-left',
          path: "/Frame/theme/frame/frame_a/a-desk-object.png",
          x: 522,
          y: 169,
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
          path: "/Frame/theme/frame/frame_a/a-desk-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 370,
          y: 384,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 6,
          shadowOffsetX: 10,
          shadowOffsetY: 3
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_a/a-desk-object.png",
          x: 522,
          y: 169,
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
          path: "/Frame/theme/frame/frame_a/a-wall-01-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 500,
          y: 352,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 6,
          shadowOffsetX: 10,
          shadowOffsetY: 3
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_a/a-wall-01-light.png",
          x: 0,
          y: 0,
        },
      ]
    },
    large: {
      width: 1000,
      height: 1000,
      maxMM: 841,
      minMM: 406,
      maxPX: 503,
      minPX: 243,
      object: [
        {
          type: 'background',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_a/a-wall-02-bg.png",
          x: 0,
          y: 0,
        },
        {
          type: 'image',
          position: "mid-center",
          x: 500,
          y: 377,
          shadowColor: 'rgba(94,71,50,0.45)',
          shadowBlur: 6,
          shadowOffsetX: 10,
          shadowOffsetY: 3
        },
        {
          type: 'stuff',
          position: 'top-left',
          path: "/Frame/theme/frame/frame_a/a-wall-02-light.png",
          x: 0,
          y: 0,
        },
      ]
    }

  }
}
