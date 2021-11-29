import type { NextApiRequest, NextApiResponse } from 'next';
import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductEditInfo} from "apiResources/api/getProductEditInfo";
import generateThumbnail from 'apiResources/services/generateThumbnail/proc/generateThumbnail';
import { getSelectedScene } from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage } from 'apiResources/utils/loadImage'
import fs from 'fs';
import { createCanvas } from 'canvas';
import { Blob, Buffer } from 'buffer';
const { Image } = require('canvas')


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
//smartTok http://localhost:3000/api/27600/4/112003:T00033,112002:T00003.jpg
//round pinButton http://localhost:3000/api/27604/1/112010:T00070,112018:T00120,112003:T00044.jpg
//simpleEcoBag http://localhost:3000/api/27607/1/112002:T00004,112003:T00034,112020:T00129,112004:T00056.jpg

// [TINCASE] //

// SILVER + S => http://localhost:3000/api/27599/1/112003:T00033,112002:T00010.jpg
// SILVER + M => http://localhost:3000/api/27599/1/112003:T00034,112002:T00010.jpg
// SILVER + L => http://localhost:3000/api/27599/1/112003:T00035,112002:T00010.jpg

// BLACK + S => http://localhost:3000/api/27599/1/112003:T00033,112002:T00003.jpg
// BLACK + M => http://localhost:3000/api/27599/1/112003:T00034,112002:T00003.jpg
// BLACK + L => http://localhost:3000/api/27599/1/112003:T00035,112002:T00003.jpg


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
    let scene = getSelectedScene(productEditInfo, optionInfo);
    const thumbnailImage = await generateThumbnail(scene)
    const imageComposer = await generateImage({ thumbnailImage, target, productEditInfo, optionInfo })
    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');

    if ((target == TargetType.STORE_LIST_1 || target === TargetType.STORE_DETAIL_2) && ['tinCase', 'smartTok', 'button', 'apparel'].includes(productEditInfo.groupDelimiterName)) {

      const canvas = createCanvas(500,500);
      const ctx = canvas.getContext('2d');
      const image = await loadImage('data:image/png;base64,'+ imageComposer);
      ctx.drawImage(image, 0, 0, 500, 500);

      canvas.createPNGStream().pipe(res);

    } else {
      imageComposer.stream().pipe(res);
    }

  } catch (error) {

  }
}
