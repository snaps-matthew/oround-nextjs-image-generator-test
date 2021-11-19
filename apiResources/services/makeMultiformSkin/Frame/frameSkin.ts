import MultiformSkinCanvas from 'apiResources/services/makeMultiformSkin/MultiformSkinCanvas'
import  CommonCode from 'apiResources/constants/CommonCode'
import { makeMatSkin } from 'apiResources/utils/makeMatSkin'

class FrameSkin extends MultiformSkinCanvas {
  protected info: {};
  protected scene: any;
  constructor (){
    super()
    this.info = {}
  }
  // @ts-ignore
  composite (thumbnailData:any) {
    return new Promise(async (resolve, reject) => {
      if(thumbnailData.paperCode === CommonCode.PAPER_SOLID_WOOD_FRAME){ //우드프레임은 무조건 매트이므로 매트 스킨을 그린다.
        const matCanvas = makeMatSkin(this.scene, thumbnailData.sizeInfo, thumbnailData.paperCode,2);
        const ctx = thumbnailData.thumbnailCanvas.getContext('2d');
        ctx.drawImage(matCanvas, 0, 0);
        resolve(thumbnailData);

      } else {
        // 그냥 저장한다.
        resolve(thumbnailData)
      }
    })
  }
}

export default FrameSkin
