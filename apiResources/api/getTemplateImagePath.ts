import axios from "axios";
import {BadRequest} from "apiResources/utils/GeneralError";
import Config from "apiResources/constants/Config";

export const getTemplateImagePath = async (templateCode: string, paperCode: string, backCode: string): Promise<any> => {
  // https://www.snaps.com/v1/template/thumnail/{templateCode}?paperCode=${paperCode}&backCode=${backCode}
  const {data} = await axios.get(`${Config.apiDomain}/v1/template/thumnail/${templateCode}?paperCode=${paperCode}&backCode=${backCode}`).catch((err)=>{
    throw BadRequest(`${templateCode} is invalid, ${err.response.data.errorCode}`)
  });
  if(data.length === 0){
    throw BadRequest(`${templateCode} : no template image path`)
  }
  return data.map((item: { templateCode: string; thumImagePath: any; }) => item.thumImagePath)
}
