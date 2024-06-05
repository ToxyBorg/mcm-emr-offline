import {
  javaBinPathSegments,
  javaJarPathSegments,
  springBootConfigPathSegments
} from '@shared/consts/sharedPaths'
import { SpringBootConfig } from '@shared/types/springboot_config'

// Function to run a JAR file
export const handleSpringBootServer = async (): Promise<boolean> => {
  // getting the FULL path to the directory.
  // for example .../something/something/path/segments/in/pathSegmentsToZipDirectory/array
  await window.api.stopSpringBootServer()
  console.log('- handleSpringBootServer after stopSpringBootServer')

  const javaBinPath: string = await javaBinPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )
  console.log('- handleSpringBootServer javaBinPath:', javaBinPath)

  const javaExecutableBinaryPath = await window.api.joinPath(javaBinPath, 'java.exe')
  console.log('- handleSpringBootServer javaExecutableBinaryPath:', javaExecutableBinaryPath)

  const javaJarPath: string = await javaJarPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )
  console.log('- handleSpringBootServer javaJarPath:', javaJarPath)

  const command = `"${javaExecutableBinaryPath}" -jar "${javaJarPath}"`
  console.log('- handleSpringBootServer command:', command)

  // Execute the command with a timeout of 10 seconds
  await window.api.executeCommand(command, 10000)

  const springBootConfigPath: string = await springBootConfigPathSegments.reduce(
    async (acc, curr) => window.api.joinPath(await acc, curr),
    window.api.getCurrentDir()
  )

  console.log('- handleSpringBootServer springBootConfigPath:', springBootConfigPath)

  // Read the configuration file before the initialization just to make sure
  const springBootConfig: SpringBootConfig =
    await window.api.readSpringBootConfigJson(springBootConfigPath)
  console.log(
    '- handleSpringBootServer before starting the server, springBootConfig: ',
    springBootConfig
  )

  // Check if the server is up and running
  let isServerRunning = await window.api.isSpringBootServerRunning(
    springBootConfig.springboot_sever_info.host,
    Number(springBootConfig.springboot_sever_info.port)
  )
  console.log('- handleSpringBootServer isServerRunning:', isServerRunning)

  // Keep checking until the server is up
  while (!isServerRunning) {
    console.log('- handleSpringBootServer waiting for server to start...')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    isServerRunning = await window.api.isSpringBootServerRunning(
      springBootConfig.springboot_sever_info.host,
      Number(springBootConfig.springboot_sever_info.port)
    )
  }

  console.log('- handleSpringBootServer server is up and running isServerRunning:', isServerRunning)
  springBootConfig.springboot_sever_info.started = true
  await window.api.writeSpringBootConfigJson(springBootConfigPath, springBootConfig)
  console.log('- handleSpringBootServer writing started = true to config')

  return isServerRunning
}
