
class MultiformSkinCanvas {
  protected state: null;
  protected scene: null;
  protected complateCallback: null;
  protected completeState: any[];
  protected borderImageINIItem: null;
  constructor () {
    this.state = null
    this.scene = null
    this.complateCallback = null
    this.completeState = []
    this.borderImageINIItem = null
  }

  init (resolve:any, screenShotsData:any, scene:any, borderImageINIItem:any) {
    this.scene = scene
    this.complateCallback = resolve
    this.state = screenShotsData
    this.borderImageINIItem = borderImageINIItem
  }

  composite () {}

  drawComplete () {
    // @ts-ignore
    if (this.state.length === 0) {
      // @ts-ignore
      this.complateCallback(this.completeState)
    } else {
      this.draw()
    }
  }

  draw () {
    // @ts-ignore
    this.composite(this.state.shift())
      // @ts-ignore
      .then((thumbnailData:any) => {
        this.completeState.push(thumbnailData)
        this.drawComplete()
      })
  }

  imageLoad (url:any) {
    return new Promise((resolve, reject) => {
      let image = document.createElement('img')
      image.crossOrigin = 'Anonymous'
      image.onload = () => { resolve(image) }
      image.onerror = () => { console.log('multiformSKin: Image load Error : ' + url)}
      image.src = url
    })
  }

  newCanvas (width:number, height:number) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    return {canvas, ctx}
  }
}

export default MultiformSkinCanvas
