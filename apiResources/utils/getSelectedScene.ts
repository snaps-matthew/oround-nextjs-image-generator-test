import CommonCode from 'apiResources/constants/CommonCode';
import TargetType from 'apiResources/constants/TargetType';
import { TYPE } from 'apiResources/constants/type';
import { API_URL } from 'apiResources/constants/apiURL';
import { loadImage } from 'apiResources/utils/loadImage';

export const getSelectedScene = (productEditInfo:any, printPositionCode?:string) => {
  let tempScene
  if(productEditInfo.edit.length>1 && productEditInfo.groupDelimiterName === "apparel"){
    let printPosition:any;
    if(printPositionCode===CommonCode.PRINT_POSITION_FRONT){
      printPosition = 'front'
    }else if(printPositionCode===CommonCode.PRINT_POSITION_BACK){
      printPosition = 'back'
    }
    tempScene = productEditInfo.edit.find((obj:any) => {
      return  obj.type === printPosition
    })
  }else{
    tempScene = productEditInfo.edit[0]
  }
  return tempScene
}
export const getCreateImageInitInfo = (target:string, canvas:any) =>{
  let outBox:any = {};
  if (target === TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_3 || target === TargetType.STORE_DETAIL_4) {
    outBox = {width: 500, height: 500};
  } else if (target=== TargetType.STORE_DETAIL_2) {
    outBox = {width: 1000, height: 1000};
  }

  canvas.width = outBox.width;
  canvas.height = outBox.height;
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f1f1f1';
  ctx.fillRect(0, 0, outBox.width, outBox.height);
  const imageCanvasInfo:any = {ctx, outBox}

  return imageCanvasInfo
}

export const  getDetailClipart = async (productEditInfo:any, printPositionCode?:string ) => {
  let scene:any = getSelectedScene(productEditInfo, printPositionCode);
  let imageObject:any = scene.object.filter((obj:any) => {
    const type = obj.type
    return type === TYPE.OBJECT_IMAGE
  })

  const detailClipartpath = API_URL.DOMAIN_RESOURCE+imageObject[0].original.middleImagePath
  const detailClipart:any  = await loadImage(detailClipartpath);

  return detailClipart
}

