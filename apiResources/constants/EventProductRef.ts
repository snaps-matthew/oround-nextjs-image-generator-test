import Config from './Config';

// 아트 프로덕트 인덱스
// 마스크 스트랩 1: 7905
// 마스크 스트랩 2: 8005
// 폰스트랩: 8104
// DIY 스티커: 8203

const eventProductResourcePath = `${Config.RESOURCE_CDN_URL}/EventProduct`;

export const EventProductList:string[] = [
  '7905',
  '8005',
  '8104',
  '8203'
]

export const EventProduct:any = {
  '7905': {
    'LIST': `${eventProductResourcePath}/7905/list.png`,
    'ARTWORK': `${eventProductResourcePath}/7905/artwork.png`,
    'VIEW': `${eventProductResourcePath}/7905/view.png`,
  },
  '8005': {
    'LIST': `${eventProductResourcePath}/8005/list.png`,
    'ARTWORK': `${eventProductResourcePath}/8005/artwork.png`,
    'VIEW': `${eventProductResourcePath}/8005/view.png`,
  },
  '8104': {
    'LIST': `${eventProductResourcePath}/8104/list.png`,
    'ARTWORK': `${eventProductResourcePath}/8104/artwork.png`,
    'VIEW': `${eventProductResourcePath}/8104/view.png`,
  },
  '8203': {
    'LIST': `${eventProductResourcePath}/8203/list.png`,
    'ARTWORK': `${eventProductResourcePath}/8203/artwork.png`,
    'VIEW': `${eventProductResourcePath}/8203/view.png`,
  },
}
