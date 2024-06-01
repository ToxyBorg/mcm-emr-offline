import { ElectronAPI } from '@electron-toolkit/preload'
import { ExtractionStatus } from '@renderer/shared/handlers/types/extractionStatus'
import { CopyingStatus } from '@shared/types/copyingDataToBackupStatus'
import { RemovingDirectoryStatus } from '@shared/types/removingDirectoryStatus'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getCurrentDir: () => string
      getPreviousDir: (fullPath: string) => string
      joinPath: (...segments: string[]) => string
      checkPathExists: (fullPath: string) => boolean
      isZipFile: (fullPath: string) => boolean
      extractZipFileStream: (fullPathToZipFile: string) => Promise<ExtractionStatus>
      copyDataToBackUp: (
        fullPathToDataDirectory: string,
        fullPathToBackupDataDirectory: string
      ) => Promise<CopyingStatus>
      removingDirectory: (fullPathToExtractedDirectory: string) => Promise<RemovingDirectoryStatus>
      listZipFiles: (dirPath: string) => string[]
    }
  }
}
