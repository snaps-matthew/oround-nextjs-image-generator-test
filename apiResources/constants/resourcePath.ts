import { TYPE } from './type'
import { API_URL } from './apiURL'
import { API_PATH } from './apiPath'
import { addQtParagraphType } from 'apiResources/utils/addQtParagraphType'
import { nowTimestamp } from 'apiResources/utils/getDateTime'


export const getImagePath = (object:any, isReload = false) => {
  let thumbUrl
  const type:string = object['type']
  const resourceId:string = object['resourceId'] || object['original']['resourceId']
  const middleImagePath:string = object['middleImagePath'] || object['original']['middleImagePath']
  if(type === TYPE.OBJECT_TEXT ||
    type === TYPE.OBJECT_EXTERNAL_TEXT){
    const text = object['_']
    const width = object['width']
    const height = object['height']
    const wrap = object['wordWrap']
    const style = object['defaultStyle']
    const lineHeight = object['lineHeight']
    thumbUrl = getTextUrl(width, height, text, style, wrap, lineHeight)
  } else if (middleImagePath) {
    thumbUrl = getImageUrl(middleImagePath, isReload)
  } else if (resourceId) {
    thumbUrl = getResourceIdUrl(resourceId)
  }
  return thumbUrl
}

export const getResourceIdUrl = (resourceId:string) => {
  // return API_URL.DOMAIN_RESOURCE + API_PATH.V1 + API_PATH.RESOURCE + '/' + resourceId +'/url'
  return API_URL.DOMAIN_RESOURCE111 + API_PATH.V1 + API_PATH.RESOURCE + '/' + resourceId +'/url'
}

export const getImageUrl = (path:string, isReload:boolean = false) => {
  const addTimes = isReload ? `?timestamp=${nowTimestamp()}` : ''
  return (path === '') ? null : `${API_URL.DOMAIN_RESOURCE}${path}${addTimes}`
}

export const getTextUrl = (width:number, height:number, defaultText:string, defaultStyle:string, wordWrap:string, lineHeight:number) => {
  const htmlText = addQtParagraphType(defaultText || '<span/>', defaultStyle)
  const srcHtmlText = encodeURIComponent(htmlText)
  let textImageServer = `${API_URL.TEXT_SERVER}/${API_URL.TEXT_IMAGE}`

  if (lineHeight) textImageServer = `${textImageServer}_${lineHeight}`

  return `${textImageServer}/${Math.floor(width)}/${Math.floor(height)}/${srcHtmlText}/end/txt_1.png`
}
