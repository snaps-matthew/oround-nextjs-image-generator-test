import { newCanvas } from 'apiResources/utils/newCanvas'
import COMMON_CODE from 'apiResources/constants/CommonCode'
import { isApparelProduct } from 'apiResources/matchProd/isApparelProduct'
import { getFrameCode } from 'apiResources/matchProd/getFrameCode'
import { getProductPosition } from 'apiResources/matchProd/getProductPosition'

export const drawPositionScene = (thumbnailCanvas:any, scene:any, optionInfo:any) => {
  const type = scene.type
  const productCode = scene.productCode
  const paperCode = optionInfo.paperCode
  let frameCode = optionInfo.frameCode

  if(!isApparelProduct(productCode)){
    return thumbnailCanvas
  }else{
    // 기본 프레임코드 페이지별 셋팅 (오리지널은 넣지 않는다.)
    if(paperCode !== COMMON_CODE.PAPER_ORIGINAL){
      frameCode = getFrameCode(type)
    }
    thumbnailCanvas = drawPosition(thumbnailCanvas, type, productCode)
    return thumbnailCanvas
  }
}

export const drawPosition = (sceneCanvas:any, type:string, productCode:string) => {
  const width = sceneCanvas.width
  const height = sceneCanvas.height
  let left = (1000 - width) / 2
  const top = (1000 - height) / 2

  // 찰스가 고정값으로 간다고함 만약 x 죄표가 다른경우 이미지를 옮겨서 맞춘다고 한다.
  if (
    type === COMMON_CODE.FRAME_CODE_FRONT_POCKET ||
    type === COMMON_CODE.FRAME_CODE_FRONT_TOP ||
    type === COMMON_CODE.FRAME_CODE_BOTTOM_LEFT ||
    type === COMMON_CODE.FRAME_CODE_BOTTOM_RIGHT
  ){
    const scenePosition = getProductPosition(productCode, type,"","" )
    left = scenePosition.left
  }

  const {canvas, ctx} = newCanvas(1000, 1000)
  ctx.drawImage(sceneCanvas, left, top, width, height)

  return canvas
}
