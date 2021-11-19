export const optionTypeInfo:any = {
  //APPAREL
  "1050050001": ["colorCode","sizeCode","printPositionCode","paperCode","targetAndFileExt"],
}

export const getOptionInfo:any = (optionTypeInfo:any, productCode:any, optionAndFileExtArr:any) =>{
  let temp:any = {}
  for(let i=0; i<optionTypeInfo[productCode].length; i++){
    temp[optionTypeInfo[productCode][i]] = optionAndFileExtArr[i]
  }
  return temp
}
