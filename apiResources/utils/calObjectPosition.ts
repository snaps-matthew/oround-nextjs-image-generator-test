export const calObjectPosition = (positionType: string, x: number, y: number, width: number, height: number) => {
  switch (positionType){
    case "top-left":
      break;
    case "top-center":
      x = x - (width / 2);
      break;
    case "top-right":
      x = x - width;
      break;

    case "mid-left":
      y = y - (height / 2);
      break;
    case "mid-center":
      x = x - (width / 2);
      y = y - (height / 2);
      break;
    case "mid-right":
      x = x - width;
      y = y - (height / 2);
      break;

    case "bottom-left":
      y = y - height;
      break;
    case "bottom-center":
      x = x - (width / 2);
      y = y - height;
      break;
    case "bottom-right":
      x = x - width;
      y = y - height;
      break;
    default:
      break;
  }
  return {x, y}
}
