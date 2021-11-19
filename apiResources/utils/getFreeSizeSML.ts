export const getFreeSizeSML = (inputWidth: number, inputHeight: number) => {
  const limitSize = 200;                   // 제작불가 사이즈
  const sizeNameList = ['S', 'M', 'L'];    // 상품 버튼 명칭
  const longRangeList = [420, 594, 841];   // 사이즈 입력시 기준이 되는 가장 긴 값
  const shortRangeList = [297, 420, 594];  // 사이즈 입력시 기준이 되는 가장 짧은 값
  const baseWidth = longRangeList[2];      // 최대 상품 사이즈 (A1) - 비율 구하기 위한 용도
  const baseHeight = shortRangeList[2];    // 최대 상품 사이즈 (A1)
  let baseSize = [];                       // longRangeList, shortRangeList 중 기준이 될 값
  let isHorizontal = true;                 // 가로 세로 중 기준 될 변
  const supportSize = []                   // 사용자에게 제공될 최종 제공 사이즈

  if (inputWidth > inputHeight) {
    if(inputWidth / inputHeight < baseWidth / baseHeight){
      baseSize = shortRangeList;
      isHorizontal = false
    } else {
      baseSize = longRangeList;
    }

  } else {
    if(inputWidth / inputHeight < baseHeight / baseWidth){
      baseSize = longRangeList;
      isHorizontal = false
    } else {
      baseSize = shortRangeList;
    }
  }

  for(let i = 0; i < 3; i++){
    if(isHorizontal){
      const height = Math.round(inputHeight * baseSize[i] / inputWidth)
      if(height >= limitSize && inputWidth >= baseSize[i]){
        supportSize.push({width: baseSize[i], height, name: sizeNameList[i]})
      }

    } else {
      const width = Math.round(inputWidth * baseSize[i] / inputHeight)
      if(width >= limitSize && inputHeight >= baseSize[i]){
        supportSize.push({width, height: baseSize[i], name: sizeNameList[i]})
      }
    }
  }

  /**
   * inputWidth: 841
   * inputHeight: 450
   [
     { width: 420, height: 225, name: 'S' },
     { width: 594, height: 318, name: 'M' },
     { width: 841, height: 450, name: 'L' }
   ]
   */
  return supportSize
}




//
// export const getFreeSizeSML = (inputWidth: number, inputHeight: number) => {
//   inputWidth = 841
//   inputHeight = 450
//
//   const limitSize: number = 200;
//   const sizeNameList: string[] = ['S', 'M', 'L']
//   const longRangeList: number[] = [420, 594, 841]
//   const shortRangeList: number[] = [297, 420, 594]
//   const baseWidth: number = longRangeList[2];
//   const baseHeight: number = shortRangeList[2];
//
//   let sizeName: string = ''
//   let baseSize: number[] = []
//   let baseDirectionSize: number = 0
//   let isHorizontal: boolean = true
//
//   if (inputWidth > inputHeight) {
//     if(inputWidth / inputHeight < baseWidth / baseHeight){
//       baseSize = shortRangeList;
//       baseDirectionSize = inputHeight;
//       isHorizontal = false
//     } else {
//       baseSize = longRangeList;
//       baseDirectionSize = inputWidth;
//     }
//
//   } else {
//     if(inputWidth / inputHeight < baseHeight / baseWidth){
//       baseSize = longRangeList;
//       baseDirectionSize = inputHeight;
//       isHorizontal = false
//     } else {
//       baseSize = shortRangeList;
//       baseDirectionSize = inputWidth;
//     }
//   }
//
//   const supportSize = baseSize.reduce((acc: [], item: number, idx: number): any => {
//     if(isHorizontal){
//       const height: number = Math.round(inputHeight * item / inputWidth)
//       if(height >= limitSize && inputWidth >= item){
//         return {width: item, height, name: sizeNameList[idx]}
//       }
//
//     } else {
//       const width: number = Math.round(inputWidth * item / inputHeight)
//       if(width >= limitSize && inputHeight >= item){
//         return {width, height: item, name: sizeNameList[idx]}
//       }
//     }
//
//   }, [])
//
//   sizeName = baseSize.reduce((acc: string, item: number, idx: number): string => {
//     if (item === baseDirectionSize) return sizeNameList[idx]
//     return acc
//   }, '')
//
//   console.log(supportSize) // 제공사이즈
//   console.log(sizeName)   // 가로, 세로 입력한 값을 기준으로 어느 등급인지 구분
//
//   /**
//    * inputWidth: 841
//    * inputHeight: 450
//    * supportSize:
//    [
//      { width: 420, height: 225, name: 'S' },
//      { width: 594, height: 318, name: 'M' },
//      { width: 841, height: 450, name: 'L' }
//    ]
//    * sizeName: L
//    */
//
//   return { supportSize, sizeName}
// }

