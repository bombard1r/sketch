import { addLights, resizeHandler } from './scene.js'
import { setTextures } from './base.js'
import { generateSheets } from './generateSheets.js'
import { tick, flipPage } from './frameUpdate.js'
import { printImage } from './printImage.js'
import { gui } from './gui.js'

export function startScene() {
    setTextures()
    addLights()
    resizeHandler()
    generateSheets()
    flipPage()
    printImage()

    tick()
}
