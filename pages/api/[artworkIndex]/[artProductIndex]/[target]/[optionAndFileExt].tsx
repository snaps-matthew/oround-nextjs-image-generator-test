import type { NextApiRequest, NextApiResponse } from 'next';
import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductEditInfo} from "apiResources/api/getProductEditInfo";
import generateThumbnail from 'apiResources/services/generateThumbnail/proc/generateThumbnail';
import { getScale, getSelectedScene } from 'apiResources/utils/getSelectedScene';
import { loadErrorImage } from 'apiResources/utils/loadImage'
import { EventProductList } from 'apiResources/constants/EventProductRef';
import { eventProductDisplayer } from 'apiResources/utils/eventProductDisplayer';


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
    const groupDelimiterName = productEditInfo.groupDelimiterName
    const scene = getSelectedScene(productEditInfo, optionInfo);

    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');

    if(scene){
      const thumbnailImage = await generateThumbnail(scene, getScale(groupDelimiterName));

      // 이벤트 상품 확인
      if (EventProductList.includes(productEditInfo.productCode)) {
        res.status(HttpResponseStatusCode.SUCCESS);
        res.setHeader("content-type", 'text/html');

        const eventProduct = eventProductDisplayer(productEditInfo.productCode, artProductIndex, thumbnailImage, target);
        res.end(`<img src='${eventProduct}' />`);
      }

      const imageComposer = await generateImage({ thumbnailImage, target, productEditInfo, optionInfo, scene })
      imageComposer.stream().pipe(res);
    }else{
      const errorImageCanvas = await loadErrorImage("scene error");
      errorImageCanvas.createJPEGStream({
        quality: 1,
        progressive: true,
        chromaSubsampling: false,
      }).pipe(res);
    }

  } catch (error) {
    console.log("-=-on server error-=-", error);
    const errorImageCanvas = await loadErrorImage("on server error");
    errorImageCanvas.createJPEGStream({
      quality: 1,
      progressive: true,
      chromaSubsampling: false,
    }).pipe(res);
  }
}
