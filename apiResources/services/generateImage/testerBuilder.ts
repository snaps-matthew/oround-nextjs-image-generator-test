import * as fs from 'fs';
import buildCommand from "./buildCommandCopy";



const productGroupList:any = {
  '1040110001': { category: 'PIN_BUTTON', type: 'PIN' },
  '1040110002': { category: 'PIN_BUTTON', type: 'PIN' },
  '1040110003': { category: 'PIN_BUTTON', type: 'PIN' },
  '1040120001': { category: 'MIRROR_BUTTON', type: 'MIRROR' },
  '1040130001': { category: 'MAGNET_BUTTON', type: 'MAGNET' },
  '1040130002': { category: 'MAGNET_BUTTON', type: 'MAGNET' },
  '1040130003': { category: 'MAGNET_BUTTON', type: 'MAGNET' },
  '1040060001': { category: 'TINCASE', type: 'TINCASE' },
  '1050010001': { category: 'APPAREL', type: 'APPAREL' },
  '1050010002': { category: 'APPAREL', type: 'APPAREL' },
  '1050010003': { category: 'APPAREL', type: 'APPAREL' },
  '1050010004': { category: 'APPAREL', type: 'APPAREL' },
  '1050010005': { category: 'APPAREL', type: 'APPAREL' },
  '1050010006': { category: 'APPAREL', type: 'APPAREL' },
  '1050020001': { category: 'APPAREL', type: 'APPAREL' },
  '1050020002': { category: 'APPAREL', type: 'APPAREL' },
  '1050030001': { category: 'APPAREL', type: 'APPAREL' },
  '1050030002': { category: 'APPAREL', type: 'APPAREL' },
  '1050030003': { category: 'APPAREL', type: 'APPAREL' },
  '1050030004': { category: 'APPAREL', type: 'APPAREL' },
  '1050040001': { category: 'APPAREL', type: 'APPAREL' },
  '1050050001': { category: 'APPAREL', type: 'APPAREL' },
  '1050050002': { category: 'APPAREL', type: 'HOODIE' },
  '1050050003': { category: 'APPAREL', type: 'HOODIE' },
  '1050060001': { category: 'APPAREL', type: 'HOODIE' },
  '1050060002': { category: 'APPAREL', type: 'HOODIE' },
  '1050060003': { category: 'APPAREL', type: 'APPAREL' },
  '1050070001': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070002': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070003': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070004': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070005': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070006': { category: 'APPAREL', type: 'ECOBAG' },
  '1050070007': { category: 'APPAREL', type: 'APPAREL' },
  '1050080001': { category: 'APPAREL', type: 'APPAREL' },
  '1050080002': { category: 'APPAREL', type: 'APPAREL' },
}

const layerOrderRef:any = {
  'PIN': ['back', 'front', 'PatternModified', 'pin', 'glare',],
  'MIRROR': ['back', 'front', 'PatternModified', 'mirror', 'glare',],
  'MAGNET': ['back', 'front', 'PatternModified', 'magnet', 'glare',],
  'STANDARD': [],
  'HOODIE': ['PatternModified', 'hoodie'],
  'TINCASE': []
}

const projectList = [
  // pin
  // '1040110001_32',
  // '1040110001_38',
  // '1040110001_44',
  // '1040110001_58',
  // '1040110001_75',
  // '1040110002_37',
  // '1040110002_50',
  // '1040110003_57',

  // mirror
  // '1040120001_58',
  // '1040120001_75',

  // magnet
  // '1040130001_32',
  // '1040130001_38',
  // '1040130001_44',
  // '1040130001_58',
  // '1040130002',
  // '1040130003',

  // tincase
  // '1040060001_L',
  // '1040060001_M',
  // '1040060001_S',

  // apparel
  // '1050010001',
  // '1050010002',
  // '1050010003',
  // '1050010004',
  // '1050010005',
  // '1050010006',
  // '1050020001',
  // '1050020002',
  // '1050030001',
  // '1050030002',
  // '1050030003',
  // '1050030004',
  // '1050040001',
  // '1050050001',
  // '1050050002',
  // '1050050003',
  // '1050060001',
  // '1050060002',
  // '1050060003',
  // '1050070001_L',
  // '1050070001_M',
  // '1050070001_S',
  // '1050070002',
  // '1050070003',
  // '1050070004',
  // '1050070005',
  '1050070006',
  // '1050070007',
  // '1050080001',
  // '1050080002_L',
  // '1050080002_M'
]

for (let i=0; i < projectList.length; i++) {
  const productCode = projectList[i];
  const productCategory = productGroupList[productCode.split('_')[0]].category;
  const productType = productGroupList[productCode.split('_')[0]].type;
  // const productColor = ['black', 'white', 'silver'];
  const productColor:string[] = [];
  const productOption = '_F';
  // const psdPath = `/Volumes/OHPRINTME_DESIGN_NEW/oroundFinalImages/${productCategory}/${projectList[i]}/${projectList[i]}.psd`;
  // const savePath = `/Volumes/OHPRINTME_DESIGN_NEW/oroundFinalImages/${productCategory}/${projectList[i]}`;
  const psdPath = `/Volumes/OHPRINTME_DESIGN_NEW/oroundFinalImages/${productCategory}/${projectList[i]}/${projectList[i]}${productOption}/${projectList[i]}.psd`;
  const savePath = `/Volumes/OHPRINTME_DESIGN_NEW/oroundFinalImages/${productCategory}/${projectList[i]}/${projectList[i]}${productOption}`;

  // 패턴 = 아트워크 이미지 경로
  const patternPath = '/Users/david/Desktop/snoopySquare.png';
  const layerOrder = layerOrderRef[productGroupList[productCode.split('_')[0]].type];

  const prodCodeImported = JSON.parse(fs.readFileSync('productCodes.json', 'utf-8'));

  const colorCodes = prodCodeImported[productCode] ? prodCodeImported[productCode].productColor : null;

  interface dataSet {
    productCategory: any,
    productType: any,
    productCode: string,
    productColor: any,
    productOption: string,
    psdPath: string,
    savePath: string,
    patternPath: string,
    layerOrder: any,
    colorCodes: any
  }

  const dataSet:any = {
    productCategory,
    productType,
    productCode,
    productColor,
    productOption,
    psdPath,
    savePath,
    patternPath,
    layerOrder,
    colorCodes
  }

  const imageBuilder = new buildCommand(dataSet);

  if (productCategory === 'APPAREL') {
    imageBuilder.getApparelResult();
  }
  else {
    imageBuilder.getOthersResult();
  }
}
