import { BinariesType } from '@shared/types/binariesPath'
import { ExtractionFileType } from '@shared/types/extractionPath'

// JAVA PROD VERSION
export const defaultPathToJavaDirectory = ['resources', 'app.asar.unpacked', 'resources', 'Java']
export const defaultJavaZipName = 'zulu8.78.0.19-ca-jdk8.0.412-win_x64.zip'
export const defaultJavaBinDirectory = [
  ...defaultPathToJavaDirectory,
  defaultJavaZipName.slice(0, -4),
  'bin'
]

export const defaultJavaExecutable = 'java.exe'

// MYSQL PROD VERSION
export const defaultPathToMySQLDirectory = ['resources', 'app.asar.unpacked', 'resources', 'MySQL']
export const defaultMySQLZipName = 'mysql-8.0.37-winx64.zip'
export const defaultMySQLBinDirectory = [
  ...defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'bin'
]
export const defaultMySQLExecutable = 'mysql.exe'
export const defaultMySQLdExecutable = 'mysqld.exe'
export const defaultMySQLAdminExecutable = 'mysqladmin.exe'

// DEV VERSIONS
export const DEV_defaultPathToJavaDirectory = ['resources', 'Java']
export const DEV_defaultJavaBinDirectory = [
  ...DEV_defaultPathToJavaDirectory,
  defaultJavaZipName.slice(0, -4),
  'bin'
]

export const DEV_defaultPathToMySQLDirectory = ['resources', 'MySQL']
export const DEV_defaultMySQLBinDirectory = [
  ...DEV_defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'bin'
]

// ************************************** //
const PROD_files_to_extract: ExtractionFileType[] = [
  {
    pathSegmentsToZipDirectory: defaultPathToMySQLDirectory,
    defaultZipFileName: defaultMySQLZipName
  },
  {
    pathSegmentsToZipDirectory: defaultPathToJavaDirectory,
    defaultZipFileName: defaultJavaZipName
  }
]

// This is the DEV version of the paths. CHANGE FOR PROD WITH THE ABOVE VERSION
const DEV_files_to_extract: ExtractionFileType[] = [
  {
    pathSegmentsToZipDirectory: DEV_defaultPathToMySQLDirectory,
    defaultZipFileName: defaultMySQLZipName
  },
  {
    pathSegmentsToZipDirectory: DEV_defaultPathToJavaDirectory,
    defaultZipFileName: defaultJavaZipName
  }
]
// ************************************** //
const PROD_binaries_to_check: BinariesType[] = [
  {
    nameOfBinary: 'mysql.exe',
    pathSegmentsToBinaryDirectory: defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'mysqld.exe',
    pathSegmentsToBinaryDirectory: defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'mysqladmin.exe',
    pathSegmentsToBinaryDirectory: defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'java.exe',
    pathSegmentsToBinaryDirectory: defaultJavaBinDirectory
  }
]

// This is the DEV version of the paths. CHANGE FOR PROD WITH THE ABOVE VERSION
const DEV_binaries_to_check: BinariesType[] = [
  {
    nameOfBinary: 'mysql.exe',
    pathSegmentsToBinaryDirectory: DEV_defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'mysqld.exe',
    pathSegmentsToBinaryDirectory: DEV_defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'mysqladmin.exe',
    pathSegmentsToBinaryDirectory: DEV_defaultMySQLBinDirectory
  },
  {
    nameOfBinary: 'java.exe',
    pathSegmentsToBinaryDirectory: DEV_defaultJavaBinDirectory
  }
]

// ************************************** //
type EnvironmentType = 'DEV' | 'PROD'
const ENVIRONMENT: EnvironmentType = 'DEV'

let binaries_to_check: BinariesType[] = PROD_binaries_to_check
let files_to_extract: ExtractionFileType[] = PROD_files_to_extract

// IF WE"RE IN DEV MODE WE CHANGE THE FILEPATHS
if ((ENVIRONMENT as EnvironmentType) == 'DEV') {
  binaries_to_check = DEV_binaries_to_check
  files_to_extract = DEV_files_to_extract
}
export { binaries_to_check, files_to_extract }
