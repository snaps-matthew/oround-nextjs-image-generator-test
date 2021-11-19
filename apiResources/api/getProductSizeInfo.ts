import axios from "axios";
import Config from "apiResources/constants/Config";
import {BadRequest} from "apiResources/utils/GeneralError";

export const getProductSizeInfo = async (productCode: string, templateCode: string): Promise<any> => {
  // https://www.snaps.com/v1/producr/basicSize/{productCode}?templateCode={templateCode}
  const {data} = await axios.get(`${Config.apiDomain}/v1/product/basicSize/${productCode}?templateCode=${templateCode}`).catch((err)=>{
    throw BadRequest(`${productCode} size is invalid, ${err.response.data.errorCode}`)
  });

  if(data.length === 0){
    throw BadRequest(`${productCode} : not found size`)
  }

  return data

  // const sizeMap: any = {};
  // data.forEach( (item: any) => { sizeMap[item.sizeType] = item; });
  // return sizeMap
}
