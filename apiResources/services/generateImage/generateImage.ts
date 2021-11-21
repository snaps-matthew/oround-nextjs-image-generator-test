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
    case 'smartTok':
      imageComposer = new SmartTok();
      break;
    case 'tinCase':
      imageComposer = new TinCase();
      break;
    case 'frame': // free size
      imageComposer = new Frame();
      break;
    case 'canvasFrame': // free size
      imageComposer = new CanvasFrame();
      break;
    case 'woodFrame': // free size
      imageComposer = new WoodFrame();
      break;
    case 'sticker': // free size
      imageComposer = new Sticker();
      break;
    case 'acrylicStand': // free size
      imageComposer = new AcrylicStand();
      break;
    case 'acrylicKeyring': // free size
      imageComposer = new AcrylicKeyring();
      break;
    case 'phoneCase':
    case 'airpods':
    case 'airpodsPro':
    case 'buzCase':
      imageComposer = new PhoneCase();
      break;
    default:
      // imageComposer = new Common(group);
      break;
  }

  await imageComposer.init(props);

  return await imageComposer.composite();
}
