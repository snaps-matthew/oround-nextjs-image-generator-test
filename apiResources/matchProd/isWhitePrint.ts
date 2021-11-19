import CATEGORY_CODE from 'apiResources/constants/CategoryCode'

export const isWhitePrint = (categoryCode:any) => {
  let isShow = false

  switch (categoryCode){
    case CATEGORY_CODE.TRANS_BUSINESS_CARD:
      isShow = true
      break

    default:
      break
  }
  return isShow
}
