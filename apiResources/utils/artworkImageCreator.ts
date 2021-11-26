import * as fs from 'fs';
import 'ag-psd/initialize-canvas.js';
import { readPsd } from 'ag-psd';
import { createRequire } from 'module';
import {ExecException} from "child_process";
import {deflateRawSync} from "zlib";
import logger from '../../logger';
import exp from 'constants';
const { exec } = require('child_process');
const { imageTextSaver } = require('./imageTextSaver');

// 아트워크 리사이징 (아트워크 이미지가 들어갈 영역의 크기/좌표에 맞춰 조절)
// 필요한 요소들: (1) 아트워크 파일경로, (2) 아트워크 좌표, (3) 타켓(아트워크 넣을 영역) 좌표
// (2) 예시: [0, 0, 가로크기, 0, 가로크기, 세로크기, 0, 세로크기] => 현재는 포인트 4개만 사용해서 왜곡을 하고있다.

// artwork src coordinates => 아트워크 가로/세로 크기 이용해서 좌표 뽑기
// artwork dst coordinates => 아트워크가 들어갈 곳 좌표 (PSD 파일 읽어놓은 것)
// cartegoryCode => 카테고리/그룹 별로 위치 조정이 필요하다
// pattern/final image text file path => 쉘에 입력 철자수 제한 때문에 이미지를 base64 로 변화해서 텍스트 파일에 저장한다
// productColor => 색상 값 받아서 crop 이미지 색상 변경 후 패턴 이미지 올려서 반환

export const getArtworkReszied = (srcCoords:number[], dstCoords:number[], categoryName:string) => {
  // 위치조정 많이 필요하지 않으면 isApparel => true/false 로 만들기
  const adjustment:any = {
    'tinCase': {x:0, y:0},
    'smartTok': {x:0, y:0},
    'apparel': {x:-12, y:20}
  }
  const perspectiveCoords: number[] = [];

  for (let i = 0; i < dstCoords.length; i += 2) {
    perspectiveCoords.push(srcCoords[i],
      srcCoords[i + 1], dstCoords[i] + adjustment[`${categoryName}`]['x'], dstCoords[i + 1] + adjustment[`${categoryName}`]['y'])
  }

  return new Promise((resolve, reject) => {
    exec(`convert inline:apiResources/resources/patternImage.txt -matte -virtual-pixel transparent -background transparent -extent 2000x2000 \
        -distort Perspective \
        "${perspectiveCoords}" PNG:- | base64
    `, { maxBuffer: 5000 * 5000 }, (err:ExecException, stdout:string) => {
      if (err) console.error(err);

      imageTextSaver(stdout, 'pattern')

      resolve(stdout);
    })
  })
}

// 리사이징된 아트워크에 주름을 입힌다
export const getImageWrinkled = (productImgPath:string, productCode:string) => {
  return new Promise((resolve, reject) => {
    exec(`convert inline:apiResources/resources/patternImage.txt ${productImgPath}/${productCode}_blur.png -alpha set -virtual-pixel transparent -compose displace -set option:compose:args -20x20 -composite \\( +clone ${productImgPath}/${productCode}_crop.png -compose multiply -composite \\) -delete 0 PNG:- | base64`, {maxBuffer: 2000 * 2000}, (err:ExecException, stdout:string) => {

      if (err) console.error(err);

      imageTextSaver(stdout, 'pattern')

      resolve(stdout);
    })
  })
}

// 아트워크 마스킹
export const imageDstOut = (productPath:string, productCode:string) => {

  return new Promise((resolve, reject) => {
    exec(`composite -compose Dst_Out -gravity center ${productPath}/${productCode}_mask.png inline:apiResources/resources/patternImage.txt -alpha Set PNG:- | base64`, { maxBuffer: 2000 * 2000 }, (err:ExecException, stdout:string) => {
      if (err) console.error(err);

      imageTextSaver(stdout, 'pattern')

      resolve(stdout);
    })
  })
}

