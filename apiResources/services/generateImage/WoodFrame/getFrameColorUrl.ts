import { API_URL } from 'apiResources/constants/apiURL';

export const getFrameColorUrl = (productCode: string, primaryColorCode: string) => {
  return ['left', 'top', 'bottom', 'right'].reduce((acc: any, item) => {
    acc[item] = `${API_URL.DOMAIN_RESOURCE}artwork-editor/resource/product/${productCode}/${primaryColorCode}_${item}.jpg`;
    return acc;
  }, {});
};
