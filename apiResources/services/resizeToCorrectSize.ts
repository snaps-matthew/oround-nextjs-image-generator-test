// 인터페이스 통해서 가져온 사이즈 값 mm, px를 멀티폼 이미지에 맞춰 재정의 ( directionCode 에 따라 사이즈는 같지만 가로 세로 방향을 다르게 저장할 수도 있다.)
export const resizeToCorrectSize = (productSize: any, width: number, height: number): void => {
  productSize.pixelWidth = width;
  productSize.pixelHeight = height;

  const isVertical = productSize.pixelWidth < productSize.pixelHeight;
  const offsetMaxSize = Math.max(productSize.millimeterWidth, productSize.millimeterHeight);
  const offsetMinSize = Math.min(productSize.millimeterWidth, productSize.millimeterHeight);
  const maxSize = Math.max(productSize.displaymmWidth, productSize.displaymmHeight);
  const minSize = Math.min(productSize.displaymmWidth, productSize.displaymmHeight);

  productSize.millimeterWidth = isVertical ? offsetMinSize : offsetMaxSize;
  productSize.millimeterHeight = isVertical ? offsetMaxSize : offsetMinSize;
  productSize.displaymmWidth = isVertical ? minSize : maxSize;
  productSize.displaymmHeight = isVertical ? maxSize : minSize;
}
