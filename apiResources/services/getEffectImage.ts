import COMMON_CODE from 'apiResources/constants/CommonCode'
import {loadImage} from "apiResources/utils/loadImage";
import {resolve} from "path";
import Config from "apiResources/constants/Config";
// import hotfoilGoldImage from './imgs/hotfoil-gold.png'
// import hotfoilSilverImage from './imgs/hotfoil-silver.png'
// import goldImage from './imgs/bizcard_gold.png'
// import silverImage from './imgs/bizcard_silver.png'
// import glossyImage from './imgs/bizcard_glossy.png'
// import hologramSpectrumImage from './imgs/hologram_spectrum.jpg'
// import hologramSparkleImage from './imgs/hologram_sparkle.jpg'
// import hologramCrystalImage from './imgs/hologram_crystal.jpg'
// import glitterSilverImage from './imgs/glitter_silver.jpg'
// import glitterGoldImage from './imgs/glitter_gold.jpg'
// import glitterBlackImage from './imgs/glitter_black.jpg'
// import glitterBlueImage from './imgs/glitter_blue.jpg'
// import glitterPinkImage from './imgs/glitter_pink.jpg'
// import neonYellowImage from './imgs/neon_yellow.jpg'
// import neonGreenImage from './imgs/neon_green.jpg'
// import neonPinkImage from './imgs/neon_pink.jpg'
// import neonBlueImage from './imgs/neon_blue.jpg'
// import neonOrangeImage from './imgs/neon_orange.jpg'

const { RESOURCE_CDN_URL } = Config;


export const getEffectImage = async (effectCode:string) => {
  let image = ''
  let effect = 'destination-atop'

  const hotfoilGoldImage = `${RESOURCE_CDN_URL}/effect/imgs/hotfoil-gold.png`;
  const hotfoilSilverImage = `${RESOURCE_CDN_URL}/effect/imgs/hotfoil-silver.png`;
  const goldImage = `${RESOURCE_CDN_URL}/effect/imgs/bizcard_gold.png`;
  const silverImage = `${RESOURCE_CDN_URL}/effect/imgs/bizcard_silver.png`;
  const glossyImage = `${RESOURCE_CDN_URL}/effect/imgs/bizcard_glossy.png`;
  const hologramSpectrumImage = `${RESOURCE_CDN_URL}/effect/imgs/hologram_spectrum.jpg`;
  const hologramSparkleImage = `${RESOURCE_CDN_URL}/effect/imgs/hologram_sparkle.jpg`;
  const hologramCrystalImage = `${RESOURCE_CDN_URL}/effect/imgs/hologram_crystal.jpg`;
  const glitterSilverImage = `${RESOURCE_CDN_URL}/effect/imgs/glitter_silver.jpg`;
  const glitterGoldImage = `${RESOURCE_CDN_URL}/effect/imgs/glitter_gold.jpg`;
  const glitterBlackImage = `${RESOURCE_CDN_URL}/effect/imgs/glitter_black.jpg`;
  const glitterBlueImage = `${RESOURCE_CDN_URL}/effect/imgs/glitter_blue.jpg`;
  const glitterPinkImage = `${RESOURCE_CDN_URL}/effect/imgs/glitter_pink.jpg`;
  const neonYellowImage = `${RESOURCE_CDN_URL}/effect/imgs/neon_yellow.jpg`;
  const neonGreenImage = `${RESOURCE_CDN_URL}/effect/imgs/neon_green.jpg`;
  const neonPinkImage = `${RESOURCE_CDN_URL}/effect/imgs/neon_pink.jpg`;
  const neonBlueImage = `${RESOURCE_CDN_URL}/effect/imgs/neon_blue.jpg`;
  const neonOrangeImage = `${RESOURCE_CDN_URL}/effect/imgs/neon_orange.jpg`;

  switch (effectCode) {
    case COMMON_CODE.EFFECT_GOLD_HOTFOIL:
      image = await loadImage(hotfoilGoldImage);
      break

    case COMMON_CODE.EFFECT_SILVER_HOTFOIL:
      image = await loadImage(hotfoilSilverImage);
      break

    case COMMON_CODE.EFFECT_GOLD:
      image = await loadImage(goldImage);
      break

    case COMMON_CODE.EFFECT_SILVER:
      image = await loadImage(silverImage);
      break

    case COMMON_CODE.EFFECT_GLOSSY:
      image = await loadImage(glossyImage);
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_SPECTRUM:
      image = await loadImage(hologramSpectrumImage);
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_SPARKLE:
      image = await loadImage(hologramSparkleImage);
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_CRYSTAL:
      image = await loadImage(hologramCrystalImage);
      break

    case COMMON_CODE.EFFECT_GLITTER_SILVER:
      image = await loadImage(glitterSilverImage);
      break

    case COMMON_CODE.EFFECT_GLITTER_GOLD:
      image = await loadImage(glitterGoldImage);
      break

    case COMMON_CODE.EFFECT_GLITTER_BLACK:
      image = await loadImage(glitterBlackImage);
      break

    case COMMON_CODE.EFFECT_GLITTER_BLUE:
      image = await loadImage(glitterBlueImage);
      break

    case COMMON_CODE.EFFECT_GLITTER_PINK:
      image = await loadImage(glitterPinkImage);
      break

    case COMMON_CODE.EFFECT_NEON_YELLOW:
      image = await loadImage(neonYellowImage);
      break

    case COMMON_CODE.EFFECT_NEON_GREEN:
      image = await loadImage(neonGreenImage);
      break

    case COMMON_CODE.EFFECT_NEON_PINK:
      image = await loadImage(neonPinkImage);
      break

    case COMMON_CODE.EFFECT_NEON_BLUE:
      image = await loadImage(neonBlueImage);
      break

    case COMMON_CODE.EFFECT_NEON_ORANGE:
      image = await loadImage(neonOrangeImage);
      break

    default:
      break
  }

  return {image, effect}
}
