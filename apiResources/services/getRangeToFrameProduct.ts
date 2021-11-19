import ProductCode from "apiResources/constants/ProductCode";

// 상품 사이즈 별로 다른 배경 이미지를 보여주기 때문에 대, 중, 소 분류 작업을 한다.
// 프리사이즈는 고정된 한변을 기준으로 분류를 한다.
// 실제 상품의 사이즈를 자르기전에 판단하기 위해 frame.ts 파일에서 실횅한다.
export const getRangeToFrameProduct = (productCode: string, productSize: any) => {
  let sizeName = ''

  switch (productCode) {
    case ProductCode.FRAME_GENERIC_4X6:
    case ProductCode.FRAME_GENERIC_5X5:
    case ProductCode.FRAME_GENERIC_5X7:
    case ProductCode.FRAME_GENERIC_8X8:
    case ProductCode.FRAME_GENERIC_8X10:
      sizeName = 'small';
      break;

    case ProductCode.FRAME_GENERIC_A3:
    case ProductCode.FRAME_GENERIC_A4:
    case ProductCode.FRAME_GENERIC_14X14:
    case ProductCode.FRAME_GENERIC_11X14:
    case ProductCode.FRAME_GENERIC_12X12:
    case ProductCode.FRAME_GENERIC_10X10:
    case ProductCode.FRAME_CANVAS_A3:
    case ProductCode.FRAME_CANVAS_A4:
    case ProductCode.FRAME_CANVAS_14X14:
    case ProductCode.FRAME_CANVAS_11X14:
    case ProductCode.FRAME_CANVAS_12X12:
    case ProductCode.FRAME_CANVAS_10X10:
      sizeName = 'medium';
      break;

    case ProductCode.FRAME_GENERIC_A1:
    case ProductCode.FRAME_GENERIC_A2:
    case ProductCode.FRAME_GENERIC_20X20:
    case ProductCode.FRAME_GENERIC_20X30:
    case ProductCode.FRAME_GENERIC_16X20:
    case ProductCode.FRAME_CANVAS_A1:
    case ProductCode.FRAME_CANVAS_A2:
    case ProductCode.FRAME_CANVAS_20X20:
    case ProductCode.FRAME_CANVAS_20X30:
    case ProductCode.FRAME_CANVAS_16X20:
      sizeName = 'large';
      break;

    case ProductCode.FRAME_GENERIC_FREE:
    case ProductCode.FRAME_CANVAS_FREE:
      const width = productSize.displaymmWidth;
      const height = productSize.displaymmHeight;

      const sizeNameList = ['medium', 'large', 'large'];    // 상품 버튼 명칭
      const longRangeList = [420, 594, 841];   // 사이즈 입력시 기준이 되는 가장 긴 값
      const shortRangeList = [297, 420, 594];  // 사이즈 입력시 기준이 되는 가장 짧은 값

      const high = Math.max(width, height);
      const low = Math.min(width, height);
      const num = Math.max(longRangeList.indexOf(high), shortRangeList.indexOf(low));
      if(num > -1) sizeName = sizeNameList[num]
      break;

    default:
      break;
  }

  return sizeName;
}


