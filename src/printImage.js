import * as THREE from 'three'
import { sheet } from './base.js'
import { paperColor } from './textures.js'


// Print image on key 'P'
export function  printImage() 
{
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
}
