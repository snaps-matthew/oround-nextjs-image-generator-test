import CategoryCode from "apiResources/constants/CategoryCode";
import Frame from "apiResources/services/generateImage/Frame/Frame";
import Polaroid from "apiResources/services/generateImage/Polaroid/Polaroid";
import PinButton from "./PinButton/PinbButton";
import {Image} from "canvas";
import Apparel from './Apparel/Apparel';
import TinCase from './TinCase/TinCase';
import SmartTok from './SmartTok/SmartTok';

export const generateImage = async (props: { categoryCode: string, productCode: string, paperCode: string, backCode: string, target: string, optionAndFileExt: string; imageData: string, productSizeInfo: object, productType: string, productOption: string, psdPath: string, productPath: string, patternPath: string, patternSrcCoords: number[], patternDstCoords: number[], colorCodes: string[], layerOrder: string[], artworkSize:number[] }) => {

  let imageComposer: any;

  switch (props.categoryCode) {
    case CategoryCode.APPAREL:
      imageComposer = new Apparel();
      break;
    case CategoryCode.SMARTTOK:
      imageComposer = new SmartTok();
      break;
    case CategoryCode.TINCASE:
      imageComposer = new TinCase();
      break;
  }

  await imageComposer.init(props);
  return await imageComposer.compositeArtwork();
}
