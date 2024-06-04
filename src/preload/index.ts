import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import * as path from 'path'
import * as fs_extra from 'fs-extra'
import * as unzipper from 'unzipper'
import { ExtractionStatus } from '../shared/types/extractionStatus'
import { RemovingDirectoryStatus } from '@shared/types/removingDirectoryStatus'
import { CopyingStatus } from '@shared/types/copyingDataToBackupStatus'
import { CreatingDirectoryStatus } from '@shared/types/creatingDirectoryStatus'
import { MySQLConfig } from '@shared/types/mysql_config'
import { API } from '@shared/types/window.api.types'

// Custom APIs for renderer
const api: API = {
  isMySQLServerRunning: (
    host: string,
    port: number,
    user: string,
    password: string | null
  ): Promise<boolean> => ipcRenderer.invoke('is-mysql-server-running', host, port, user, password),
  stopMySQLServer: async (): Promise<void> => ipcRenderer.invoke('stop-mysql-server'),
  readMySQLConfigJson: async (fullPath: string): Promise<MySQLConfig> =>
    ipcRenderer.invoke('read-mysql-config', fullPath),
  writeMySQLConfigJson: async (fullPath: string, config: MySQLConfig): Promise<void> =>
    ipcRenderer.invoke('write-mysql-config', fullPath, config),
  getCurrentDir: async (): Promise<string> => ipcRenderer.invoke('get-current-directory'),
  joinPath: (...segments: string[]): Promise<string> =>
    ipcRenderer.invoke('join-path-segments', ...segments),
  executeCommand: (command: string, timeout?: number): Promise<void> =>
    ipcRenderer.invoke('execute-command', command, timeout),

  getPreviousDir: (fullPath: string): string => path.dirname(fullPath),

  extractZipFileStream: async (fullPathToZipFile: string): Promise<ExtractionStatus> => {
    const directoryOfZipFile = path.dirname(fullPathToZipFile)

    await fs_extra
      .createReadStream(fullPathToZipFile)
      .pipe(unzipper.Extract({ path: directoryOfZipFile }))
      .on('entry', (entry) => entry.autodrain())
      .promise()
      .then(
        (): ExtractionStatus => {
          console.log(
            `Zip file ${fullPathToZipFile} SUCCESSFULLY extracted to ${directoryOfZipFile}`
          )
          return 'EXTRACTED'
        },
        (e): ExtractionStatus => {
          console.log(
            `ERROR! Zip file ${fullPathToZipFile} could NOT be extracted to ${directoryOfZipFile}: ${e}`
          )
          return 'FAILED_EXTRACTION'
        }
      )

    return 'EXTRACTING'
  },
  removingDirectory: async (
    fullPathToExtractedDirectory: string
  ): Promise<RemovingDirectoryStatus> => {
    await fs_extra
      .rm(fullPathToExtractedDirectory, { recursive: true })
      .then((): RemovingDirectoryStatus => {
        console.log(`Directory ${fullPathToExtractedDirectory} has been removed`)
        return 'REMOVED'
      })
      .catch((error): RemovingDirectoryStatus => {
        console.error(`Error: ${error.message}`)
        return 'FAILED_REMOVING'
      })
    return 'REMOVING'
  },

  creatingDirectory: async (
    fullPathToExtractedDirectory: string
  ): Promise<CreatingDirectoryStatus> => {
    await fs_extra
      .mkdir(fullPathToExtractedDirectory, { recursive: true })
      .then((): CreatingDirectoryStatus => {
        console.log(`Directory ${fullPathToExtractedDirectory} has been created`)
        return 'CREATED'
      })
      .catch((error): CreatingDirectoryStatus => {
        console.error(`Error: ${error.message}`)
        return 'FAILED_CREATION'
      })
    return 'CREATING'
  },
  copyDataToBackUp: async (
    fullPathToDataDirectory: string,
    fullPathToBackupDataDirectory: string
  ): Promise<CopyingStatus> => {
    // Name the backup data directory using the current date and time
    const date = new Date()
    const dataBackupDirectoryName = `data_${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`

    // Append the date to the destination path
    const finalDestinationPath = path.join(fullPathToBackupDataDirectory, dataBackupDirectoryName)

    // If the backup directory doesn't exist, we create it
    if (!fs_extra.existsSync(finalDestinationPath)) {
      //
      await fs_extra
        .mkdir(finalDestinationPath, { recursive: true })
        .then((): void => {
          console.log(
            `Directory ${dataBackupDirectoryName} has been created at ${finalDestinationPath}`
          )
        })
        .catch((error): CopyingStatus => {
          console.error(`Error: ${error.message}`)
          return 'FAILED_COPYING'
        })
    }

    await fs_extra
      .copy(fullPathToDataDirectory, finalDestinationPath)
      .then((): CopyingStatus => {
        console.log(
          `Directory ${dataBackupDirectoryName} has been created at ${finalDestinationPath}`
        )
        return 'COPIED'
      })
      .catch((error): CopyingStatus => {
        console.error(`Error: ${error.message}`)
        return 'FAILED_COPYING'
      })

    return 'COPYING'
  },

  listZipFiles: (dirPath: string): string[] => {
    return fs_extra.readdirSync(dirPath).filter((file) => file.endsWith('.zip'))
  },

  isZipFile: (fullPath: string): boolean => {
    return path.extname(fullPath) === '.zip' && fs_extra.existsSync(fullPath)
  },

  checkPathExists: (fullPath: string): boolean => fs_extra.existsSync(fullPath),

  checkDirIsEmpty: async (fullPath: string): Promise<boolean> => {
    console.log('- checkDirIsEmpty fullPath:', fullPath)

    const isDirectoryEmpty = await fs_extra.promises
      .readdir(fullPath)
      .then((listOfContentInDirectory): boolean => {
        if (listOfContentInDirectory.length == 0) {
          console.log(`Directory ${fullPath} is EMPTY`)
          return true
        } else {
          return false
        }
      })
      .catch((error) => {
        console.error(`Error Reading The Directory At ${fullPath}`, error)
        return false
      })
    return isDirectoryEmpty
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
