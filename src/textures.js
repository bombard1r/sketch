import * as THREE from 'three'


const texScale = (texture, repX, repY) => {
    texture.repeat.set(repX, repY)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
}

// Paper Textures
const texRep = 1.3
const textureLoader = new THREE.TextureLoader()
const paperColor = textureLoader.load('/textures/paper/Paper001_1K-JPG_Color.jpg')
paperColor.colorSpace = THREE.SRGBColorSpace
texScale(paperColor, texRep, texRep)
const paperDisplacement = textureLoader.load('/textures/paper/Paper001_1K-JPG_Displacement.jpg')
texScale(paperDisplacement, texRep, texRep)
const paperNormal = textureLoader.load('/textures/paper/Paper001_1K-JPG_NormalGL.jpg')
texScale(paperNormal, texRep, texRep)
const paperRoughness = textureLoader.load('/textures/paper/Paper001_1K-JPG_Roughness.jpg')
texScale(paperRoughness, texRep, texRep)


// Leather Textures
const coverColor = textureLoader.load('/textures/leather/Leather030_1K-JPG_Color.jpg')
coverColor.colorSpace = THREE.SRGBColorSpace
texScale(coverColor, 0.05, 0.7)
const coverDisplacement = textureLoader.load('/textures/leather/Leather030_1K-JPG_Displacement.jpg')
texScale(coverDisplacement, 0.05, 0.7)
const coverNormal = textureLoader.load('/textures/leather/Leather030_1K-JPG_NormalGL.jpg')
texScale(coverNormal, 0.05, 0.7)
const coverRoughness = textureLoader.load('/textures/leather/Leather030_1K-JPG_Roughness.jpg')
texScale(coverRoughness, 0.05, 0.7)


// Cover Textures
const cover1Color = coverColor.clone()
cover1Color.repeat.set(1,1)
const cover1Normal = coverNormal.clone()
cover1Normal.repeat.set(1,1)
const cover1Roughness = coverRoughness.clone()
cover1Roughness.repeat.set(1,1)


export { paperColor, paperDisplacement, paperNormal, paperRoughness, coverColor, coverDisplacement, coverNormal, coverRoughness, cover1Color, cover1Normal, cover1Roughness }
