import { promises as fs } from 'fs'
import * as Interfaces from '../interfaces/interfaces.export'
import path from 'path'
import * as Functions from './functions.export'

const configFilePath = path.join(__dirname, '../config.json')

export default async function readData(): Promise<Interfaces.DataInterface> {

    var data: Interfaces.DataInterface = {
        RapidTrigger: false,
        ContinuousRapidTrigger: false,
        LowerActionPoint: 200,
        UpperActionPoint: 200
    }

    try {
        await fs.access(configFilePath)
        data = JSON.parse(await fs.readFile(configFilePath, 'utf8'))
    } catch (err) {
        console.error('Erro ao carregar o arquivo de configuração:', err)
        await Functions.storeData(data)
    }

    return data
}