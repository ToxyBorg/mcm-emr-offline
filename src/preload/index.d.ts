import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getCurrentDir: () => string
      joinPath: (...segments: string[]) => string
      checkPathExists: (fullPath: string) => boolean
      isZipFile: (fullPath: string) => boolean
      extractZipFile: (fullPath: string) => Promise<string>
      extractZipFileStream: (fullPath: string) => Promise<string>
    }
  }
}
