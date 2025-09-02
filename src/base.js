import * as THREE from 'three'
import { scene } from './scene.js'
import { textures } from './textures.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

// Plane
const sheet = {
  width: 15,
  height:21,
  array: [],
  count: 10,
}
const thick = {
  paper: 0.02,
  cover: 0.3,
}
const materials = {}

//
    //Base
//
const base = 
  {
    width: thick.paper * sheet.count + thick.cover * 3,
    height: sheet.height + thick.cover * 2,
    angle: 0.0
  }
const baseGeo = new THREE.BoxGeometry( 
  base.width, 
  base.height,
  thick.cover
)
materials.base = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
})
const basePlane = new THREE.Mesh(baseGeo, materials.base)
scene.add(basePlane)
basePlane.position.set(0,0,0)


//
    //Covers
//
const coverGeo = new THREE.BoxGeometry(
  sheet.width + thick.cover * 2,
  base.height,
  thick.cover - 0.15
)
materials.cover = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
})


//
    //Sheets
//
const sheetGeo = new THREE.PlaneGeometry(
  sheet.width,
  base.height - thick.cover * 5,
  64,64
)
materials.sheets = []

function setTextures(){
    materials.base.map = textures.coverColor
    materials.base.normalMap = textures.coverNormal
    materials.base.roughnessMap = textures.coverRoughness

    materials.cover.map = textures.cover1Color
    materials.cover.normalMap = textures.cover1Normal
    materials.cover.roughnessMap = textures.cover1Roughness

    for (let i = 0; i < sheet.count; i++) {
        materials.sheets.push(
            new THREE.ShaderMaterial({
                uniforms: {
                    frontTexture: { value: textures.paperColor.clone() },
                    backTexture: { value: textures.paperColor.clone() },
                    normalMap: { value: textures.paperNormal },
                    roughnessMap: { value: textures.paperRoughness },
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide,
            })
        )
    }
}


export { 
    sheet, thick, 
    basePlane,  base,
    materials,
    coverGeo, 
    sheetGeo, 
    setTextures
}
