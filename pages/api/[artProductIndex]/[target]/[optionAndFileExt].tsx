import type { NextApiRequest, NextApiResponse } from 'next';

import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {validationParams} from "apiResources/utils/validationParams";
import {getTemplateImagePath} from "apiResources/api/getTemplateImagePath";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductSizeInfo} from "apiResources/api/getProductSizeInfo";
import {getProductEditInfo} from "apiResources/api/getProductEditInfo";
import saveMultiformProc from "apiResources/services/generateThumbnail/saveMultiformProc";
import productGroupList from "apiResources/constants/ProdType";
import LayerOrderRef from "apiResources/constants/LyaerOrderRef";
import prodInfo from "apiResources/constants/ProdInfo";
import * as fs from 'fs';
import {createCanvas} from "canvas";
import {getArtworkReszied, getImageWrinkled} from "apiResources/utils/artworkImageCreator";
import {imageTextSaver} from "apiResources/utils/imageTextSaver";
import {optionTypeInfo, getOptionInfo} from "apiResources/constants/optionInfo";
import productInfo from "apiResources/constants/productInfo";

import logger from 'logger';


interface IRequestQuery {
  [key: string]: any;
  // artProductIndex: string
  // sizeCode: string
  // optionAndFileExt: string
}
const optionInfo:any = [
  {112001:"brandCode"},
  {112002:"colorCode"},
  {112003:"sizeCode"},
  {112004:"printMethodCode"},
  {112005:"acrylicCode"},
  {112006:"paperCode"},
  {112007:"modelCode"},
  {112008:"ringCode"},
  {112009:"natureCode"},
  {112010 :"formCode"},
  {112011 :"frameCode"},
  {112012 :"mattCode"},
  {112013 :"finishCode"},
  {112014 :"caseCode"},
  {112015 :"innerPaperCode"},
  {112016 :"ringColorCode"},
  {112017 :"glitterColorCode"},
  {112018 :"glossyCode"},
  {112019 :"chainColorCode"},
  {112020 :"printPositionCode"},
  {112021 :"diviceColorCode"}
  ]

//EX)  http://localhost:3000/api/21192/1/112002:T00011,112003:T00033,112020:T00131,112004:T00056.jpg
const getPathParams = (requestQuery: { [key: string]: string | string[] }): IRequestQuery => {
// console.log('requestQuery=-=-=',requestQuery.optionAndFileExt)
  const artProductIndexParam:any = requestQuery.artProductIndex;
  const targetParam:any = requestQuery.target;
  let targetInfo:any = ''
  if(targetParam === "1"){
    targetInfo = "front"
  }
  const optionAndFileExtParam:any = requestQuery.optionAndFileExt;
  let optionParamArr:any = optionAndFileExtParam.split(".")[0]
  optionParamArr = optionParamArr.split(",")

  let tempInfo:any = {}
  for (let i=0; i<optionInfo.length; i++){
    for (let j=0; j<optionParamArr.length; j++){
      if(optionInfo[i][optionParamArr[j].split(':')[0]]){
        tempInfo[optionInfo[i][optionParamArr[j].split(':')[0]]] = optionParamArr[j].split(':')[1]
      }
    }
  }

  tempInfo['ext'] = optionAndFileExtParam.split(".")[1]
  let pramCodes:any = {}
  pramCodes['artProductIndex'] = artProductIndexParam
  pramCodes['target'] = targetInfo
  pramCodes['optionAndFileExt'] = tempInfo

  return pramCodes
}
// interface IRequest
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pramCodes = getPathParams(req.query);
    const artProductIndex = pramCodes.artProductIndex
    const target = pramCodes.target
    const optionInfo = pramCodes.optionAndFileExt
    const sizeCode = pramCodes.optionAndFileExt.sizeCode

    const productEditInfo = await getProductEditInfo(artProductIndex, sizeCode);
    let thumbnailImage = await saveMultiformProc(productEditInfo, optionInfo);

    const categoryName = productEditInfo.groupDelimiterName
    const productCode = productEditInfo.productCode
    // const imageComposer = await generateImage({ thumbnailImage,categoryName,productCode,target,optionInfo })

    console.log(productEditInfo)
    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');
    thumbnailImage.createPNGStream().pipe(res);


    // logger.info(`DEBUG : query Params : ${artProductIndex} : ${sizeCode} : ${optionAndFileExt}`);
    // let thumbnailImage = await saveMultiformProc(productEditInfo, categoryCode, optionAndFileExt)
    // const imageData:any = thumbnailImage.toDataURL();
    // const artworkSize:any = [productEditInfo.edit[0].width, productEditInfo.edit[0].height];

//=========================start
//     const artworkData = {
//       x: 0,
//       y: 40,
//       width: 400,
//       height: 373,
//       path: `https://cdn.oround.com/artwork/2021/OCTOBER/20/21192/ED/cC9PAQ-20211020142757553.png`
//     }

    // 필요한 것들
    // productCode, groupDelimiterName (그룹 이름), edit[0].type (사이드),

    // const artworkSize:any = [400,453];
    //
    // const dataSet:any = {
    //   productCode,
    //   productType: productGroupList[productCode],
    //   productOption,
    //   layerOrder: LayerOrderRef[productCode] ? LayerOrderRef[productCode][productOption] : [],
    //   // psdPath: `/Users/david/Desktop/SMARTTOK/${productEditInfo.productCode}/${productOption ? productOption + '/' : ''}${productEditInfo.productCode}.psd`,
    //   psdPath: `/Users/david/Desktop/APPAREL/${productCode}/${productOption}/${productCode}.psd`,
    //   // patternPath: `https://cdn.oround.com/artwork/2021/OCTOBER/20/21192/ED/cC9PAQ-20211020142757553.png`,
    //   // productPath: `/Users/david/Desktop/SMARTTOK/${productEditInfo.productCode}${productOption ? '/' + productOption : ''}`,
    //   // productPath: `https://cdn.ohprint.me/design/resource/Model3d/SMARTTOK/${productCode}/${productOption}`,
    //   productPath: `/Users/david/Desktop/APPAREL/${productCode}/${productOption}`,
    //   colorCodes: prodInfo[productCode] ? prodInfo[productCode].productColor : null,
    //   categoryCode,
    //   paperCode,
    //   backCode,
    //   target,
    //   optionAndFileExt,
    //   // imageData,
    //   artworkSize,
    //   // thumbnailImage
    // }
    //
    // const imageCanvas = await generateImage(dataSet);
    //
    // res.send(`<html><body><img height="800px" src='data:image/png;base64, ${imageCanvas}' alt='hi' /></body></html>`)

  } catch (error) {

  }
}


