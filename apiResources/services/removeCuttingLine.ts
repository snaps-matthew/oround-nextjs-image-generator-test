import {newCanvas} from "apiResources/utils/newCanvas";

// 모든 탬플릿 이미지는 여백을 포함하고 있어 템플릿 이미지에서 여백을 제거하고 실제품과 같은 사이즈로 이미지를 만든다.
export const removeCuttingLine = (loadedImages: any, productSize: any) => {
  const imageList = [];

  for(let templateImage of loadedImages){
    const margin = productSize.millimeterWidth - productSize.displaymmWidth;
    const offset = Math.round( margin * templateImage.width / productSize.displaymmWidth);
    const halfOffset = offset / 2 ;
    const newWidth = Math.round(templateImage.width - offset);
    const newHeight = Math.round(templateImage.height - offset);
    const temp = newCanvas(newWidth, newHeight);

    temp.ctx.drawImage(templateImage, -halfOffset, -halfOffset);
    imageList.push(temp.canvas);
  }

  return imageList
}
