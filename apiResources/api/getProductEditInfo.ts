import axios from 'axios'
import { API_URL } from 'apiResources/constants/apiURL'
import {BadRequest} from "apiResources/utils/GeneralError";

export const getProductEditInfo = async (artProductIndex:string, sizeCode:string): Promise<any> => {
  const params = {
    "artProductIndex": artProductIndex,
    "sizeCode": sizeCode
  }
  const headers = {
    "Accept": "*/*",
    "x-oround-language": "KO",
    "x-oround-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJObyI6NSwiY2VsZWIiOmZhbHNlLCJqb2luQXJlYUNvZGUiOiIxMDUwMDEiLCJleHAiOjE2MzgxNjUxMDgsImlzcyI6Im9yb3VuZC5jb20iLCJzdWIiOiJBIn0.OaL1gB2S_2EWnmPhMg7KOJFRJSQLtvVLNjj1PnT3BibanO8fRQ8s9VzPJbzLUO0r8E_nvxoptg7YVyErIHWW9w"
  }
  const {data} = await axios.get(`${API_URL.DOMAIN_API}artwork/product/edit-info`, {
    params,
    headers
  }).catch((err) => {
    throw BadRequest(`${artProductIndex}  invalid, ${err.response.data.errorCode}`)
  });

  if (data.length === 0) {
    throw BadRequest(`${artProductIndex} : not found `)
  }

  return data
}
