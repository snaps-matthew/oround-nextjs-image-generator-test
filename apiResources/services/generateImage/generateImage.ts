import CategoryCode from "apiResources/constants/CategoryCode";
import Frame from "apiResources/services/generateImage/Frame/Frame";
import Polaroid from "apiResources/services/generateImage/Polaroid/Polaroid";
import PinButton from "./PinButton/PinbButton";
import {Image} from "canvas";
import Apparel from 'apiResources/services/generateImage/Apparel/Apparel';
import TinCase from 'apiResources/services/generateImage/TinCase/TinCase';
import SmartTok from 'apiResources/services/generateImage/SmartTok/SmartTok';
import PhoneCase from 'apiResources/services/generateImage/PhoneCase/PhoneCase';
import CanvasFrame from 'apiResources/services/generateImage/CanvasFrame/CanvasFrame'
import WoodFrame from 'apiResources/services/generateImage/WoodFrame/WoodFrame'
import Sticker from 'apiResources/services/generateImage/Sticker/Sticker'
import AcrylicStand from 'apiResources/services/generateImage/AcrylicStand/AcrylicStand'
import AcrylicKeyring from 'apiResources/services/generateImage/AcrylicKeyring/AcrylicKeyring'
import Airpods from 'apiResources/services/generateImage/Airpods/Airpods'
import AirPodsPro from 'apiResources/services/generateImage/AirPodsPro/AirPodsPro'
import BuzCase from 'apiResources/services/generateImage/BuzCase/BuzCase'

export const generateImage = async (props: {
  thumbnailImage:any, target:string, productEditInfo:any, optionInfo:any,
}) => {

  let imageComposer: any;
  switch (props.productEditInfo.groupDelimiterName) {
    // case 'apparel':
    //   imageComposer = new Apparel();
    //   break;
    // case 'smartTok':
    //   imageComposer = new SmartTok();
    //   break;
    case 'tinCase':
      imageComposer = new TinCase();
      break;
    // case 'frame': // free size
    //   imageComposer = new Frame();
    //   break;
    // case 'canvasFrame': // free size
    //   imageComposer = new CanvasFrame();
    //   break;
    // case 'woodFrame': // free size
    //   imageComposer = new WoodFrame();
    //   break;
    // case 'sticker': // free size
    //   imageComposer = new Sticker();
    //   break;
    // case 'acrylicStand': // free size
    //   imageComposer = new AcrylicStand();
    //   break;
    // case 'acrylicKeyring': // free size
    //   imageComposer = new AcrylicKeyring();
    //   break;
    case 'phoneCase':
      imageComposer = new PhoneCase();
      break;
    case 'airpods':
      imageComposer = new Airpods();
      break;
    case 'airpodsPro':
      imageComposer = new AirPodsPro();
      break;
    case 'buzCase':
      imageComposer = new BuzCase();
      break;
    default:
      break;
  }

  await imageComposer.init(props);
  await imageComposer.composite();
  return imageComposer;
}
