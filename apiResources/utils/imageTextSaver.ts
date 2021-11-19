import * as fs from 'fs';

export const imageTextSaver = async (imgData:any, target:string) => {
  const base64 = 'data:image/png;base64';
  const conversion = imgData.split(',')[0] === base64 ? imgData : `data:image/png;base64,${imgData}`;

  await fs.writeFileSync(`src/resources/${target === 'pattern' ? 'patternImage' : 'finalImage'}.txt`, conversion);
}
