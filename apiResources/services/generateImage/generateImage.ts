import CategoryCode from "apiResources/constants/CategoryCode";
import Frame from "apiResources/services/generateImage/Frame/Frame";
import Polaroid from "apiResources/services/generateImage/Polaroid/Polaroid";
import PinButton from "./PinButton/PinbButton";
import {Image} from "canvas";
import Apparel from './Apparel/Apparel';
import TinCase from './TinCase/TinCase';
import SmartTok from './SmartTok/SmartTok';

export const generateImage = async (props: {
  categoryName: string,
  productCode: string,
  target: string,
  thumbnailImage: any,
  productOption: string,
  productPath: string,
  colorCode: string,
  sizeCode: string
}) => {

  let imageComposer: any;
  switch (props.categoryName) {
    case 'apparel':
      imageComposer = new Apparel();
      break;
    case 'smarttok':
      imageComposer = new SmartTok();
      break;
    case 'tinCase':
      imageComposer = new TinCase();
      break;
  }

  await imageComposer.init(props);

  return await imageComposer.composite();
}
