import * as THREE from 'three'
import { scene } from './scene.js'
import { 
    coverColor, coverDisplacement, coverNormal, coverRoughness,
    cover1Color, cover1Normal, cover1Roughness,
    paperColor, paperDisplacement, paperNormal, paperRoughness
} from './textures.js'


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

// Base
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
const baseMaterial = new THREE.MeshStandardMaterial({
  // color: 0xcccccc,
  side: THREE.DoubleSide,
  map: coverColor,
  // displacementMap: coverDisplacement,
  // displacementScale: - 0.1,
  // displacementBias: 0,
  normalMap: coverNormal,
  roughnessMap: coverRoughness,
})
const basePlane = new THREE.Mesh(baseGeo, baseMaterial)
scene.add(basePlane)
basePlane.position.set(0,0,0)


// Covers
const coverGeo = new THREE.BoxGeometry(
  sheet.width + thick.cover * 2,
  base.height,
  thick.cover - 0.15
)
const coverMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: cover1Color,
  // displacementMap: coverDisplacement,
  // displacementScale: 0.1,
  // displacementBias: 0.05,
  normalMap: cover1Normal,
  roughnessMap: cover1Roughness,
})


// Sheets
const sheetGeo = new THREE.PlaneGeometry(
  sheet.width,
  base.height - thick.cover * 5,
  64,64
)

const sheetMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: paperColor,
  // displacementMap: paperDisplacement,
  // displacementScale: 0.3,
  // displacementBias: - 0.15,
  normalMap: paperNormal,
  roughnessMap: paperRoughness,
})



export { 
    sheet, thick, 
    basePlane,  base,
    coverGeo, coverMaterial,
    sheetGeo, sheetMaterial
}
