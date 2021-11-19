export const asyncCreateObjectURL = (canvas:any) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob:any) => {
      resolve(window.URL.createObjectURL(blob))
    })
  })
}
