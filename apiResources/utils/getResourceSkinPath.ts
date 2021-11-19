import { API_URL } from 'apiResources/constants/apiURL'
import { API_PATH } from 'apiResources/constants/apiPath'

export const getResourceSkinDevicePath = (productCode:string, phoneColor:string) => {
  return `${API_URL.DOMAIN_RESOURCE}${API_PATH.RESOURCE_SKIN_DEVICE}${productCode}/${phoneColor}.png`
}

export const getResourceSkinEditorPath = (productCode:string, caseSkin:string, caseColor="000000") => {
  if(caseColor !== '000000') caseSkin = caseSkin + "_" + caseColor
  return `${API_URL.DOMAIN_RESOURCE}${API_PATH.RESOURCE_SKIN_EDITOR}${productCode}/${caseSkin}.png`
}

export const getResourceSkinListPath = (productCode:string, caseSkin:string, caseColor="000000") => {
  if(caseColor !== '000000') caseSkin = caseSkin + "_" + caseColor
  return `${API_URL.DOMAIN_RESOURCE}${API_PATH.RESOURCE_SKIN_LIST}${productCode}/${caseSkin}.png`
}

export const getResourceSkinDetailPath = (productCode:string, caseSkin:string, caseColor="000000") => {
  if(caseColor !== '000000') caseSkin = caseSkin + "_" + caseColor
  return `${API_URL.DOMAIN_RESOURCE}${API_PATH.RESOURCE_SKIN_DETAIL}${productCode}/${caseSkin}.png`
}

export const getResourceSceneMaskPath = (productCode:string, caseSkin:string) => {
  return `${API_URL.DOMAIN_RESOURCE}${API_PATH.RESOURCE_SCENE_MASK}${productCode}/${caseSkin}.svg`
}

export const getResourceSkinListTopPath = (productCode:string, topSkin:string) => {
  return `${API_URL.DOMAIN_API}${API_PATH.RESOURCE_SKIN_LIST_TOP}${productCode}/${topSkin}.png`
}
export const getResourceSkinDetailTopPath = (productCode:string, topSkin:string) => {
  return `${API_URL.DOMAIN_API}${API_PATH.RESOURCE_SKIN_DETAIL_TOP}${productCode}/${topSkin}.png`
}

export const getResourceSkinEditorTopPath = (productCode:string, topSkin:string) => {
  return `${API_URL.DOMAIN_API}${API_PATH.RESOURCE_SKIN_EDITOR_TOP}${productCode}/${topSkin}.png`
}
