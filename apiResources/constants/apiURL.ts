// const location = window.location.href
// const DOMAIN_API = window.location.host.replace('-editor', '')


const API = "dev-api.oround.com/api/v1/"; //DEV
const RESOURCE = "cdn.oround.com/"; //PROD

export const API_URL = {
  // DOMAIN_CDN_IMAGE: "https://www.snaps.com",
  // DOMAIN_API: "https://dev-ground.snaps.com",

  //DOMAIN_API: "http://oround-api.upleat.com",

  DOMAIN_API: "https://" + API,
  DOMAIN_RESOURCE: "https://" + RESOURCE,
  DOMAIN_RESOURCE111: "https://www.ohprint.me/",
  DOMAIN_RESOURCE222: "https://cdn.ohprint.me/",
  TEXT_SERVER: "https://text3.snaps.com",
  TEXT_IMAGE: "textimage",
  SPINE_TEXT_IMAGE: "spineimage",
  TEXT_WORD_WRAP: "textWordWrap",
  TEXT_NO_WRAP: "textNoWrap",
}


// if( location.indexOf("localhost") > -1) {
//   // API_URL.DOMAIN_API = "https://ground.ohprint.me"
//   API_URL.DOMAIN_API = "https://stg-ground.snaps.com"
//   API_URL.DOMAIN_RESOURCE = "https://stg-ground.snaps.com"
//   // API_URL.DOMAIN_API = "https://stg-ground.ohprint.me"
// // API_URL.DOMAIN_API = "https://stg2-ground.ohprint.me"
// // API_URL.DOMAIN_API = "https://temp-ground.ohprint.me"
// // API_URL.DOMAIN_CDN_IMAGE = "https://s3.ap-northeast-2.amazonaws.com/kr-ohprint-dev-resource"
// }

// if (location.indexOf('localhost') > -1) {
// 	API_URL.DOMAIN_API = 'https://dev-ground.snaps.com'
// }
