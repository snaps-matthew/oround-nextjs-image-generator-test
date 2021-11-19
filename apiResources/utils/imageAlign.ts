export const thumbAlignCenter = (imgWidth:number, imgHeight:number, clipWidth:number, clipHeight:number) => {
  let width, height, marginTop, marginLeft

  if (imgWidth > imgHeight) {
    width = clipWidth
    height = Math.floor(clipWidth * imgHeight / imgWidth)
    marginTop = (clipHeight - height) / 2
    marginLeft = 0
  } else {
    height = clipHeight
    width = Math.floor(clipHeight * imgWidth / imgHeight)
    marginTop = 0
    marginLeft = Math.floor((clipWidth - width) / 2)
  }
  if (width === 0) width = 1
  if (height === 0) height = 1

  return {
    width,
    height,
    marginTop,
    marginLeft
  }
}

export const imgAlignCenter = (imgWidth:number, imgHeight:number, clipWidth:number, clipHeight:number, angle:number) => {
  return paperFull(imgWidth, imgHeight, clipWidth, clipHeight, angle)

  // 기본적으로 모든 상품은 페이퍼 풀로 사용이 된다. (사진틀은 같은나 이미지가 이미지 풀로 차야 하는 경우에는 아래 쪽을 추가하도록 한다.)
  // if(imgFull == "no"){
  //     return paperFull(imgWidth, imgHeight, clipWidth, clipHeight, angle)
  // }else{
  //     return imageFull(imgWidth, imgHeight, clipWidth, clipHeight, angle)
  // }
}

export const paperFull = (imgWidth:number, imgHeight:number, clipWidth:number, clipHeight:number, angle:number) => {
  let newSize
  const angleHorizon = angle === 90 || angle === 270
  const sizeWidth = (angleHorizon) ? imgHeight : imgWidth
  const sizeHeight = (angleHorizon) ? imgWidth : imgHeight

  if (sizeWidth > sizeHeight) {
    newSize = _getSize('width', sizeWidth, sizeHeight, clipWidth, clipHeight,
      angleHorizon)
    if (newSize.width < clipWidth) {
      newSize = _getSize('height', sizeWidth, sizeHeight, clipWidth, clipHeight,
        angleHorizon)
    }
  } else {
    newSize = _getSize('height', sizeWidth, sizeHeight, clipWidth, clipHeight,
      angleHorizon)
    if (newSize.height < clipHeight) {
      newSize = _getSize('width', sizeWidth, sizeHeight, clipWidth, clipHeight,
        angleHorizon)
    }
  }

  return {
    width: (angleHorizon) ? newSize.height : newSize.width,
    height: (angleHorizon) ? newSize.width : newSize.height,
    x: newSize.x,
    y: newSize.y
  }
}

export const imageFull = (imgWidth:number, imgHeight:number, clipWidth:number, clipHeight:number, angle:number) => {
  let newSize
  const angleHorizon = angle === 90 || angle === 270
  const sizeWidth = (angleHorizon) ? imgHeight : imgWidth
  const sizeHeight = (angleHorizon) ? imgWidth : imgHeight

  if (sizeWidth >= sizeHeight) {
    newSize = _getSize('height', sizeWidth, sizeHeight, clipWidth, clipHeight,
      angleHorizon)
    if (newSize.height > clipHeight) {
      newSize = _getSize('width', sizeWidth, sizeHeight, clipWidth, clipHeight,
        angleHorizon)
    }
  } else {
    newSize = _getSize('width', sizeWidth, sizeHeight, clipWidth, clipHeight,
      angleHorizon)
    if (newSize.width > clipWidth) {
      newSize = _getSize('height', sizeWidth, sizeHeight, clipWidth, clipHeight,
        angleHorizon)
    }
  }

  return {
    width: (angleHorizon) ? newSize.height : newSize.width,
    height: (angleHorizon) ? newSize.width : newSize.height,
    x: newSize.x,
    y: newSize.y
  }
}

const _getSize = (type:string, imgWidth:number, imgHeight:number, clipWidth:number, clipHeight:number, angleHorizon:boolean) => {
  let width, height, x, y
  if (type === 'width') {
    height = clipHeight
    width = Math.floor(clipHeight * imgWidth / imgHeight) || 0
    x = Math.floor(width - clipWidth) / -2
    y = 0
  } else {
    width = clipWidth
    height = Math.floor(clipWidth * imgHeight / imgWidth) || 0
    x = 0
    y = Math.floor(height - clipHeight) / -2
  }
  if (angleHorizon) {   // 90도, 270도 인 경우 좌표를 수정한다.
    x = Math.floor(clipWidth - height) / 2
    y = Math.floor(width - clipHeight) / -2
  }
  return {width, height, x, y}
}
