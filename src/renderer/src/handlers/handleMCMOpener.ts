import { mysqlConfigPathSegments, springBootConfigPathSegments } from '@shared/consts/sharedPaths'
import { MySQLConfig } from '@shared/types/mysql_config'
import { SpringBootConfig } from '@shared/types/springboot_config'

export const handleMCMOpener = async (): Promise<boolean> => {
  // getting the FULL path to the directory.
  // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
  const mysqlConfigPath: string = await mysqlConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )
  console.log('- handleMCMOpener mysqlConfigPath:', mysqlConfigPath)

  // Read the mysql configuration file to see if the server is up
  const mysqlConfig: MySQLConfig = await window.api.readMySQLConfigJson(mysqlConfigPath)
  console.log(
    '- handleMCMOpener  mysqlConfig.mysql_sever_info.started: ',
    mysqlConfig.mysql_sever_info.started
  )

  const springBootConfigPath: string = await springBootConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleMCMOpener springBootConfigPath:', springBootConfigPath)

  // Read the configuration file to see if the server is up
  const springBootConfig: SpringBootConfig =
    await window.api.readSpringBootConfigJson(springBootConfigPath)
  console.log(
    '- handleMCMOpener springBootConfig.springboot_sever_info.started: ',
    springBootConfig.springboot_sever_info.started
  )

  if (
    mysqlConfig.mysql_sever_info.started == true &&
    springBootConfig.springboot_sever_info.started == true
  ) {
    const mcmURL =
      'http://' +
      springBootConfig.springboot_sever_info.host +
      ':' +
      springBootConfig.springboot_sever_info.port
    await window.api.openMcmEmrUrl(mcmURL)
    console.log(
      `- handleMCMOpener both servers are up. We can launch the window to MCM EMR port 
      ${springBootConfig.springboot_sever_info.port} of ${springBootConfig.springboot_sever_info.host}`
    )
    return true
  } else {
    alert('The servers are not running! Please retry or relaunch the application.')
    console.log(
      `- handleMCMOpener NOT both servers are up. We CANNOT launch the window to MCM EMR port 
      ${springBootConfig.springboot_sever_info.port} of ${springBootConfig.springboot_sever_info.host}`
    )
    return false
  }
}
