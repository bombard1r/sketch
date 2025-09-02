import * as THREE from 'three'
import { sheet } from './base.js'
import { textures } from './textures.js'
import { materials } from './base.js'

let isDrawing = false // Flag to track if the image is being drawn
let scale = 0.5 // Scale factor for zooming
let isMoving = false // Flag to track if the image is being moved
let position = { x: 100, y: 100 } // Position of the image

// Print image on key 'P'
export function  printImage() 
{
    // Load paper and image textures
    const paperImage = textures.paperColor.image 
    const pictureImage = new Image()
    pictureImage.crossOrigin = 'anonymous'
    pictureImage.src = '/wings.jpg'

    // Create a canvas to blend the two images
    const canvas = document.createElement('canvas')
    // Set canvas resolution
    canvas.width = sheet.width * 100
    canvas.height = sheet.height * 100
    const context = canvas.getContext('2d')
    console.log('Canvas size:', canvas.width, canvas.height)


    function drawImage()
    {
        // Reset context state
        context.globalAlpha = 1.0;
        context.globalCompositeOperation = 'source-over';
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height)

        // Draw paper texture first
        console.log(canvas.width, canvas.height)
        context.drawImage(paperImage, 0, 0, canvas.width, canvas.height)
        context.globalAlpha = 0.9
        context.globalCompositeOperation = 'multiply'
        // Draw picture on top
        const imgWidth = canvas.width * scale
        const imgHeight = canvas.height * scale
        context.drawImage(pictureImage, position.x, position.y, imgWidth, imgHeight)

        const blendedTexture = new THREE.CanvasTexture(canvas)
        blendedTexture.needsUpdate = true

        // Apply the blended texture to the paper material
        materials.sheets[1].uniforms.frontTexture.value = blendedTexture
        materials.sheets[1].needsUpdate = true
    }


    // Listen for P or Return keys
    window.addEventListener('keypress', (event) => {
        if (event.code === 'KeyP')
        {
            isDrawing = true
            drawImage()
        }

        if (event.code === 'Enter')
        {
            isDrawing = false
        }
    })


    // Listen for mouse wheel to zoom in/out
    window.addEventListener('wheel', (event) => {
        if (isDrawing) {
            // Adjust scale based on wheel delta
            scale += event.deltaY * -0.001
            // Clamp scale to a reasonable range
            scale = Math.min(Math.max(0.1, scale), 1.0)
            drawImage()
        }
    })


    window.addEventListener('mousedown', (event) => {
        if (isDrawing) {
            isMoving = true
        }
    })

    window.addEventListener('mouseup', () => {
        isMoving = false
    })
    
    let lastPos
    let newPos
    window.addEventListener('mousemove', (event) => {
        if (isDrawing && isMoving) {
            newPos = { x: event.clientX, y: event.clientY }
            if (lastPos) {
                const deltaX = (newPos.x - lastPos.x) * 5
                const deltaY = (newPos.y - lastPos.y) * 5
                position.x += deltaX
                position.y += deltaY
                drawImage()
            }
            lastPos = newPos      
        }
    })
}
