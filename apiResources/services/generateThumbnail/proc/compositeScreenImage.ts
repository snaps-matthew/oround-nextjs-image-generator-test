import { SnapsCV } from 'apiResources/utils/SnapsCV'
import  COMMON_CODE  from 'apiResources/constants/CommonCode'

export const compositeScreenImage = (thumbnailCanvas:any, scene:any, optionInfo:any) => {
  console.log('textileColor=-=-=',scene.object)
  //todo 여럿 컬러를 입력하게 되면 수정해야함
  const textileColor = scene.object[0].textileColor

  if(optionInfo.paperCode === COMMON_CODE.PAPER_APPAREL_SCREEN){
    const snapsCV = new SnapsCV()
    snapsCV.compositeScreen(thumbnailCanvas, textileColor)
  }
  return thumbnailCanvas

}
