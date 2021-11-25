import { TYPE } from 'apiResources/constants/type'
import { generateThumbnail } from 'apiResources/services/generateThumbnail/proc/generateThumbnail'
import { isWhitePrint } from 'apiResources/matchProd/isWhitePrint'
import { loadImage } from 'apiResources/utils/loadImage'
import { newCanvas } from 'apiResources/utils/newCanvas'
import { paperFull } from 'apiResources/utils/imageAlign'
import { asyncCreateObjectURL } from 'apiResources/utils/asyncCreateObjectURL'
import { isUVPrintPhoneCase } from 'apiResources/matchProd/isPhoneCaseProd'
import { getResourceSceneMaskPath } from 'apiResources/utils/getResourceSkinPath'
import {isApparelProduct} from "apiResources/matchProd/isApparelProduct";

// 일반적인 모든 오브젝트가 순서에 맞게 출력
export const thumbnailForScene = async (scene:any, productCode:string, scale:number=1) => {
  if(isUVPrintPhoneCase(productCode) || isApparelProduct(productCode)) {
    return await thumbnailToObject(scene, scale)
  }	else {
    return await thumbnailForNormal(scene, scale)
  }
}

// 일반적인 모든 오브젝트가 순서에 맞게 출력
export const thumbnailForNormal = async (scene:any, scale:number) => {
  return await generateThumbnail(scene, false, scale)
}

// 효과 표현 하기위해 whiteWrite 설정된 오브젝트만 출력
export const thumbnailForWhitePrint = (scene:any, categoryCode:string, scale:number=1, paperCode:string='') => {
  let tempScene = scene
  if(isWhitePrint(categoryCode) || !paperCode){
    tempScene = tempScene.object.filter((obj:any) => obj.whitePrint )
  } else {
    tempScene.object = ''
  }
  return generateThumbnail(tempScene, false, scale)
}

// background 제외한 오브젝트 출력
export const thumbnailToObject = async (scene:any, scale:number) => {
  let tempScene = scene
  tempScene.object = tempScene.object.filter((obj:any) => {
    const type = obj['type']
    return type !== TYPE.OBJECT_BACKGROUND && type !== TYPE.OBJECT_HOLE && type !== TYPE.OBJECT_SCENE_MASK
  })
  return await generateThumbnail(tempScene, false, scale)
}

// 씬 마스크 이미지 를 출력
export const thumbnailSceneMask = async (scene:any, tmpProductCode:any, caseSkin:any, caseColor:any) => {
  const mask = scene.object.filter((obj:any) => {
    obj.type === TYPE.OBJECT_SCENE_MASK
  })
  const maskImg = await loadImage(mask)
  const sceneWidth = scene.width
  const sceneHeight = scene.height
  const {canvas, ctx} = newCanvas(sceneWidth, sceneHeight)
  ctx.drawImage(maskImg, 0, 0, sceneWidth, sceneHeight)
  return canvas
}

// 씬 마스크 이미지 를 출력
export const serverSceneMask = async (scene:any, tmpProductCode:any, caseSkin:any, caseColor:any) => {
  const mask = getResourceSceneMaskPath(tmpProductCode, caseSkin)
  const maskImg = await loadImage(mask)
  const sceneWidth = scene.width
  const sceneHeight = scene.height
  const {canvas, ctx} = newCanvas(sceneWidth, sceneHeight)
  ctx.drawImage(maskImg, 0, 0, sceneWidth, sceneHeight)
  return canvas
}

export const makePaperMasking = async (isSceneMasking:any, paperImage:any, scene:any, tmpProductCode:any, caseSkin:any, caseColor:any) => {
  const paperCanvas = await makePaper(paperImage, scene)
  const paperBackgroundUrl = await asyncCreateObjectURL(paperCanvas)

  const sceneMask =  isSceneMasking? await thumbnailSceneMask(scene, tmpProductCode, caseSkin, caseColor) : await thumbnailToObject(scene,1)
  const sceneWidth = scene.width
  const sceneHeight = scene.height

  const {canvas, ctx} = newCanvas(sceneWidth, sceneHeight)
  ctx.fillStyle = '#f2f4f7'
  ctx.fillRect(0, 0, sceneWidth, sceneHeight)
  ctx.globalCompositeOperation = 'destination-out'
  // 정확히 컷팅하면 안티알리싱때문에 라인이 생겨서 좀더 크게 보이도록한다.
  ctx.drawImage(sceneMask, -3, -3, sceneWidth + 6, sceneHeight + 6)
  const paperSceneMaskUrl = await asyncCreateObjectURL(canvas)

  return { paperCanvas, paperBackgroundUrl, paperSceneMaskUrl}
}

export const makePaper = async (paperImage:any, scene:any) => {
  const sceneWidth = scene.width
  const sceneHeight = scene.height
  paperImage = await loadImage(paperImage)
  const {canvas, ctx} = newCanvas(sceneWidth, sceneHeight)
  const fullSize = paperFull(paperImage.width, paperImage.height, sceneWidth, sceneHeight, 0)
  ctx.drawImage(paperImage, fullSize.x, fullSize.y, fullSize.width, fullSize.height)
  return canvas
}

