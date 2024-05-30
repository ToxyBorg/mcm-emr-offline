import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as path from 'path'
import * as fs from 'fs'
import * as unzipper from 'unzipper'

// Custom APIs for renderer
const api = {
  getCurrentDir: (): string => process.cwd(),
  joinPath: (...segments: string[]): string => path.join(...segments),
  checkPathExists: (fullPath: string): boolean => fs.existsSync(fullPath),
  isZipFile: (fullPath: string): boolean => {
    return path.extname(fullPath) === '.zip' && fs.existsSync(fullPath)
  },
  extractZipFile: async (fullPath: string): Promise<string> => {
    const dir = path.dirname(fullPath)
    await fs.createReadStream(fullPath).pipe(unzipper.Extract({ path: dir }))
    return `Zip file ${fullPath} extracted to ${dir}`
  },
  extractZipFileStream: async (fullPath: string): Promise<string> => {
    const dir = path.dirname(fullPath)

    fs.createReadStream(fullPath)
      .pipe(unzipper.Extract({ path: dir }))
      .on('entry', (entry) => entry.autodrain())
      .promise()
      .then(
        () => {
          console.log(`Zip file ${fullPath} extracted to ${dir}`)
          return `Zip file ${fullPath} extracted to ${dir}`
        },
        (e) => {
          console.log(`EROOR! Zip file ${fullPath} could NOT be extracted to ${dir}: ${e}`)
          return `EROOR! Zip file ${fullPath} could NOT be extracted to ${dir}: ${e}`
        }
      )
      .finally(() => {
        console.log('Finally')
        alert('Finally')
        return 'Finally'
      })

    return `Extracting ${fullPath} extracted to ${dir}`
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
