import TargetType from "apiResources/constants/TargetType";

import {loadImages} from "apiResources/services/loadImages";
import {setDisplayMM} from "apiResources/services/setDisplayMM";
import {removeCuttingLine} from "apiResources/services/removeCuttingLine";
import ImageCanvas from "apiResources/services/generateImage/ImageCanvas";
import {resizeToCorrectSize} from "apiResources/services/resizeToCorrectSize";
import {createImageOfStoreList} from "apiResources/services/generateImage/Polaroid/createImageOfStoreList";
import {createImageOfStoreDetail_1} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_1";
import {createImageOfStoreDetail_0} from "apiResources/services/generateImage/Polaroid/createImageOfStoreDetail_0";

import buildCommand from "apiResources/services/generateImage/buildCommand"

class PinbButton extends ImageCanvas {
  constructor() {
    super();
  }

  async composite() {

    const projecList = [
      '1040110001_32',
      '1040110001_38',
      '1040110001_44',
      '1040110001_58',
      '1040110001_75',
      '1040110002_37',
      '1040110002_50',
      '1040110003_57'
    ]

    const final = async (dataSet:any) => {
      const pinbutton = new buildCommand(dataSet);
      await pinbutton.getPSDInfo('PINBUTTON');
      await pinbutton.buildTempImages();
      await pinbutton.mergeLayers();
      await pinbutton.overlayCutter();
      await pinbutton.finalize();
      // await pinbutton.addCoordinateData();
    }

    for (let i=0; i < projecList.length; i++) {
      const productName = 'pinbutton';
      const productCode = projecList[i];
      const productColor = '';
      const psdPath = `src/resources/PinButton/1040110001_32.psd`;
      const savePath = `src/resources/PinButton/`;
      const patternPath = 'src/resources/PinButton/1040110001_32.png';
      const layerOrder = [
        'back',
        'front',
        'PatternModified',
        'pin',
        'glare',
      ];

      const pinbuttonData = {
        productName,
        productCode,
        productColor,
        psdPath,
        savePath,
        patternPath,
        layerOrder,
      }

      final(pinbuttonData);
    }

  }
}

export default PinbButton;
