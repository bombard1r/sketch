import * as THREE from 'three'
import { sheet, coverGeo, coverMaterial, sheetGeo, sheetMaterial } from './base.js'
import { scene } from './scene.js'
import { pageRot } from './pageRotate.js'

// Sheets
export function generateSheets()
{
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
}
