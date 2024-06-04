import { pathToMySQLDirectory } from '@shared/consts/sharedPaths'
import { MySQLConfig } from '@shared/types/mysql_config'

export const handleMySQLServer = async (
  mysqlConfigPathSegments: string[],
  mysqlBinPathSegments: string[],
  mysqlDataDirSegments: string[],
  reset?: boolean
): Promise<boolean> => {
  // getting the FULL path to the directory.
  // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
  const mysqlConfigPath: string = await mysqlConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleMySQLServer mysqlConfigPath:', mysqlConfigPath)

  const mysqlBinPath: string = await mysqlBinPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleMySQLServer mysqlBinPath:', mysqlBinPath)

  const mysqlDataDir: string = await mysqlDataDirSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleMySQLServer mysqlDataDir:', mysqlDataDir)

  const checkIfDataDirIsEmpty = await window.api.checkDirIsEmpty(mysqlDataDir)

  console.log('- handleMySQLServer checkIfDataDirIsEmpty:', checkIfDataDirIsEmpty)

  await window.api.stopMySQLServer()

  console.log('- handleMySQLServer after stopMySQLServer')

  // Read the configuration file before the initialization just to make sure
  const mysqlConfig: MySQLConfig = await window.api.readMySQLConfigJson(mysqlConfigPath)

  console.log(
    '- handleMySQLServer after stopMySQLServer mysqlConfig.Initialized: ',
    mysqlConfig.Initialized
  )

  try {
    const fullPathMysqldBinary = await window.api.joinPath(mysqlBinPath, 'mysqld.exe')
    console.log('- handleMySQLServer fullPathMysqldBinary: ', fullPathMysqldBinary)

    const fullPathMysqladminBinary = await window.api.joinPath(mysqlBinPath, 'mysqladmin.exe')
    console.log('- handleMySQLServer fullPathMysqladminBinary: ', fullPathMysqladminBinary)

    if (checkIfDataDirIsEmpty || !mysqlConfig.Initialized || reset) {
      console.log('- handleMySQLServer checkIfDataDirIsEmpty: ', checkIfDataDirIsEmpty)
      console.log('- handleMySQLServer mysqlConfig.Initialized: ', mysqlConfig.Initialized)
      console.log('- handleMySQLServer reset: ', reset)

      console.log('- handleMySQLServer inside the reset/initialization')
      mysqlConfig.Initialized = false
      console.log('- handleMySQLServer mysqlConfig.Initialized = false to config')

      await window.api.writeMySQLConfigJson(mysqlConfigPath, mysqlConfig)

      if (!checkIfDataDirIsEmpty) {
        console.log('- handleMySQLServer !checkIfDataDirIsEmpty')

        const fullDirPathWithoutExtractedFolderName: string = await pathToMySQLDirectory.reduce(
          async (acc, curr) => window.api.joinPath(await acc, curr),
          window.api.getCurrentDir()
        )
        const fullPathToBackupDataDirectory = await window.api.joinPath(
          fullDirPathWithoutExtractedFolderName,
          'backup'
        )
        console.log(
          '- handleMySQLServer fullPathToBackupDataDirectory: ',
          fullPathToBackupDataDirectory
        )

        const copyingToBackup = await window.api.copyDataToBackUp(
          mysqlDataDir,
          fullPathToBackupDataDirectory
        )

        console.log('- handleMySQLServer copyingToBackup: ', copyingToBackup)

        if (copyingToBackup == 'FAILED_COPYING') {
          console.error('- handleMySQLServer !checkIfDataDirIsEmpty FAILED_COPYING')
        } else {
          const removingMySQLDataDirectory = await window.api.removingDirectory(mysqlDataDir)
          console.log(
            '- handleMySQLServer removingMySQLDataDirectory: ',
            removingMySQLDataDirectory
          )
        }
      }

      // Initialize the server
      await window.api.executeCommand(
        `"${fullPathMysqldBinary}" --initialize-insecure --datadir="${mysqlDataDir}"`
      )

      const afterInitializationConfig: MySQLConfig =
        await window.api.readMySQLConfigJson(mysqlConfigPath)
      console.log(
        '- handleMySQLServer getting updated config from json:',
        afterInitializationConfig
      )
      afterInitializationConfig.password = null
      await window.api.writeMySQLConfigJson(mysqlConfigPath, afterInitializationConfig)
      console.log(
        '- handleMySQLServer writing afterInitializationConfig.password = null to config json'
      )

      // mysqlConfig.mysql_sever_info.processes.mysqld.PID = mysqldPID
      console.log('- handleMySQLServer mysql data initialized: ')
    }

    console.log('- handleMySQLServer starting mysql server')
    // Read the configuration file before starting the server just to make sure
    const afterStartingTheServerConfig: MySQLConfig =
      await window.api.readMySQLConfigJson(mysqlConfigPath)
    console.log(
      '- handleMySQLServer getting updated config from json:',
      afterStartingTheServerConfig
    )
    // Start the server
    await window.api.executeCommand(`"${fullPathMysqldBinary}" --datadir="${mysqlDataDir}"`, 10000)

    console.log('- handleMySQLServer AFTER starting mysql server')

    let checkingIfTheServerIsRunning = false
    // Wait for the server to start
    while (!checkingIfTheServerIsRunning) {
      console.log(
        '- handleMySQLServer Checking if the mysql server is up and running...:',
        checkingIfTheServerIsRunning
      )
      checkingIfTheServerIsRunning = await window.api.isMySQLServerRunning(
        afterStartingTheServerConfig.mysql_sever_info.host,
        Number(afterStartingTheServerConfig.mysql_sever_info.port),
        afterStartingTheServerConfig.user,
        afterStartingTheServerConfig.password
      )

      console.log(
        '- handleMySQLServer checkingIfTheServerIsRunning update:',
        checkingIfTheServerIsRunning
      )
      if (checkingIfTheServerIsRunning) {
        break
      }
      // Wait for a bit before checking again
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    console.log('- handleMySQLServer After checking the server has successfully started')

    if (!afterStartingTheServerConfig.Initialized || reset) {
      console.log('- handleMySQLServer Before modifying the root password')
      // Set the root password
      await window.api.executeCommand(
        `"${fullPathMysqladminBinary}" -u ${afterStartingTheServerConfig.user} password root`
      )
      afterStartingTheServerConfig.password = 'root'
      await window.api.writeMySQLConfigJson(mysqlConfigPath, afterStartingTheServerConfig)
      console.log(
        '- handleMySQLServer writing afterStartingTheServerConfig.password = root to config json'
      )
      // mysqlConfig.mysql_sever_info.processes.mysqladmin.PID = mysqladminPID
      console.log('- handleMySQLServer Before modifying the root password')
    }

    // Update the configuration file
    const afterHandleMySQLServerIsDoneConfig: MySQLConfig =
      await window.api.readMySQLConfigJson(mysqlConfigPath)
    console.log(
      '- handleMySQLServer afterHandleMySQLServerIsDoneConfig getting updated config from json:',
      afterHandleMySQLServerIsDoneConfig
    )
    afterHandleMySQLServerIsDoneConfig.Initialized = true
    await window.api.writeMySQLConfigJson(mysqlConfigPath, afterHandleMySQLServerIsDoneConfig)
    console.log(
      '- handleMySQLServer writing afterHandleMySQLServerIsDoneConfig.Initialized = true to config json'
    )

    console.log('- handleMySQLServer MySQL server initialized successfully')
    return true
  } catch (error) {
    console.error(`- handleMySQLServer Error initializing MySQL server: ${error}`)
    return false
  }
}
