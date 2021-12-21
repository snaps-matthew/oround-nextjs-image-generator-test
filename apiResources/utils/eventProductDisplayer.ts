import Config from 'apiResources/constants/Config';
import TargetType from 'apiResources/constants/TargetType';

export const eventProductDisplayer = (productCode:string, artProductIndex:string, thumbnailImage:any, target:string) => {

  const basePath = `${Config.RESOURCE_CDN_URL}/${productCode}/${artProductIndex}`;
  switch (target) {
    case TargetType.STORE_LIST_1:
    case TargetType.STORE_DETAIL_3:
      return `${basePath}/list.png`;
    case TargetType.STORE_DETAIL_2:
      return `${basePath}/view.png`;
    case TargetType.STORE_DETAIL_4:
      return thumbnailImage;
  }
}
