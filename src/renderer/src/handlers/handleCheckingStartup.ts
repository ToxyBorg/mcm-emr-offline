import { mysqlConfigPathSegments, springBootConfigPathSegments } from '@shared/consts/sharedPaths'
import { MySQLConfig } from '@shared/types/mysql_config'
import { SpringBootConfig } from '@shared/types/springboot_config'

export const handleCheckingStartup = async (): Promise<boolean> => {
  // getting the FULL path to the directory.
  // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
  const mysqlConfigPath: string = await mysqlConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )
  console.log('- handleCheckingStartup mysqlConfigPath:', mysqlConfigPath)

  // Read the mysql configuration file to see if the server is up
  const mysqlConfig: MySQLConfig = await window.api.readMySQLConfigJson(mysqlConfigPath)
  console.log(
    '- handleCheckingStartup  mysqlConfig.mysql_sever_info.started: ',
    mysqlConfig.mysql_sever_info.started
  )

  const springBootConfigPath: string = await springBootConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleCheckingStartup springBootConfigPath:', springBootConfigPath)

  // Read the configuration file to see if the server is up
  const springBootConfig: SpringBootConfig =
    await window.api.readSpringBootConfigJson(springBootConfigPath)
  console.log(
    '- handleSpringBootServer springBootConfig.springboot_sever_info.started: ',
    springBootConfig.springboot_sever_info.started
  )

  const inIsMySQLServerRunning = await window.api.isMySQLServerRunning(
    mysqlConfig.mysql_sever_info.host,
    mysqlConfig.mysql_sever_info.port,
    mysqlConfig.user,
    mysqlConfig.password
  )
  console.log('- handleSpringBootServer inIsMySQLServerRunning: ', inIsMySQLServerRunning)

  const isSpringBootServerRunning = await window.api.isSpringBootServerRunning(
    springBootConfig.springboot_sever_info.host,
    springBootConfig.springboot_sever_info.port
  )
  console.log('- handleSpringBootServer isSpringBootServerRunning: ', isSpringBootServerRunning)

  if (inIsMySQLServerRunning == true && isSpringBootServerRunning == true) {
    console.log(
      `- handleSpringBootServer both servers are up. We can launch the window to MCM EMR port 
      ${springBootConfig.springboot_sever_info.port} of ${springBootConfig.springboot_sever_info.host}`
    )
    return true
  } else {
    console.log(
      `- handleSpringBootServer NOT both servers are up. We CANNOT launch the window to MCM EMR port 
      ${springBootConfig.springboot_sever_info.port} of ${springBootConfig.springboot_sever_info.host}`
    )
    return false
  }
}
