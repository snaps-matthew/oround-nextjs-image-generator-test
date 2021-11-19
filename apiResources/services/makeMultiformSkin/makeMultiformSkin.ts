import CATEGORY from 'apiResources/constants/CategoryCode'
import FrameSkin from 'apiResources/services/makeMultiformSkin/Frame/frameSkin'

export const makeMultiformSkin = (categoryCode:string, screenShotsData:any, scene:any, ) => {
  return new Promise( async (resolve, reject) => {
    let multiformSkin:any
    // 모든 상품들이 씬정보(scenes)와 프리뷰(previewScene)정보가 필요하지 않기 때문에 특정한 상품에 경우에 필요한경우 개별적으로 넘긴다.

    switch (categoryCode) {
      case CATEGORY.FRAME_GENERIC:
        multiformSkin = new FrameSkin()
        break

      default:
        return resolve(screenShotsData)
    }

    multiformSkin.init(resolve, screenShotsData, scene)
    multiformSkin.draw()
  })
}
