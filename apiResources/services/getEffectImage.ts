import COMMON_CODE from 'apiResources/constants/CommonCode'
import {loadImage} from "apiResources/utils/loadImage";
import {resolve} from "path";
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


export const getEffectImage = async (effectCode:string) => {
  let image = ''
  let effect = 'destination-atop'

  const hotfoilGoldImage = 'resources/effect/imgs/hotfoil-gold.png'
  const hotfoilSilverImage = 'resources/effect/imgs/hotfoil-silver.png'
  const goldImage = 'resources/effect/imgs/bizcard_gold.png'
  const silverImage = 'resources/effect/imgs/bizcard_silver.png'
  const glossyImage = 'resources/effect/imgs/bizcard_glossy.png'
  const hologramSpectrumImage = 'resources/effect/imgs/hologram_spectrum.jpg'
  const hologramSparkleImage = 'resources/effect/imgs/hologram_sparkle.jpg'
  const hologramCrystalImage = 'resources/effect/imgs/hologram_crystal.jpg'
  const glitterSilverImage = 'resources/effect/imgs/glitter_silver.jpg'
  const glitterGoldImage = 'resources/effect/imgs/glitter_gold.jpg'
  const glitterBlackImage = 'resources/effect/imgs/glitter_black.jpg'
  const glitterBlueImage = 'resources/effect/imgs/glitter_blue.jpg'
  const glitterPinkImage = 'resources/effect/imgs/glitter_pink.jpg'
  const neonYellowImage = 'resources/effect/imgs/neon_yellow.jpg'
  const neonGreenImage = 'resources/effect/imgs/neon_green.jpg'
  const neonPinkImage = 'resources/effect/imgs/neon_pink.jpg'
  const neonBlueImage = 'resources/effect/imgs/neon_blue.jpg'
  const neonOrangeImage = 'resources/effect/imgs/neon_orange.jpg'

  switch (effectCode) {
    case COMMON_CODE.EFFECT_GOLD_HOTFOIL:
      image = await loadImage(resolve(__dirname, hotfoilGoldImage));
      break

    case COMMON_CODE.EFFECT_SILVER_HOTFOIL:
      image = await loadImage(resolve(__dirname, hotfoilSilverImage));
      break

    case COMMON_CODE.EFFECT_GOLD:
      image = await loadImage(resolve(__dirname, goldImage));
      break

    case COMMON_CODE.EFFECT_SILVER:
      image = await loadImage(resolve(__dirname, silverImage));
      break

    case COMMON_CODE.EFFECT_GLOSSY:
      image = await loadImage(resolve(__dirname, glossyImage));
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_SPECTRUM:
      image = await loadImage(resolve(__dirname, hologramSpectrumImage));
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_SPARKLE:
      image = await loadImage(resolve(__dirname, hologramSparkleImage));
      break

    case COMMON_CODE.EFFECT_HOLOGRAM_CRYSTAL:
      image = await loadImage(resolve(__dirname, hologramCrystalImage));
      break

    case COMMON_CODE.EFFECT_GLITTER_SILVER:
      image = await loadImage(resolve(__dirname, glitterSilverImage));
      break

    case COMMON_CODE.EFFECT_GLITTER_GOLD:
      image = await loadImage(resolve(__dirname, glitterGoldImage));
      break

    case COMMON_CODE.EFFECT_GLITTER_BLACK:
      image = await loadImage(resolve(__dirname, glitterBlackImage));
      break

    case COMMON_CODE.EFFECT_GLITTER_BLUE:
      image = await loadImage(resolve(__dirname, glitterBlueImage));
      break

    case COMMON_CODE.EFFECT_GLITTER_PINK:
      image = await loadImage(resolve(__dirname, glitterPinkImage));
      break

    case COMMON_CODE.EFFECT_NEON_YELLOW:
      image = await loadImage(resolve(__dirname, neonYellowImage));
      break

    case COMMON_CODE.EFFECT_NEON_GREEN:
      image = await loadImage(resolve(__dirname, neonGreenImage));
      break

    case COMMON_CODE.EFFECT_NEON_PINK:
      image = await loadImage(resolve(__dirname, neonPinkImage));
      break

    case COMMON_CODE.EFFECT_NEON_BLUE:
      image = await loadImage(resolve(__dirname, neonBlueImage));
      break

    case COMMON_CODE.EFFECT_NEON_ORANGE:
      image = await loadImage(resolve(__dirname, neonOrangeImage));
      break

    default:
      break
  }

  return {image, effect}
}
