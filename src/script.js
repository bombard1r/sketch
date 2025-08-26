import { scene, sizes, camera, renderer, addLights, canvas, resizeHandler } from './scene.js'
import { 
    paperColor, paperDisplacement, paperNormal, paperRoughness, 
    coverColor, coverDisplacement, coverNormal, coverRoughness, 
    cover1Color, cover1Normal, cover1Roughness 
} from './textures.js'
import { basePlane, sheet, thick, base } from './base.js'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'



// GUI
const gui = new dat.GUI()


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


addLights()
resizeHandler()



function pageRot(number, part)
{
  let coverOffset = 0
  let coverAnchor = 0.15
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

  sheet.array.push(sheeet)
  scene.add(sheeet)
  pageRot(i,5)
}


// // Pointer
// window.addEventListener('pointermove', (event) =>
//   {
//     // const part = event.clientX / sizes.width
//     base.angle =  (part - 0.5) 
//     basePlane.rotation.y = base.angle * Math.PI
//     //
//     // for (let i = 1; i <= sheet.count; i ++)
//     // {
//     //   pageRot(i, part * 10)
//     // }
//   })

let activeNum = 5
let desNum = 5
let speedNum = 0
window.addEventListener('keypress', (event) =>
  {
    if (event.key >= 0 && event.key <=9)
    {
      const newNum = event.key
      desNum = newNum

      speedNum = 2 * (desNum - activeNum) / 100
    }
  })


window.addEventListener('keypress', (event) =>
  {
    if (event.code === 'KeyP')
    {
      let loaded = 0
      const paperImage = paperColor.image 
      const pictureImage = new Image()
      pictureImage.crossOrigin = 'anonymous'
      pictureImage.src = '/wings.jpg'

      function checkLoaded() 
      {
        loaded ++
        if (loaded === 1)
        {
          const canvas = document.createElement('canvas')
          canvas.width = sheet.width * 100
          canvas.height = sheet.height * 100

          const context = canvas.getContext('2d')
          context.drawImage(paperImage, 0, 0, canvas.width, canvas.height)
          context.globalAlpha = 0.9
          context.globalCompositeOperation = 'multiply'
          context.drawImage(pictureImage, 100, 100, canvas.width / 20, canvas.height / 20)
          
          const blendedTexture = new THREE.CanvasTexture(canvas)
          blendedTexture.needsUpdate = true

          sheet.array[1].material.map = blendedTexture
        }
      }

      paperImage.onload = checkLoaded
      pictureImage.onload = checkLoaded
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

  if (speedNum !== 0)
  {
    activeNum += speedNum
    speedNum = 2 * (desNum - activeNum) / 50

    base.angle =  (activeNum / 10 - 0.5) 
    basePlane.rotation.y = base.angle * Math.PI

    for (let i = 1; i <= sheet.count; i ++)
    {
      pageRot(i, activeNum)
    }
  }

  // Render
  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
