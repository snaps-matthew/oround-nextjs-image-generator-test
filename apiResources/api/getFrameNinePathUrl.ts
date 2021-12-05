import Config from 'apiResources/constants/Config';

export const getFrameNinePathUrl = (productCode: string) => {
  return [
    'top_left', 'top_center', 'top_right',
    'middle_left', 'middle_right',
    'bottom_left', 'bottom_center', 'bottom_right'
  ].reduce((acc: any, item) => {
    acc[item] = `${Config.DOMAIN_RESOURCE}artwork-editor/resource/product/${productCode}/${item}.png`;
    return acc;
  }, {});
};
