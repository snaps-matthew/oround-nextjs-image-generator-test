import productInfo, { OffsetState, WrapperState } from 'apiResources/constants/productInfo';
import { sceneTypeName } from 'apiResources/constants/sceneType';


export const getOffset = (productCode: string, printPositionCode: string): OffsetState => {
  const positionName = sceneTypeName[printPositionCode];
  const { offset } = productInfo[productCode];
  return offset? offset[positionName] : {top: 0, left: 0};
};

export const getWrapperSize = (productCode: string): WrapperState => {
  return productInfo[productCode] &&
    (productInfo[productCode].wrapperSize || {width: 0, height: 0});
};
