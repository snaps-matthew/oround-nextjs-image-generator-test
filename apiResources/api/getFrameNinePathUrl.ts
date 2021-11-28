import { API_URL } from 'apiResources/constants/apiURL'

export const getFrameNinePathUrl = (productCode: string) => {
  return [
    'top_left', 'top_center', 'top_right',
    'middle_left', 'middle_right',
    'bottom_left', 'bottom_center', 'bottom_right'
  ].reduce((acc: any, item) => {
    acc[item] = `${API_URL.DOMAIN_RESOURCE}artwork-editor/resource/product/${productCode}/${item}.png`;
    return acc;
  }, {});
};
