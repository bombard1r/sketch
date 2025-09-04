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
camera.position.set(0,-5,30)
camera.lookAt(0,0,0)
scene.add(camera)


// Render
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// Lights
function addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1) 
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xff9000, 5000)
    pointLight.position.set(0,-14,40)
    scene.add(pointLight)
}


// Resize
function resizeHandler() {
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
}

export { scene, sizes, camera, renderer, addLights, canvas, resizeHandler };
