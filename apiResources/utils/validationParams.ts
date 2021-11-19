import ProductCode from "apiResources/constants/ProductCode";
import TargetType from "apiResources/constants/TargetType";
import SupportImageExt from "apiResources/constants/SupportImageExt";

import {InvalidRequest} from "apiResources/utils/GeneralError";

export const validationParams = (props: { productCode: string, paperCode: string, backCode: string, target: string, optionAndFileExt: string }): void => {
  const {productCode, paperCode, backCode, target, optionAndFileExt} = props

  if(paperCode.length !== 6){
    throw InvalidRequest(paperCode);
  }

  if(backCode.length !== 6){
    throw InvalidRequest(backCode);
  }

  const isSupportProductCode = Object.values(ProductCode).reduce((acc, item): boolean => acc || productCode === item, false);
  if (!isSupportProductCode) {
    throw InvalidRequest(productCode);
  }

  const isSupportTarget = Object.values(TargetType).reduce((acc, item): boolean => acc || target === item, false);
  if (!isSupportTarget) {
    throw InvalidRequest(target);
  }

  const [option, ext] = optionAndFileExt.split(".");
  const isSupportExt = Object.values(SupportImageExt).reduce((acc, item): boolean => acc || ext === item, false);
  if (!isSupportExt) {
    throw InvalidRequest(ext);
  }
}
