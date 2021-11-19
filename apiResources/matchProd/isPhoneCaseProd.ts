import PRODUCT_CODE from 'apiResources/constants/ProductCode'
import CATEGORY_CODE from 'apiResources/constants/CategoryCode'
export const isPhoneCaseProd = (productCode:string) => {
  return (
    productCode.slice(0,3) === CATEGORY_CODE.PHONE_CASE
  )
}

export const isUVPrintPhoneCase = (productCode:string) => {
  return (
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_21_ULTRA ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_21_PLUS ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_21 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_20_ULTRA ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_20_PLUS ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_S_20 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_NOTE_20_ULTRA ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_NOTE_20 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_NOTE_10_PLUS ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_GALAXY_NOTE_10 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_X ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_XS ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_XR ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_XS_MAX ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_11 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_11_PRO ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_11_PRO_MAX ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_12 ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_12_PRO ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_12_MINI ||
  productCode === PRODUCT_CODE.PHONE_CASE_UV_IPHONE_12_PRO_MAX
  )
}
