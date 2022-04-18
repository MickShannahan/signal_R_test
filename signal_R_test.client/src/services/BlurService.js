import { decode, encode } from "blurhash"
import { logger } from "../utils/Logger"


class BlurService{


  blurImage( image, width, height){
    logger.log('blurring', image.length, width, height)
    const blurHash = encode(image, width, height, 4, 3)
    logger.log('blurred', blurHash)
    return blurHash
  }

  async displayHash(hash, x, y){
    logger.log('un hasghing', hash)
    const u8array = decode(hash, x, y)
    const imageData = new ImageData(u8array, x, y)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = x
    canvas.height = y
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL()

  }
}

export const blurService = new BlurService()
