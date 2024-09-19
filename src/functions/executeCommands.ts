import { exec } from 'child_process'

export default async function executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`)
            } else {
                resolve(stdout)
            }
        })
    })
}