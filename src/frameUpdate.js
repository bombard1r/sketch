import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { pageRot } from './pageRotate.js'
import { basePlane, sheet, base } from './base.js'
import { scene, camera, renderer, canvas } from './scene.js'


let activeNum = 5
let desNum = 5
let speedNum = 0
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
export function flipPage() 
{
    window.addEventListener('keypress', (event) =>
        {
            if (event.key >= 0 && event.key <=9)
            {
                const newNum = event.key
                desNum = newNum

                speedNum = (desNum - activeNum) * easeOutCubic(0.016)
            }
        }
    )
}

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

const clock = new THREE.Clock()

export function tick()
{
    const elapsedTime = clock.getElapsedTime()

    // Update Controls 
    // controls.update()

    if (speedNum !== 0)
    {
        activeNum += speedNum
        speedNum = (desNum - activeNum) * easeOutCubic(0.016)

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
