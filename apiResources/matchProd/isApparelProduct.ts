import CATEGORY_CODE from 'apiResources/constants/CategoryCode'

export const isApparelProduct = (productCode:string) => {
  return (
    productCode.slice(0,3) === CATEGORY_CODE.APPAREL
  )

}
