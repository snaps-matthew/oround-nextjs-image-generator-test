// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import HttpResponseStatusCode from "apiResources/constants/HttpResponseStatusCode";
import {validationParams} from "apiResources/utils/validationParams";
import {getTemplateImagePath} from "apiResources/api/getTemplateImagePath";
import {generateImage} from "apiResources/services/generateImage/generateImage";
import {getProductSizeInfo} from "apiResources/api/getProductSizeInfo";
import saveMultiformProc from "apiResources/services/generateThumbnail/saveMultiformProc";
import productGroupList from "apiResources/constants/ProdType";
import LayerOrderRef from "apiResources/constants/LyaerOrderRef";
import prodInfo from "apiResources/constants/ProdInfo";
import * as fs from 'fs';
import {createCanvas} from "canvas";
import {getArtworkReszied, getImageWrinkled} from "apiResources/utils/artworkImageCreator";
import {imageTextSaver} from "apiResources/utils/imageTextSaver";

interface IGenerateImageRequestQuery {
  productCode: string
  templateCode: string
  paperCode: string
  backCode: string
  target: string
  optionAndFileExt: string
  artProductIndex: string
  directionCode: string
  sizeCode: string
  productOption: string
}

const REQUEST_API_KEY_NAMES = [
  "productCode",
  "templateCode",
  "paperCode",
  "backCode",
  "target",
  "optionAndFileExt",
  "artProductIndex",
  "directionCode",
  "sizeCode",
  "productOption",
];

