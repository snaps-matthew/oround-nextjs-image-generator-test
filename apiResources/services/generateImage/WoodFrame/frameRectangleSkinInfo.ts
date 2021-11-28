export interface RectangleSkinState {
  thick: number;
  dug: number;
}

export interface FrameRectangleSkinInfoState {
  [key: string]: RectangleSkinState;
}

const frameRectangleSkinInfo: FrameRectangleSkinInfoState = {
  '1010010001': {
    thick: 15,
    dug: 6
  },
  '1010020001': {
    thick: 7,
    dug: 6
  }
};

export default frameRectangleSkinInfo;
