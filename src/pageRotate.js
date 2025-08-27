import * as THREE from 'three'
import { scene } from './scene.js'
import { sheet, thick, base, basePlane } from './base.js'



export function pageRot(number, part)
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
