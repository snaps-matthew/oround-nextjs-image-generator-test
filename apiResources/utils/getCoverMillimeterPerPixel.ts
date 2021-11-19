
export const getCoverMillimeterPerPixel = (tmplInfo:any)=>{
  const coverPX = tmplInfo.get('@coverPX').split(' ');
  const coverPXWidth = parseFloat(coverPX[0]);
  const coverPXHeight = parseFloat(coverPX[1]);

  const coverMM = tmplInfo.get('@coverEdgeMM').split(' ');
  const coverMMWidth = parseFloat(coverMM[0]);

  const coverMillimeterPerPixel = coverPXWidth / coverMMWidth;      // cover

  return {
    coverMillimeterPerPixel,
    coverPXWidth,
    coverPXHeight
  }
};

export const getPageMillimeterPerPixel = (selectedScene:any)=>{
  const {pageMMWidth, pagePXWidth, pagePXHeight} = getPagePXMM(selectedScene)
  const pageMillimeterPerPixel = pagePXWidth / pageMMWidth;      // page

  return {
    pageMillimeterPerPixel,
    pagePXWidth,
    pagePXHeight
  }
};

export const getPagePXMM = (selectedScene:any) => {
  const sceneType = selectedScene.get('@type')
  const sceneSubType = selectedScene.get('@subType')
  // @ts-ignore
  const sizeInfo = GV.product.sizeInfoList[sceneType + sceneSubType]
  const pagePXWidth = sizeInfo? sizeInfo.pixelWidth : 0
  const pagePXHeight = sizeInfo? sizeInfo.pixelHeight : 0
  const pageMMWidth = sizeInfo? sizeInfo.millimeterWidth : 0
  const pageMMHeight = sizeInfo? sizeInfo.millimeterHeight : 0

  return {
    pageMMWidth,
    pageMMHeight,
    pagePXWidth,
    pagePXHeight
  }
}
