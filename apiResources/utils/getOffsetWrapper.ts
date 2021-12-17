import { getOffset, getWrapperSize } from 'apiResources/utils/getProductInfo';
import CommonCode from 'apiResources/constants/CommonCode';

export const getOffsetWrapper = (
  productCode: string,
  printPositionCode: string,
  directionCode?: string,
  useDirection?: string
) => {
    const isHorizontal = CommonCode.DIRECTION_HORIZONTAL === directionCode;
    let offset = getOffset(productCode, printPositionCode);
    let wrapper = getWrapperSize(productCode);
    if (useDirection === 'Y' && isHorizontal) {
      offset = {
        left: Number(offset.top),
        top: Number(offset.left)
      };
      wrapper = {
        width: Number(wrapper.height),
        height: Number(wrapper.width)
      };
    }

  return { wrapper, offset };
};

// 프리뷰 리스트이미지는 고정옵션을 사용한다.
export const getPreviewOffsetWrapper = (productCode: string, printPositionCode: string) => {
  return {
    wrapperSize: getWrapperSize(productCode),
    offset: getOffset(productCode, printPositionCode)
  };
};
