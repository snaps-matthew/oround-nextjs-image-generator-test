import * as fs from 'fs';

export const imageTextSaver = async (imgData:any, target:string) => {
  const base64 = 'data:image/png;base64';
  const conversion = imgData.split(',')[0] === base64 ? imgData : `data:image/png;base64,${imgData}`;

  await fs.writeFileSync(`apiResources/resources/${target}.txt`, conversion);
}
