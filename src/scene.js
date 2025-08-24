import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();


// Camera
const sizes = 
  {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0,0,20)
scene.add(camera)


// Render
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// Lights
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) 
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xff9000, 1500)
    pointLight.position.set(0,-10,40)
    scene.add(pointLight)
}

export { scene, sizes, camera, renderer, addLights, canvas };
