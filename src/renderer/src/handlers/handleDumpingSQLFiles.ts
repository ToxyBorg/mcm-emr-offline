import {
  mysqlBinPathSegments,
  mysqlDumpsRootDirectorySegments,
  mysqlConfigPathSegments
} from '@shared/consts/sharedPaths'
import { MySQLConfig } from '@shared/types/mysql_config'

// Main function to connect to the database and import all SQL files
export const handleDumpingSQLFiles = async (): Promise<boolean> => {
  try {
    // getting the FULL path to the directory.
    // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
    const mysqlBinPath: string = await mysqlBinPathSegments.reduce(
      async (acc, curr) => window.api.joinPath(await acc, curr),
      window.api.getCurrentDir()
    )
    console.log('- handleDumpingSQLFiles mysqlBinPath:', mysqlBinPath)

    const mysqlBinaryPath = await window.api.joinPath(mysqlBinPath, 'mysql.exe')
    console.log('- handleDumpingSQLFiles mysqlBinaryPath:', mysqlBinaryPath)

    const mysqlDumpsRootDirectoryPath: string = await mysqlDumpsRootDirectorySegments.reduce(
      async (acc, curr) => window.api.joinPath(await acc, curr),
      window.api.getCurrentDir()
    )
    console.log('- handleDumpingSQLFiles mysqlDumpsRootDirectoryPath:', mysqlDumpsRootDirectoryPath)

    const mysqlConfigPath: string = await mysqlConfigPathSegments.reduce(
      async (acc, curr) => window.api.joinPath(await acc, curr),
      window.api.getCurrentDir()
    )

    console.log('- handleDumpingSQLFiles mysqlConfigPath:', mysqlConfigPath)

    // Read the configuration file before the initialization just to make sure
    const mysqlConfig: MySQLConfig = await window.api.readMySQLConfigJson(mysqlConfigPath)

    console.log('- handleDumpingSQLFiles mysqlConfig: ', mysqlConfig)

    const mysqlUser = mysqlConfig.user
    console.log('- handleDumpingSQLFiles mysqlUser: ', mysqlUser)

    const mysqlPassword =
      mysqlConfig.password != null && mysqlConfig.password.toString() != 'null'
        ? mysqlConfig.password
        : 'root'
    console.log('- handleDumpingSQLFiles mysqlPassword: ', mysqlPassword)

    if (mysqlConfig.Initialized && !mysqlConfig.sqlDataDumped) {
      // Import all SQL files from the root directory
      await window.api.importSqlFilesFromDirectory(
        mysqlBinaryPath,
        mysqlDumpsRootDirectoryPath,
        mysqlUser,
        mysqlPassword
      )
    }

    mysqlConfig.sqlDataDumped = true
    await window.api.writeMySQLConfigJson(mysqlConfigPath, mysqlConfig)
    console.log('- handleDumpingSQLFiles writing mysqlConfig.sqlDataDumped = true to config json')

    console.log('- handleDumpingSQLFiles All SQL files imported successfully')
    return true
  } catch (error) {
    console.error(`- handleDumpingSQLFiles Error importing SQL files: ${error}`)
    return false
  }
}
