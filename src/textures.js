import * as THREE from 'three'
import { startScene } from './startScene.js'
import { sheet } from './base.js'



const texScale = (texture, repX, repY) => {
    texture.repeat.set(repX, repY)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
}
const textures = {}
const textureLoader = new THREE.TextureLoader()
let loaded = 0
const texCount = 11
function checkLoad() {
    loaded++
    if (loaded === texCount) {
        startScene()
        console.log('All textures loaded')
    }
}


const texRep = 1.3
function loadTextures() {
    console.log('Start loading textures')
    textures.paperColor = textureLoader.load('/textures/paper/Paper001_1K-JPG_Color.jpg', checkLoad)
    textures.paperColor.colorSpace = THREE.SRGBColorSpace
    texScale(textures.paperColor, texRep, texRep)
    textures.paperDisplacement = textureLoader.load('/textures/paper/Paper001_1K-JPG_Displacement.jpg', checkLoad)
    texScale(textures.paperDisplacement, texRep, texRep)
    textures.paperNormal = textureLoader.load('/textures/paper/Paper001_1K-JPG_NormalGL.jpg', checkLoad)
    texScale(textures.paperNormal, texRep, texRep)
    textures.paperRoughness = textureLoader.load('/textures/paper/Paper001_1K-JPG_Roughness.jpg', checkLoad)
    texScale(textures.paperRoughness, texRep, texRep)


    // Leather Textures
    textures.coverColor = textureLoader.load('/textures/leather/Leather030_1K-JPG_Color.jpg', checkLoad)
    textures.coverColor.colorSpace = THREE.SRGBColorSpace
    texScale(textures.coverColor, 0.05, 0.7)
    textures.coverDisplacement = textureLoader.load('/textures/leather/Leather030_1K-JPG_Displacement.jpg', checkLoad)
    texScale(textures.coverDisplacement, 0.05, 0.7)
    textures.coverNormal = textureLoader.load('/textures/leather/Leather030_1K-JPG_NormalGL.jpg', checkLoad)
    texScale(textures.coverNormal, 0.05, 0.7)
    textures.coverRoughness = textureLoader.load('/textures/leather/Leather030_1K-JPG_Roughness.jpg', checkLoad)
    texScale(textures.coverRoughness, 0.05, 0.7)


    // Cover Textures
    textures.cover1Color = textures.coverColor.clone()
    textures.cover1Color.repeat.set(1,1)
    textures.cover1Normal = textures.coverNormal.clone()
    textures.cover1Normal.repeat.set(1,1)
    textures.cover1Roughness = textures.coverRoughness.clone()
    textures.cover1Roughness.repeat.set(1,1)

    // Wood Textures
    textures.woodColor = textureLoader.load('/textures/wood/Poliigon_WoodVeneerOak_7760_BaseColor.jpg', checkLoad)
    textures.woodColor.colorSpace = THREE.SRGBColorSpace
    texScale(textures.woodColor, 1, 1)
    // textures.woodDisplacement = textureLoader.load('/textures/wood/Poliigon_WoodVeneerOak_7760_Displacement.tiff', checkLoad)
    // texScale(textures.woodDisplacement, 0.15, 0.15)
    textures.woodNormal = textureLoader.load('/textures/wood/Poliigon_WoodVeneerOak_7760_Normal.png', checkLoad)
    texScale(textures.woodNormal, 1, 1)
    textures.woodRoughness = textureLoader.load('/textures/wood/Poliigon_WoodVeneerOak_7760_Roughness.jpg', checkLoad)
    texScale(textures.woodRoughness, 1, 1)
}




export { 
    loadTextures,
    textures
    // paperColor, paperDisplacement, paperNormal, paperRoughness, 
    // coverColor, coverDisplacement, coverNormal, coverRoughness, 
    // cover1Color, cover1Normal, cover1Roughness 
}
