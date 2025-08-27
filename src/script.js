import { scene, sizes, camera, renderer, addLights, canvas, resizeHandler } from './scene.js'
import { 
    paperColor, paperDisplacement, paperNormal, paperRoughness, 
    coverColor, coverDisplacement, coverNormal, coverRoughness, 
    cover1Color, cover1Normal, cover1Roughness 
} from './textures.js'
import { basePlane, sheet, thick, base } from './base.js'
import { generateSheets } from './generateSheets.js'
import { tick, flipPage } from './frameUpdate.js'
import { printImage } from './printImage.js'
import { gui } from './gui.js'
// import vertexShader from './shaders/vertex.glsl'
// import fragmentShader from './shaders/fragment.glsl'




addLights()
resizeHandler()
generateSheets()
flipPage()
printImage()




tick()
