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
  artProductIndex: string
  sizeCode: string
  optionAndFileExt: string
}

const getPathParams = (requestQuery: { [key: string]: string | string[] }): IRequestQuery => {
  return Object.keys(requestQuery).reduce((acc, keyName): IRequestQuery => {
    let targetValue = requestQuery[keyName];
    if (targetValue instanceof  Array) {
      targetValue = requestQuery[keyName][0];
    }
    // @ts-ignore
    acc[keyName] = targetValue;
    return acc;
  }, {
    artProductIndex: "",
    sizeCode: "",
    optionAndFileExt: ""
  });
}
// interface IRequest
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      artProductIndex,
      sizeCode,
      optionAndFileExt,
    } = getPathParams(req.query);
    let optionAndFileExtArr = optionAndFileExt.split(',');
    let productEditInfo = await getProductEditInfo(artProductIndex, sizeCode);
    let productCode = productEditInfo.productCode;
    const optionInfo = getOptionInfo(optionTypeInfo, productCode, optionAndFileExtArr);
    const targetAndFileExt = optionAndFileExtArr[optionAndFileExtArr.length -1] ;
    let thumbnailImage = await saveMultiformProc(productEditInfo, optionInfo, targetAndFileExt);
    // const imageComposer = await generateImage({ categoryCode, productCode, })
    console.log(productEditInfo)
    res.status(HttpResponseStatusCode.SUCCESS);
    res.setHeader("content-type", 'image/png');
    thumbnailImage.createPNGStream().pipe(res);

    // let thumbnailImage = await saveMultiformProc(productEditInfo, categoryCode, optionAndFileExt)
    // const imageData:any = thumbnailImage.toDataURL();
    // const artworkSize:any = [productEditInfo.edit[0].width, productEditInfo.edit[0].height];
//=========================start
    const artworkData = {
      x: 0,
      y: 40,
      width: 400,
      height: 373,
      path: `https://cdn.oround.com/artwork/2021/OCTOBER/20/21192/ED/cC9PAQ-20211020142757553.png`
    }

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
