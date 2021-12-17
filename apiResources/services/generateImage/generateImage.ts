import Frame from "apiResources/services/generateImage/Frame/Frame";
import Apparel from 'apiResources/services/generateImage/Apparel/Apparel';
import TinCase from 'apiResources/services/generateImage/TinCase/TinCase';
import SmartTok from 'apiResources/services/generateImage/SmartTok/SmartTok';
import PhoneCase from 'apiResources/services/generateImage/PhoneCase/PhoneCase';
import WoodFrame from 'apiResources/services/generateImage/WoodFrame/WoodFrame'
import Sticker from 'apiResources/services/generateImage/Sticker/Sticker'
import AcrylicStand from 'apiResources/services/generateImage/AcrylicStand/AcrylicStand'
import AcrylicKeyring from 'apiResources/services/generateImage/AcrylicKeyring/AcrylicKeyring'
import Airpods from 'apiResources/services/generateImage/Airpods/Airpods'
import AirPodsPro from 'apiResources/services/generateImage/AirPodsPro/AirPodsPro'
import BuzCase from 'apiResources/services/generateImage/BuzCase/BuzCase'
import Note from 'apiResources/services/generateImage/Note/Note'
import Card from 'apiResources/services/generateImage/Card/Card'
import Button from 'apiResources/services/generateImage/Button/Button'
import TargetType from 'apiResources/constants/TargetType';
import ProductCode from '../../constants/ProductCode';
export const generateImage = async (props: {
  thumbnailImage:any, target:string, productEditInfo:any, optionInfo:any, scene:any
}) => {

  let imageComposer: any;
  let groupDelimiterName = props.productEditInfo.groupDelimiterName
  if(props.productEditInfo.productCode === ProductCode.FRAME_ALUMINIUM){
    groupDelimiterName = 'woodFrame';
  }
  switch (groupDelimiterName) {
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
    case 'canvasFrame': // free size
      imageComposer = new Frame();
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
    case 'hardPhoneCase':
    case 'clearPhoneCase':
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
    case 'button':
      imageComposer = new Button();
      break;
    case 'note':
      imageComposer = new Note();
      break;
    case 'card':
      imageComposer = new Card();
      break;
    default:
      break;
  }

  await imageComposer.init(props);

  await imageComposer.composite();

  return imageComposer;
}
