import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


// GUI
const gui = new dat.GUI()

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
    width: thick.paper * sheet.count + thick.cover * 2,
    height: sheet.height + thick.cover * 2,
  }
const baseGeo = new THREE.PlaneGeometry( 
  base.width, 
  base.height,
  64,64
)
const baseMaterial = new THREE.MeshBasicMaterial({
  color: 0xcccccc,
  side: THREE.DoubleSide,
})
const basePlane = new THREE.Mesh(baseGeo, baseMaterial)
scene.add(basePlane)


// Covers
const coverGeo = new THREE.PlaneGeometry(
  sheet.width,
  base.height,
  64,64
)
// const sheetGeo = new THREE.PlaneGeometry(
//   sheet.width,
//   base.height,
//   64,64
// )
const sheetMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
})



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
  let addOffset
  let sign
  let numberS
  if (number > 5)
  {
    numberS = 11 - number
    addOffset = 1.0
    sign = - 1.0
  } else 
  {
    numberS = number
    addOffset = 0.0
    sign = 1.0
  }
  const edge = new THREE.Vector3( sign * (base.width / 2) * (numberS / (sheet.count / 2)) , 0, 0 )  // Get a point anchor for the page on the static base
  const edgeWorld = edge.clone().applyMatrix4(basePlane.matrixWorld)  // Same anchor point but in space

  const curve = Math.abs(1 / (2 * numberS))
  const curve1 = 1 / curve
  const offset = ( - curve1 + Math.sqrt( curve1 * curve1 + 4 * curve1 )) / ( 2 * curve1 ) + addOffset
  let angle = Math.PI * ((curve / (part + offset * sign)) - offset * sign)  // ERROR !!!
  // angle = Math.PI * (sheet.count - number) / sheet.count
  console.log(angle)

  const pageVec = new THREE.Vector3((sheet.width / 2) * Math.cos(angle), 0.0, (sheet.width / 2) * Math.sin(angle))
  const pageCoord = new THREE.Vector3().addVectors(edgeWorld, pageVec)
  sheet.array[number - 1].position.copy(pageCoord)
  sheet.array[number - 1].rotation.y = - angle
}

// Sheets
for (let i = 1; i <= sheet.count; i ++)
{
  const sheeet = new THREE.Mesh(coverGeo, sheetMaterial)
  sheet.array.push(sheeet)
  if (i)
  {
    scene.add(sheeet)
    pageRot(i,0.4)
  }
}


// Pointer
window.addEventListener('pointermove', (event) =>
  {
    const part = event.clientX / sizes.width
    const flipValue = 1.0 - part
    // planeMaterial.uniforms.uAngle.value = flipValue
    basePlane.rotation.y = - Math.PI * ( flipValue - 0.5 )

    for (let i = 1; i <= sheet.count; i ++)
    {
      pageRot(i, part)
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
