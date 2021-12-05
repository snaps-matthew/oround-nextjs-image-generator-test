import Config from 'apiResources/constants/Config';

export const getFrameColorUrl = (productCode: string, primaryColorCode: string) => {
  return ['left', 'top', 'bottom', 'right'].reduce((acc: any, item) => {
    acc[item] = `${Config.DOMAIN_RESOURCE}artwork-editor/resource/product/${productCode}/${primaryColorCode}_${item}.jpg`;
    return acc;
  }, {});
};
