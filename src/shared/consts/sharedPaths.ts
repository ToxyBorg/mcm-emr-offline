import { BinariesType } from '@shared/types/binariesPath'
import { ExtractionFileType } from '@shared/types/extractionPath'
import { MySQLConfig } from '@shared/types/mysql_config'

// JAVA PROD VERSION
const defaultPathToJavaDirectory = ['resources', 'app.asar.unpacked', 'resources', 'Java']
const defaultJavaZipName = 'zulu8.78.0.19-ca-jdk8.0.412-win_x64.zip'
const defaultJavaBinDirectory = [
  ...defaultPathToJavaDirectory,
  defaultJavaZipName.slice(0, -4),
  'bin'
]

// MYSQL PROD VERSION
const defaultPathToMySQLDirectory = ['resources', 'app.asar.unpacked', 'resources', 'MySQL']
const defaultMySQLZipName = 'mysql-8.0.37-winx64.zip'
const defaultMySQLBinDirectory = [
  ...defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'bin'
]
const defaultMySQLDataDirectory = [
  ...defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'data'
]

const defaultMysqlConfig: MySQLConfig = {
  Initialized: false,
  password: null,
  user: 'root',
  mysql_sever_info: {
    port: 3306,
    host: 'localhost',
    processes: {
      mysqld: {
        names: ['mysqld.exe', 'mysqld'],
        binaryPathSegments: [...defaultMySQLBinDirectory, 'mysqld.exe']
      },
      mysql: {
        names: ['mysql.exe', 'mysql'],
        binaryPathSegments: [...defaultMySQLBinDirectory, 'mysql.exe']
      },
      mysqladmin: {
        names: ['mysqladmin.exe', 'mysqladmin'],
        binaryPathSegments: [...defaultMySQLBinDirectory, 'mysqladmin.exe']
      }
    }
  }
}
const defaultMySQLConfigPath = [...defaultPathToMySQLDirectory, 'MySQL config', 'MySQL_Config.json']
// DEV VERSIONS
const DEV_defaultPathToJavaDirectory = ['resources', 'Java']
const DEV_defaultJavaBinDirectory = [
  ...DEV_defaultPathToJavaDirectory,
  defaultJavaZipName.slice(0, -4),
  'bin'
]

const DEV_defaultPathToMySQLDirectory = ['resources', 'MySQL']
const DEV_defaultMySQLBinDirectory = [
  ...DEV_defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'bin'
]
const DEV_defaultMySQLDataDirectory = [
  ...DEV_defaultPathToMySQLDirectory,
  defaultMySQLZipName.slice(0, -4),
  'data'
]

const DEV_defaultMySQLConfigPath = [
  ...DEV_defaultPathToMySQLDirectory,
  'MySQL config',
  'MySQL_Config.json'
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
const ENVIRONMENT: EnvironmentType = 'PROD'

let binaries_to_check: BinariesType[] = PROD_binaries_to_check
let files_to_extract: ExtractionFileType[] = PROD_files_to_extract
let mysqlDataDirSegments: string[] = defaultMySQLDataDirectory
let mysqlConfigPathSegments: string[] = defaultMySQLConfigPath
let mysqlBinPathSegments: string[] = defaultMySQLBinDirectory
let pathToMySQLDirectory: string[] = defaultPathToMySQLDirectory

// IF WE"RE IN DEV MODE WE CHANGE THE FILEPATHS
if ((ENVIRONMENT as EnvironmentType) == 'DEV') {
  binaries_to_check = DEV_binaries_to_check
  files_to_extract = DEV_files_to_extract
  mysqlDataDirSegments = DEV_defaultMySQLDataDirectory
  mysqlConfigPathSegments = DEV_defaultMySQLConfigPath
  mysqlBinPathSegments = DEV_defaultMySQLBinDirectory
  pathToMySQLDirectory = DEV_defaultPathToMySQLDirectory
}
export {
  binaries_to_check,
  files_to_extract,
  mysqlDataDirSegments,
  mysqlConfigPathSegments,
  mysqlBinPathSegments,
  defaultMysqlConfig,
  pathToMySQLDirectory
}
