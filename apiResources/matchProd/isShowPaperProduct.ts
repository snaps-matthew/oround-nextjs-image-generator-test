import CommonCode from 'apiResources/constants/CommonCode'

/**
 * @description 상품추가시수정
 * */

export const isShowPaperProduct = (paperCode:string, colorCode:string) => {
  return (
    (paperCode === CommonCode.PAPER_METAL_FRAME && colorCode === CommonCode.FRAME_COLOR_METAL) ||
    paperCode === CommonCode.PAPER_CANVAS_FRAME ||
    paperCode === CommonCode.PAPER_CRAFT ||
    paperCode === CommonCode.PAPER_CRAFT175 ||
    paperCode === CommonCode.PAPER_HOLOGRAM ||
    paperCode === CommonCode.PAPER_TRANSPARENCY ||
    paperCode === CommonCode.PAPER_TRANSPARENCY_GLOSSY ||
    paperCode === CommonCode.PAPER_LINEN ||
    paperCode === CommonCode.PAPER_FELT ||
    paperCode === CommonCode.PAPER_PEARL ||
    paperCode === CommonCode.PAPER_METAL_BRUSH ||
    paperCode === CommonCode.PAPER_FAN_TRANSPARENCY
  )
}