const getRequestQuery = (requestQuery: { [key: string]: string | string[] }): IGenerateImageRequestQuery => {
  return REQUEST_API_KEY_NAMES.reduce((acc, keyName): IGenerateImageRequestQuery => {
    const targetValue = requestQuery[keyName];
    let value = "";
    if (targetValue instanceof Array) {
      value = targetValue[0] || "";
    } else {
      value = targetValue;
    }
    // @ts-ignore
    acc[keyName] = value;
    return acc;
  }, {
    productCode: "",
    templateCode: "",
    paperCode: "",
    backCode: "",
    target: "",
    optionAndFileExt: "",
    artProductIndex: "",
    directionCode: "",
    sizeCode: "",
    productOption: "",
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("DEBUG : handler");
    console.log(req.query);
    let {
      productCode,
      templateCode,
      paperCode,
      backCode,
      target,
      optionAndFileExt,
      artProductIndex,
      directionCode,
      sizeCode,
      productOption,
    } = getRequestQuery(req.query);
    console.log("DEBUG : 1");
    const categoryCode = productCode.slice(0, 3);
    let imagePathList = await getTemplateImagePath(templateCode, paperCode, backCode);
    let productSizeInfo = await getProductSizeInfo(productCode, templateCode);

    console.log("DEBUG : 1");
    //임시 테스트용 데이터
    productOption = productOption ? `${productOption?.split(',').join('/')}` : '';
    const productEditInfo = {
      "edit":[
        {
          "type": "frontMiddle",
          "subType": "",
          "width": 575,
          "height": 388,
          "printCount": 0,
          "hiddenIdx": 0,
          "templateCode": "",
          "side": "front",
          "object": [
            {
              'alpha': 1,
              'angle': 0,
              'height': 198,
              'imageSequence': "",
              'middleImagePath': "",
              'name': "",
              'overPrint': false,
              'resourceId': "judy_cp_55001",
              'source': "template",
              'subType': "",
              'textileColor': "#ff00ff",
              'type': "sticker",
              'whitePrint': false,
              'width': 209,
              'x': 98,
              'y': 235,
              'original': {'height': 0, 'width': 0}
            },
            {
              'alpha': 1,
              'angle': 0,
              'fillColor': "",
              'fixedSize': false,
              'height': 169,
              'isBigFile': false,
              'name': "",
              'overPrint': false,
              'readOnly': false,
              'source': "template",
              'subType': "image",
              'textileColor': "#ff00ff",
              'type': "image",
              'whitePrint': false,
              'width': 352,
              'x': 51,
              'y': 39,
              'border':{
                'imageId': "",
                'imageOffset': "",
                'imagePath': "",
                'maskId': "",
                'maskPath': "",
                'singleAlpha': 1,
                'singleColor': "",
                'singleThickness': 5,
                'type': "",
              },
              'filter': {'name': "", 'code': ""},
              'innerImage': {'height': 234, 'alpha': 1, 'width': 352, 'angle': 0, 'x': 0, 'y': -32.5},
              'original': {
                'date': "",
                'height': 4000,
                'imageSequence': "",
                'middleImagePath': "design/resource/ContentsResource/edit/irene_bi_63594.jpg",
                'orientation': "",
                'resourceId': "irene_bi_63594",
                'width': 6000,
              }
            },
          ]
        },
        {
          "@type": "backMiddle",
          "@subType": "",
          "@width": 400,
          "@height": 450,
          "@printCount": 0,
          "@hiddenIdx": 0,
          "@templateCode": "",
          "@side": "front",
          "object": [
            {
              "@type": "background",
              "@subType": "color",
              "@source": "template",
              "@name": "",
              "@width": 400,
              "@height": 450,
              "@x": 0,
              "@y": 0,
              "@angle": 0,
              "@alpha": 1,
              "@bgColor": "#FFFFFF",
              "@imageSequence": "",
              "@middleImagePath": "",
              "@resourceId": "",
              "@whitePrint": false,
              "@overPrint": false
            }]
        }
      ],
      productCode,
      productOption,
      "size": [
        {
          "code": "167002",
          "name": "front",
          "horizontalSizePx": 400.0,
          "verticalSizePx": 454.0,
          "horizontalSizeMm": 300.0,
          "verticalSizeMm": 340.0
        },
        {
          "code": "167004",
          "name": "back",
          "horizontalSizePx": 400.0,
          "verticalSizePx": 454.0,
          "horizontalSizeMm": 300.0,
          "verticalSizeMm": 340.0
        }
      ]
    }
    optionAndFileExt = 'front'
    console.log("DEBUG : 2");
    let thumbnailImage = await saveMultiformProc(productEditInfo, categoryCode, optionAndFileExt)
    const imageData:any = thumbnailImage.toDataURL();
    const artworkSize:any = [productEditInfo.edit[0].width, productEditInfo.edit[0].height];

    const dataSet:any = {
      // productCode: productEditInfo.productCode,
      // productType: productGroupList[productEditInfo.productCode],
      // layerOrder: LayerOrderRef[productEditInfo.productCode][`${gender}/${productEditInfo.edit[0].side}`],
      // productOption: `${gender}/${productEditInfo.edit[0].side}`,
      // psdPath: `/Users/david/Desktop/APPAREL_test/${productEditInfo.productCode}/${gender}/${productEditInfo.edit[0].side}/${productEditInfo.productCode}.psd`,
      // patternPath: `inline:src/resources/patternImage.txt`,
      // productPath: `/Users/david/Desktop/APPAREL_test/${productEditInfo.productCode}/${gender}/${productEditInfo.edit[0].side}`,
      // colorCodes: prodInfo[productEditInfo.productCode] ? prodInfo[productEditInfo.productCode].productColor : null,
      // categoryCode,
      // paperCode,
      // backCode,
      // target,
      // optionAndFileExt,
      // imageData

      productCode,
      productType: productGroupList[productCode],
      productOption,
      layerOrder: LayerOrderRef[productCode] ? LayerOrderRef[productCode][productOption] : [],
      // psdPath: `/Users/david/Desktop/SMARTTOK/${productEditInfo.productCode}/${productOption ? productOption + '/' : ''}${productEditInfo.productCode}.psd`,
      psdPath: null,
      patternPath: 'https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-01.jpg',
      // productPath: `/Users/david/Desktop/SMARTTOK/${productEditInfo.productCode}${productOption ? '/' + productOption : ''}`,
      productPath: `https://cdn.ohprint.me/design/resource/Model3d/SMARTTOK/${productCode}/${productOption}`,
      colorCodes: prodInfo[productCode] ? prodInfo[productCode].productColor : null,
      categoryCode,
      paperCode,
      backCode,
      target,
      optionAndFileExt,
      imageData,
      artworkSize
    }

    console.log("DEBUG : 3");

    const imageCanvas = await generateImage(dataSet);

    // res.status(HttpResponseStatusCode.SUCCESS);
    // res.setHeader("content-type", 'image/png');
    // imageCanvas.createPNGStream().pipe(res);

    console.log("DEBUG : 4");
    res.send(`<html><body><img height="800px" src='data:image/png;base64, ${imageCanvas}' alt='hi' /></body></html>`)
  } catch (error) {
    console.log("DEBUG : ERROR");
    console.log(error);
    res.send("Error");
  }
}
