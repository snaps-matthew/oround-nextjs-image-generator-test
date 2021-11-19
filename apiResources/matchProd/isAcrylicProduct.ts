import PRODUCT_CODE  from 'apiResources/constants/ProductCode'

export const isAcrylicProduct = (productCode:string) => {
  return (
    productCode === PRODUCT_CODE.ACRYLIC_KEYRING
  )
}
