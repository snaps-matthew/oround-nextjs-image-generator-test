import type { NextApiRequest, NextApiResponse } from 'next';
import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductEditInfo} from "apiResources/api/getProductEditInfo";
import generateThumbnail from 'apiResources/services/generateThumbnail/proc/generateThumbnail';
import { getSelectedScene } from 'apiResources/utils/getSelectedScene';
import TargetType from 'apiResources/constants/TargetType';
import { loadImage, loadErrorImage } from 'apiResources/utils/loadImage'
import { createCanvas } from 'canvas';
import { newCanvas } from 'apiResources/utils/newCanvas';


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
    const paramCodes = getPathParams(req.query);
    const artProductIndex = paramCodes.artProductIndex
    const target = paramCodes.target
    const optionInfo = paramCodes.optionAndFileExt
    const sizeCode = paramCodes.optionAndFileExt.sizeCode
    const productEditInfo = await getProductEditInfo(artProductIndex, sizeCode);
    const scene = getSelectedScene(productEditInfo, optionInfo);
    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');
    if(scene){
      const thumbnailImage = await generateThumbnail(scene)
      const imageComposer = await generateImage({ thumbnailImage, target, productEditInfo, optionInfo })
        imageComposer.stream().pipe(res);
    }else{
      const dummyOroundImage = await loadErrorImage("sizeCode error");
      const tmp = newCanvas(500, 500);
      tmp.ctx.drawImage(dummyOroundImage, 0,0,500,500);
      tmp.canvas.createJPEGStream({
        quality: 1,
        progressive: true,
        chromaSubsampling: false,
      }).pipe(res);
    }

  } catch (error) {
    console.log("on server error");
    console.log(error);
  }
}
