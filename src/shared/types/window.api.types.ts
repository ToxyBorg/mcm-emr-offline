import { CopyingStatus } from './copyingDataToBackupStatus'
import { CreatingDirectoryStatus } from './creatingDirectoryStatus'
import { ExtractionStatus } from './extractionStatus'
import { MySQLConfig } from './mysql_config'
import { RemovingDirectoryStatus } from './removingDirectoryStatus'
import { SpringBootConfig } from './springboot_config'

export interface API {
  getCurrentDir: () => Promise<string>
  getPreviousDir: (fullPath: string) => string
  openMcmEmrUrl: (mcmEmrUrl: string) => Promise<void>
  joinPath: (...segments: string[]) => Promise<string>
  checkPathExists: (fullPath: string) => boolean
  checkDirIsEmpty: (fullPath: string) => Promise<boolean>
  isZipFile: (fullPath: string) => boolean
  extractZipFileStream: (fullPathToZipFile: string) => Promise<ExtractionStatus>
  copyDataToBackUp: (
    fullPathToDataDirectory: string,
    fullPathToBackupDataDirectory: string
  ) => Promise<CopyingStatus>
  removingDirectory: (fullPathToExtractedDirectory: string) => Promise<RemovingDirectoryStatus>
  creatingDirectory: (fullPathToExtractedDirectory: string) => Promise<CreatingDirectoryStatus>
  listZipFiles: (dirPath: string) => string[]
  executeCommand: (command: string, timeout?: number) => Promise<void>
  readMySQLConfigJson: (fullPath: string) => Promise<MySQLConfig>
  readSpringBootConfigJson: (fullPath: string) => Promise<SpringBootConfig>
  writeMySQLConfigJson: (fullPath: string, config: MySQLConfig) => Promise<void>
  writeSpringBootConfigJson: (fullPath: string, config: SpringBootConfig) => Promise<void>
  stopMySQLServer: () => Promise<void>
  stopSpringBootServer: () => Promise<void>
  isMySQLServerRunning: (
    host: string,
    port: number,
    user: string,
    password: string | null
  ) => Promise<boolean>
  importSqlFilesFromDirectory: (
    mysqlPath: string,
    directoryPath: string,
    user: string,
    password: string
  ) => Promise<void>
  isSpringBootServerRunning: (host: string, port: number) => Promise<boolean>
}
