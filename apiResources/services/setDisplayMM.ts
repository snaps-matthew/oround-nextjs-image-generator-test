export const setDisplayMM = (productSize: any, offset: number, freeSizeVal:string='') :void => {
  const offset2x = offset * 2;

  if(freeSizeVal){
    const [displayWidth, displayHeight] = freeSizeVal.split('x');
    if(freeSizeVal){
      productSize.millimeterWidth = Number(displayWidth) + offset2x;
      productSize.millimeterHeight = Number(displayHeight) + offset2x;
      productSize.displaymmWidth = Number(displayWidth);
      productSize.displaymmHeight = Number(displayHeight);
    }

  } else if(!productSize.displaymmWidth){
    productSize.displaymmWidth = productSize.millimeterWidth - offset2x;
    productSize.displaymmHeight = productSize.millimeterHeight - offset2x;
  }
}
