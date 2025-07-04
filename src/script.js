import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


// GUI
const gui = new dat.GUI()

// Paper Textures
const texScale = 1.3
const textureLoader = new THREE.TextureLoader()
const paperColor = textureLoader.load('/textures/paper/Paper001_1K-JPG_Color.jpg')
paperColor.colorSpace = THREE.SRGBColorSpace
paperColor.repeat.set(texScale,texScale)
paperColor.wrapS = THREE.RepeatWrapping
paperColor.wrapT = THREE.RepeatWrapping

// const paperDisplacement = textureLoader.load('/textures/paper/Paper001_1K-JPG_Displacement.jpg')
// paperDisplacement.repeat.set(texScale,texScale)
// paperDisplacement.wrapS = THREE.RepeatWrapping
// paperDisplacement.wrapT = THREE.RepeatWrapping

const paperNormal = textureLoader.load('/textures/paper/Paper001_1K-JPG_NormalGL.jpg')
paperNormal.repeat.set(texScale,texScale)
paperNormal.wrapS = THREE.RepeatWrapping
paperNormal.wrapT = THREE.RepeatWrapping

const paperRoughness = textureLoader.load('/textures/paper/Paper001_1K-JPG_Roughness.jpg')
paperRoughness.repeat.set(texScale,texScale)
paperRoughness.wrapS = THREE.RepeatWrapping
paperRoughness.wrapT = THREE.RepeatWrapping


// Leather Textures
const coverColor = textureLoader.load('/textures/leather/Leather030_1K-JPG_Color.jpg')
coverColor.colorSpace = THREE.SRGBColorSpace
coverColor.repeat.set(0.05, 0.7)
coverColor.wrapS = THREE.RepeatWrapping
coverColor.wrapT = THREE.RepeatWrapping

const coverDisplacement = textureLoader.load('/textures/leather/Leather030_1K-JPG_Displacement.jpg')
coverDisplacement.repeat.set(0.05,0.7)
coverDisplacement.wrapS = THREE.RepeatWrapping
coverDisplacement.wrapT = THREE.RepeatWrapping
const coverNormal = textureLoader.load('/textures/leather/Leather030_1K-JPG_NormalGL.jpg')
coverNormal.repeat.set(0.05,0.7)
coverNormal.wrapS = THREE.RepeatWrapping
coverNormal.wrapT = THREE.RepeatWrapping
const coverRoughness = textureLoader.load('/textures/leather/Leather030_1K-JPG_Roughness.jpg')
coverRoughness.repeat.set(0.05,0.7)
coverRoughness.wrapS = THREE.RepeatWrapping
coverRoughness.wrapT = THREE.RepeatWrapping

// Cover Textures
const cover1Color = coverColor.clone()
cover1Color.repeat.set(1,1)
const cover1Normal = coverNormal.clone()
cover1Normal.repeat.set(1,1)
const cover1Roughness = coverRoughness.clone()
cover1Roughness.repeat.set(1,1)



// Scene
const scene = new THREE.Scene()

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


// Covers
const coverGeo = new THREE.BoxGeometry(
  sheet.width + thick.cover * 2,
  base.height,
  thick.cover - 0.15
)
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

const coverMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: cover1Color,
  // displacementMap: coverDisplacement,
  // displacementScale: 0.1,
  // displacementBias: 0.05,
  normalMap: cover1Normal,
  roughnessMap: cover1Roughness,
})

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) 
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xff9000, 1500)
pointLight.position.set(0,-10,40)
scene.add(pointLight)


// Camera
const sizes = 
  {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0,0,30)
scene.add(camera)

// Render
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)

// Resize
window.addEventListener('resize', () =>
  {
    // Update sizes
    sizes.width  = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Update Camera 
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
  })



function pageRot(number, part)
{
  let coverOffset = 0
  let coverAnchor = 0
  let sheetWidth = sheet.width / 2
  let sign
  let numberS
  let minAngle
  let maxAngle
  const baseAngle = 1.0 - (part/10) + 0.5

  if (number > 5)
  {
    numberS = 11 - number
    sign = - 1.0
  } else 
  {
    numberS = number
    sign = 1.0
  }

  if (number == 1 || number == sheet.count)
  {
    coverOffset = thick.cover / 2
    coverAnchor = - 0.09
    sheetWidth = sheet.width / 2 + thick.cover
  }

  if ( baseAngle <= 1.0 )
  {
    maxAngle = baseAngle - 0.1
    minAngle = 0.0
  } else 
  {
    maxAngle = 0.9
    minAngle = baseAngle - 1.0
  }
  
  const edge = new THREE.Vector3( sign * ((base.width / 2) * ((6 - numberS) / (sheet.count / 0.8)) + coverOffset) , 0, coverAnchor )  // Get a point anchor for the page on the static base
  const edgeWorld = edge.clone().applyMatrix4(basePlane.matrixWorld)  // Same anchor point but in space

  const curve = 1.4
  let angle = Math.sqrt( - part * curve + (number) * curve)
  if (!angle)
  {
    angle = minAngle
  } else if (angle > maxAngle)
  {
    angle = maxAngle
  } else if (angle < minAngle) 
  {
    angle = minAngle
  } else 
  {
    angle = angle
  }
  angle = angle * Math.PI + number / 85
  // console.log(number, angle)
  // angle = Math.PI * (sheet.count - number) / sheet.count
  // console.log(angle)

  const pageVec = new THREE.Vector3(sheetWidth * Math.cos(angle), 0.0, sheetWidth * Math.sin(angle))
  const pageCoord = new THREE.Vector3().addVectors(edgeWorld, pageVec)
  sheet.array[number - 1].position.copy(pageCoord)
  sheet.array[number - 1].rotation.y = - angle
}

// Sheets
for (let i = 1; i <= sheet.count; i ++)
{
  let sheeet
  if (i == sheet.count || i == 1)
  {
    sheeet = new THREE.Mesh(coverGeo, coverMaterial)
  } else
  {
    sheeet = new THREE.Mesh(sheetGeo, sheetMaterial)
  }
  // const sheeet = new THREE.Mesh(coverGeo, sheetMaterial)
  sheet.array.push(sheeet)
  scene.add(sheeet)
  pageRot(i,0)
}


// Pointer
window.addEventListener('pointermove', (event) =>
  {
    const part = event.clientX / sizes.width
    base.angle =  (part - 0.5) 
    basePlane.rotation.y = base.angle * Math.PI

    for (let i = 1; i <= sheet.count; i ++)
    {
      pageRot(i, part * 10)
    }
  })

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
 
  // Update Controls 
  controls.update()

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
