import { BinariesType } from '@shared/types/binariesPath'
import { ExtractionFileType } from '@shared/types/extractionPath'
import { MySQLConfig } from '@shared/types/mysql_config'
import { SpringBootConfig } from '@shared/types/springboot_config'

// JAVA PROD VERSION
const defaultPathToJavaDirectory = ['resources', 'app.asar.unpacked', 'resources', 'Java']
const defaultJavaZipName = 'zulu8.78.0.19-ca-jdk8.0.412-win_x64.zip'
const defaultJavaDirectory = [...defaultPathToJavaDirectory, defaultJavaZipName.slice(0, -4)]
const defaultJavaBinDirectory = [...defaultJavaDirectory, 'bin']
const defaultJavaJarDirectory = [...defaultPathToJavaDirectory, 'jar executable']
const defaultJavaJarName = 'mcm-EMR-RELEASE-3.8.jar'
const defaultSpringBootConfigDirectory = [...defaultPathToJavaDirectory, 'SpringBoot config']
const defaultSpringBootConfigPath = [...defaultSpringBootConfigDirectory, 'SpringBoot_Config.json']

const defaultSpringBootConfig: SpringBootConfig = {
  springboot_sever_info: {
    started: false,
    host: 'localhost',
    port: 2200,
    processes: {
      java: {
        names: ['java.exe', 'java'],
        binaryPathSegments: [...defaultJavaBinDirectory, 'java.exe']
      }
    }
  }
}

// MYSQL PROD VERSION
const defaultPathToMySQLDirectory = ['resources', 'app.asar.unpacked', 'resources', 'MySQL']
const defaultMySQLZipName = 'mysql-8.0.37-winx64.zip'
const defaultMySQLDumpFilesZipName = 'Doctors Data.zip'
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
  sqlDataDumped: false,
  password: 'root',
  user: 'root',
  mysql_sever_info: {
    started: false,
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
const defaultMySQLConfigDirectory = [...defaultPathToMySQLDirectory, 'MySQL config']
const defaultMySQLDumpsRootDirectory = [
  ...defaultMySQLConfigDirectory,
  defaultMySQLDumpFilesZipName.slice(0, -4)
]
const defaultMySQLConfigPath = [...defaultMySQLConfigDirectory, 'MySQL_Config.json']
// DEV VERSIONS
const DEV_defaultPathToJavaDirectory = ['resources', 'Java']
const DEV_defaultJavaDirectory = [
  ...DEV_defaultPathToJavaDirectory,
  defaultJavaZipName.slice(0, -4)
]
const DEV_defaultSpringBootConfigDirectory = [
  ...DEV_defaultPathToJavaDirectory,
  'SpringBoot config'
]
const DEV_defaultSpringBootConfigPath = [
  ...DEV_defaultSpringBootConfigDirectory,
  'SpringBoot_Config.json'
]

const DEV_defaultJavaBinDirectory = [...DEV_defaultJavaDirectory, 'bin']
const DEV_defaultJavaJarDirectory = [...DEV_defaultPathToJavaDirectory, 'jar executable']

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

const DEV_defaultMySQLConfigDirectory = [...DEV_defaultPathToMySQLDirectory, 'MySQL config']
const DEV_defaultMySQLConfigPath = [...DEV_defaultMySQLConfigDirectory, 'MySQL_Config.json']
const DEV_defaultMySQLDumpsRootDirectory = [
  ...DEV_defaultMySQLConfigDirectory,
  defaultMySQLDumpFilesZipName.slice(0, -4)
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
  },
  {
    pathSegmentsToZipDirectory: defaultMySQLConfigDirectory,
    defaultZipFileName: defaultMySQLDumpFilesZipName
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
  },
  {
    pathSegmentsToZipDirectory: DEV_defaultMySQLConfigDirectory,
    defaultZipFileName: defaultMySQLDumpFilesZipName
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
  },
  {
    nameOfBinary: defaultJavaJarName,
    pathSegmentsToBinaryDirectory: defaultJavaJarDirectory
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
  },
  {
    nameOfBinary: defaultJavaJarName,
    pathSegmentsToBinaryDirectory: DEV_defaultJavaJarDirectory
  }
]

// ************************************** //
type EnvironmentType = 'DEV' | 'PROD'
const ENVIRONMENT: EnvironmentType = 'PROD'

let binaries_to_check: BinariesType[] = PROD_binaries_to_check
let files_to_extract: ExtractionFileType[] = PROD_files_to_extract
let mysqlDataDirSegments: string[] = defaultMySQLDataDirectory
let mysqlConfigPathSegments: string[] = defaultMySQLConfigPath
let springBootConfigPathSegments: string[] = defaultSpringBootConfigPath
let mysqlBinPathSegments: string[] = defaultMySQLBinDirectory
let pathToMySQLDirectory: string[] = defaultPathToMySQLDirectory
let javaBinPathSegments: string[] = defaultJavaBinDirectory
let javaJarPathSegments: string[] = [...defaultJavaJarDirectory, defaultJavaJarName]
let mysqlDumpsRootDirectorySegments: string[] = defaultMySQLDumpsRootDirectory

// IF WE"RE IN DEV MODE WE CHANGE THE FILEPATHS
if ((ENVIRONMENT as EnvironmentType) == 'DEV') {
  binaries_to_check = DEV_binaries_to_check
  files_to_extract = DEV_files_to_extract
  mysqlDataDirSegments = DEV_defaultMySQLDataDirectory
  mysqlConfigPathSegments = DEV_defaultMySQLConfigPath
  springBootConfigPathSegments = DEV_defaultSpringBootConfigPath
  mysqlBinPathSegments = DEV_defaultMySQLBinDirectory
  pathToMySQLDirectory = DEV_defaultPathToMySQLDirectory
  javaBinPathSegments = DEV_defaultJavaBinDirectory
  javaJarPathSegments = [...DEV_defaultJavaJarDirectory, defaultJavaJarName]
  mysqlDumpsRootDirectorySegments = DEV_defaultMySQLDumpsRootDirectory
}
export {
  binaries_to_check,
  files_to_extract,
  mysqlDataDirSegments,
  mysqlConfigPathSegments,
  springBootConfigPathSegments,
  mysqlBinPathSegments,
  defaultMysqlConfig,
  pathToMySQLDirectory,
  javaBinPathSegments,
  javaJarPathSegments,
  mysqlDumpsRootDirectorySegments,
  defaultSpringBootConfig
}
