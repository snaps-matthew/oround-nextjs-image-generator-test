import type { NextApiRequest, NextApiResponse } from 'next';

import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {validationParams} from "apiResources/utils/validationParams";
import {getTemplateImagePath} from "apiResources/api/getTemplateImagePath";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductSizeInfo} from "apiResources/api/getProductSizeInfo";
import {getProductEditInfo} from "apiResources/api/getProductEditInfo";
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
import generateThumbnail from '../../../../apiResources/services/generateThumbnail/proc/generateThumbnail';
import { getSelectedScene } from '../../../../apiResources/utils/getSelectedScene';


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

//EX) apparel- http://localhost:3000/api/21192/1/112002:T00011,112003:T00033,112020:T00129,112004:T00056.jpg
//woodFrame- http://localhost:3000/api/21206/1/112003:T00035.jpg
//card- http://localhost:3000/api/21239/1/112003:T00041.112010:T00073.jpg
//airPodProCase http://localhost:3000/api/21243/1/112003:T00033,112002:T00008.jpg
//airPodCase http://localhost:3000/api/21244/1/112003:T00033,112002:T00001.jpg
//buds Case http://localhost:3000/api/21245/1/112003:T00033,112002:T00005.jpg

//canvasFrame http://localhost:3000/api/21207/1/112003:T00035.jpg
//hood http://localhost:3000/api/21195/1/112002:T00014,112003:T00036,112020:T00129,112004:T00056.jpg

//zopUpHoodie http://localhost:3000/api/27550/1/112002:T00024,112003:T00036,112020:T00129,112004:T00056.jpg
//sticker- http://localhost:3000/api/27549/1/112003:T00034,112006:T00064.jpg
//acrylicKeyring- http://localhost:3000/api/27593/1/112005:T00058,112017:T00114,112003:T00034,112008:T00065,112016:T00107,112019:T00122.jpg
//hardphoneCase- http://localhost:3000/api/27573/1/112014:T00090,112001:T00094,112003:T00033,112021:T00153.jpg
//acrylicStand- http://localhost:3000/api/27594/1/112003:T00033.jpg
//note- http://localhost:3000/api/27596/1/112003:T00040.112015:T00092.jpg
//pouch http://localhost:3000/api/27563/1/112002:T00003,112004:T00056,112020:T00129,112003:T00034.jpg
//tinCase- http://localhost:3000/api/27599/1/112003:T00034,112002:T00010.jpg
//smartTok http://localhost:3000/api/27600/4/112003:T00033,112002:T00003.jpg
//round pinButton http://localhost:3000/api/27604/1/112010:T00070,112018:T00120,112003:T00044.jpg
//simpleEcoBag http://localhost:3000/api/27607/1/112002:T00004,112003:T00034,112020:T00129,112004:T00056.jpg


const getPathParams = (requestQuery: { [key: string]: string | string[] }): IRequestQuery => {
// console.log('requestQuery=-=-=',requestQuery.optionAndFileExt)
  const artProductIndexParam:any = requestQuery.artProductIndex;
  const targetParam:any = requestQuery.target;
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
  pramCodes['target'] = targetParam
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
    let scene = getSelectedScene(productEditInfo, optionInfo.printPositionCode);
    const thumbnailImage = await generateThumbnail(scene)
    // const thumbnailImage = await saveMultiformProc(productEditInfo, optionInfo);

    const imageComposer = await generateImage({ thumbnailImage, target, productEditInfo, optionInfo })

    // console.log(productEditInfo)

    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');
    imageComposer.stream().pipe(res);


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
