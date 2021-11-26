import { getArtworkReszied, imageDstOut, getArtworkOnModel } from 'apiResources/utils/artworkImageCreator';

export const createImageOfStoreDetail_2 = async (props:any) => {
  const { patternSrcCoords, patternDstCoords, categoryName, productPath, productCode } = props;

  // (1) 아트워크 리사이징
  await getArtworkReszied(patternSrcCoords, patternDstCoords, categoryName);

  // (2) 아트워크 마스킹 => 틴케이스의 경우, 아트워크 코너들을 둥글게 잘라줘야 한다
  await imageDstOut(productPath, productCode);

  // (3) 상품 위에 올리기
  return await getArtworkOnModel(productPath, productCode);
}
