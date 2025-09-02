import * as THREE from 'three'
import { sheet, coverGeo, sheetGeo, materials } from './base.js'
import { scene } from './scene.js'
import { pageRot } from './pageRotate.js'

// Sheets
export function generateSheets()
{
    for (let i = 0; i < sheet.count; i ++)
    {
        let sheeet
        if (i == sheet.count - 1 || i == 0)
        {
            sheeet = new THREE.Mesh(coverGeo, materials.cover)
        } else
        {
            sheeet = new THREE.Mesh(sheetGeo, materials.sheets[i - 1])
        }

        sheet.array.push(sheeet)
        scene.add(sheeet)
        pageRot(i + 1, 5)
    }
}
