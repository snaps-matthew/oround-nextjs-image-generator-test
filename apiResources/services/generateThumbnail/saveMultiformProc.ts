// import { getProductPaperList } from './generateThumbnail/proc/save/getProductPaperList'
import { makeMultiformSkin } from 'apiResources/services/makeMultiformSkin/makeMultiformSkin'
// import { makeTinyScreenShot } from './generateThumbnail/proc/save/makeTinyScreenShot'
// import { setCanvasData } from './generateThumbnail/proc/save/setCanvasData'
import { getProductScale } from 'apiResources/matchProd/getProductScale'
import { thumbnailForScene, thumbnailForWhitePrint} from 'apiResources/services/generateThumbnail/proc/drawThumbnail'
import { compositePaperImage } from 'apiResources/services/generateThumbnail/proc/compositePaperThumbnail'
import { compositeScreenImage } from 'apiResources/services/generateThumbnail/proc/compositeScreenImage'
import { compositeOneColorPrintImage } from 'apiResources/services/generateThumbnail/proc/compositeOneColorPrintImage'
import { newCanvas } from 'apiResources/utils/newCanvas'
import { drawPositionScene } from 'apiResources/services/drawPositionScene'
import  {PAPER} from 'apiResources/constants/paperList'
import {TYPE} from "../../constants/type";
import CommonCode from "apiResources/constants/CommonCode";

const saveMultiformProc = async (productEditInfo:any, optionInfo:any) => {
  const productCode = productEditInfo.productCode;
  const categoryCode = productEditInfo.productCode.slice(0,3);
  let printPosition:any;
  if(optionInfo.printPositionCode===CommonCode.PRINT_POSITION_FRONT){
    printPosition = 'front'
  }else if(optionInfo.printPositionCode===CommonCode.PRINT_POSITION_BACK){
    printPosition = 'back'
  }
  let scene
  if(productEditInfo.edit.length>1 && productEditInfo.groupDelimiterName === "apparel"){
    scene = productEditInfo.edit.find((obj:any) => {
      return  obj.type === printPosition
    })
  }else{
    scene = productEditInfo.edit[0]
  }
  // 2. 바닥에 베이스로 사용할(오브젝트 전체) 스크린샷 이미지
  let thumbnailCanvas:any = await thumbnailForScene(scene, productCode,  getProductScale(categoryCode));
  // console.log('thumbnailForScene=-=-=1111',scene)
  // 3. 화이트 배경(whitePrint) 이미지 생성
  // const whitePrintCanvas = await thumbnailForWhitePrint(scene, categoryCode);
  // console.log('thumbnailForWhitePrint=-=-=2222',whitePrintCanvas)
  // // 8. 용지 합성이 필요한 상품의 경우 합성을 한다.
  // thumbnailCanvas = await compositePaperImage(thumbnailCanvas, whitePrintCanvas, optionInfo, productCode);
  // console.log('compositePaperImage=-=-=3333',scene, thumbnailCanvas)


  // 10. 어페럴용 날염 이미지 생성
  // thumbnailCanvas = await compositeScreenImage(thumbnailCanvas, scene, optionInfo)
  // console.log('compositeScreenImage=-=-=',44, thumbnailCanvas)
  // 11. 어페럴용 oneColorPrint 이미지 생성
  // thumbnailCanvas = await compositeOneColorPrintImage(thumbnailCanvas, optionInfo)
  // console.log('compositeOneColorPrintImage=-=-=',55,thumbnailCanvas)
  //
  // // 12. 어패럴 상품의 경우 옷의 위치에 맞춰서 썸네일의 위치를 다시 수정한다.
  // thumbnailCanvas = await drawPositionScene(thumbnailCanvas, scene, optionInfo)
  // //
  // // 9. 상품별로 스킨을 합성을 한다.
  // thumbnailCanvas = await makeMultiformSkin(categoryCode, thumbnailCanvas, scene);

  return thumbnailCanvas
}

export default saveMultiformProc;
