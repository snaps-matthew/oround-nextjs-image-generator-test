import Frame from "apiResources/services/generateImage/Frame/Frame";
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
import Note from 'apiResources/services/generateImage/Note/Note'
import Card from 'apiResources/services/generateImage/Card/Card'
import Button from 'apiResources/services/generateImage/Button/Button'
import TargetType from 'apiResources/constants/TargetType';
import ProductCode from '../../constants/ProductCode';
export const generateImage = async (props: {
  thumbnailImage:any, target:string, productEditInfo:any, optionInfo:any
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
  // 리스트 1 이미지 임시로 내림
  //if ((props.target == TargetType.STORE_LIST_1 || props.target == TargetType.STORE_DETAIL_2) && ['tinCase', 'smartTok', 'button', 'apparel'].includes(props.productEditInfo.groupDelimiterName)) {
  if ((props.target == TargetType.STORE_DETAIL_2) && ['tinCase', 'smartTok', 'apparel'].includes(props.productEditInfo.groupDelimiterName)) {
    return await imageComposer.composite();
  } else if (props.target == TargetType.STORE_DETAIL_2 && props.productEditInfo.groupDelimiterName === 'button') {
    await imageComposer.composite();
  } else if ((props.target == TargetType.STORE_LIST_1) && ['smartTok'].includes(props.productEditInfo.groupDelimiterName)) {
    return await imageComposer.composite();
  } else {
    await imageComposer.composite();
  }
  return imageComposer;
}