// 최종 가공 된 아트워크 이미지 상품 위에 올리기
export const getArtworkOnModel = (productPath:string, productCode:string) => {
  return new Promise((resolve, reject) => {
    exec(`composite 'inline:apiResources/resources/patternImage.txt' '${productPath}/${productCode}.png' PNG:- | base64`, { maxBuffer: 5000 * 5000 }, (err:ExecException, stdout:string) => {
      if (err) console.error(err);

      imageTextSaver(stdout, 'final');

      resolve(stdout);
    })
  })
}

export const artworkGeneralMerger = async (artworkImages:string[]) => {
  let artworkCommand = `composite `;

  for (let i=0; i < artworkImages.length; i++) {
    artworkCommand += `'${artworkImages[i]}' `;
  }

  return new Promise((resolve, reject) => {
    exec(`${artworkCommand}PNG:- | base64`, (err:ExecException, stdout:string) => {

      if (err) console.error(err);
      imageTextSaver(stdout, 'final')
      resolve(stdout)
    })
  })
}

// 아트워크 리사이징 + 리포지셔닝
export const artworkImageMerger = async (artworkImageData:any, productImgPath:string, canvasWidth:any, canvasHeight:any) => {
  await imageTextSaver(artworkImageData, 'pattern');

  return new Promise((resolve, reject) => {
    const { x, y, width, height, path } = artworkImageData;

    exec(`composite -geometry ${width}x${height}+${x}+${y} 'inline:apiResources/resources/patternImage.txt' ${productImgPath} PNG:- | base64`, { maxBuffer: 2000 * 2000 },(err:ExecException, stdout:string) => {
      if (err) console.error(err);

      imageTextSaver(stdout, 'final');

      resolve(stdout);
    })
  })
}

// 좌표 없을 시 psd 읽어서 좌표 가지고 오기
export const getPSDData = async (psdPath:string, categoryCode:string, coordPath:string, prodCode:string, prodOption:string) => {
  const buffer = await fs.readFileSync(psdPath);
  const psdData:any = readPsd(buffer);

  let dstCoords:number[] = [];

  switch (categoryCode) {
    default:
      if (psdData.children[0].placedLayer.nonAffineTransform) {
        dstCoords = psdData.children[0].placedLayer.nonAffineTransform;
      }
      else {
        dstCoords = psdData.children[0].placedLayer.transform;
      }
  }

  await addCoordinateData(coordPath, prodCode, prodOption, dstCoords);

  return dstCoords;
}

// 좌표 정보 없을 시 추가하기
export const addCoordinateData  = (coordPath:string, prodCode:string, prodOption:string, patternDstCoords:number[]) => {
  return new Promise((resolve, reject) => {

    const file = JSON.parse(fs.readFileSync(coordPath, 'utf-8'));

    if (file[prodCode]) {
      if (prodOption) {
        file[prodCode][prodOption] = patternDstCoords;
      }
      else {
        file[prodCode] = patternDstCoords;
      }
    }
    else {
      file[prodCode] = {}
      if (prodOption) {
        file[prodCode][prodOption] = patternDstCoords;
      }
      else {
        file[prodCode] = patternDstCoords;
      }
    }

    fs.writeFileSync(coordPath, JSON.stringify(file));

    resolve(true);
  })
}

// base64 컨버터
export const imageConverter = async (path:string) => {
  return new Promise((resolve, reject) => {
    exec(`convert '${path}' PNG:- | base64`, { maxBuffer: 2000 * 2000 }, (err:ExecException, stdout:string) => {

      resolve(stdout);
    })

  })
}

// 한번에 색상 변경 + 만들어진 패턴 얹어서 보여주기
export const changeColor = (productImgPath:string, productCode:string, productColor:string) => {
  return new Promise((resolve, reject) => {
    exec(`convert '${productImgPath}/${productCode}' \\( +clone +level-colors '#FF69B4' \\) -compose multiply -composite '${productImgPath}/${productCode}' -compose multiply -composite '${productImgPath}/${productCode}' -compose multiply -composite 'inline:apiResources/resources/patternImage.txt' -compose over -composite PNG:- | base64`, (err:ExecException|null, stdout:string) => {

      resolve(stdout)
    })
  })
}
