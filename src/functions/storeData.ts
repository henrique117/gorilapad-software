import { promises as fs } from 'fs'
import * as Interfaces from '../interfaces/interfaces.export'
import path from 'path'

const configFilePath = path.join(__dirname, '../config.json')

export default async function saveData(data: Interfaces.DataInterface): Promise<void> {
    try {
        await fs.writeFile(configFilePath, JSON.stringify(data))
    } catch (error) {
        console.error('Error on loading file: ', error)
    }
}