import {
  defaultMysqlConfig,
  defaultSpringBootConfig,
  mysqlConfigPathSegments,
  springBootConfigPathSegments
} from '@shared/consts/sharedPaths'
import { MySQLConfig, ProcessInfo } from '@shared/types/mysql_config'
import { SpringBootConfig } from '@shared/types/springboot_config'
import { exec } from 'child_process'
import * as fs_extra from 'fs-extra'
import { createConnection, Connection } from 'mysql2/promise'
import http from 'http'
import path from 'path'

export const mainStopMySQLServer = async (): Promise<void> => {
  try {
    const mysqlConfigPath: string = mysqlConfigPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )
    console.log('- stopMySQLServer mysqlConfigPath:', mysqlConfigPath)

    // Read the configuration file
    const mysqlConfig: MySQLConfig = await mainReadMySQLConfigJson(mysqlConfigPath)
    console.log('- stopMySQLServer mysqlConfig:', mysqlConfig)

    await killMySQLProcesses(mysqlConfig, mysqlConfigPath)

    mysqlConfig.mysql_sever_info.started = false
    await mainWriteMySQLConfigJson(mysqlConfigPath, mysqlConfig)
    console.log('- mainStopMySQLServer writing started = false to config')

    console.log('- stopMySQLServer MySQL server stopped successfully')
  } catch (error: unknown) {
    console.error(`- stopMySQLServer Error stopping MySQL server: ${error}`)
    if (error instanceof Error) {
      if (error.message.includes('unable to connect')) {
        console.log('- stopMySQLServer The MySQL server is not running.')
      }
    }
  }
}

export const mainStopSpringBootServer = async (): Promise<void> => {
  try {
    const springBootConfigPath: string = springBootConfigPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )

    console.log('- stopSpringBootServer springBootConfigPath:', springBootConfigPath)

    // Read the configuration file
    const springBootConfig: SpringBootConfig =
      await mainReadSpringBootConfigJson(springBootConfigPath)
    console.log(
      '- stopSpringBootServer before stopping the server, springBootConfig: ',
      springBootConfig
    )

    await killJavaProcesses(springBootConfig, springBootConfigPath)

    springBootConfig.springboot_sever_info.started = false
    await mainWriteSpringBootConfigJson(springBootConfigPath, springBootConfig)
    console.log('- stopSpringBootServer writing started = false to config')

    console.log('- mainStopSpringBootServer SpringBoot server stopped successfully')
  } catch (error: unknown) {
    console.error(`- mainStopSpringBootServer Error stopping SpringBoot server: ${error}`)
    if (error instanceof Error) {
      if (error.message.includes('unable to connect')) {
        console.log('- mainStopSpringBootServer The SpringBoot server is not running.')
      }
    }
  }
}

export const mainGetCurrentDir = (): string => process.cwd()
export const mainJoinPath = (...segments: string[]): string => path.join(...segments)

export const mainReadMySQLConfigJson = async (fullPath: string): Promise<MySQLConfig> => {
  return await fs_extra
    .readJson(fullPath)
    .then((config: MySQLConfig): MySQLConfig => {
      console.log(
        `- mainReadMySQLConfigJson Successfully Read MySQL Configuration: Initialized = ${config.Initialized}`
      )
      return config
    })
    .catch((error) => {
      console.error(`- mainReadMySQLConfigJson Error Reading The Directory At ${fullPath}`, error)
      return defaultMysqlConfig
    })
}
export const mainReadSpringBootConfigJson = async (fullPath: string): Promise<SpringBootConfig> => {
  return await fs_extra
    .readJson(fullPath)
    .then((config: SpringBootConfig): SpringBootConfig => {
      console.log(
        `- mainReadSpringBootConfigJson Successfully Read SpringBoot Configuration: ${config}`
      )
      return config
    })
    .catch((error) => {
      console.error(
        `- mainReadSpringBootConfigJson Error Reading The Directory At ${fullPath}`,
        error
      )
      return defaultSpringBootConfig
    })
}
export const mainWriteMySQLConfigJson = async (
  fullPath: string,
  config: MySQLConfig
): Promise<void> => {
  return await fs_extra
    .writeJson(fullPath, config)
    .then(() => {
      console.log(
        `- mainWriteMySQLConfigJson Successfully Written MySQL Configuration: Initialized = ${config.Initialized}`
      )
    })
    .catch((error) => {
      console.error(
        `- mainWriteMySQLConfigJson Error Writing To The Directory At ${fullPath}`,
        error
      )
    })
}
export const mainWriteSpringBootConfigJson = async (
  fullPath: string,
  config: SpringBootConfig
): Promise<void> => {
  return await fs_extra
    .writeJson(fullPath, config)
    .then(() => {
      console.log(
        `- mainWriteSpringBootConfigJson Successfully Written SpringBoot Configuration: ${config}`
      )
    })
    .catch((error) => {
      console.error(
        `- mainWriteSpringBootConfigJson Error Writing To The Directory At ${fullPath}`,
        error
      )
    })
}

export const mainIsMySQLServerRunning = async (
  host: string,
  port: number,
  user: string,
  password: string | null
): Promise<boolean> => {
  console.log('- mainIsMySQLServerRunning host:', host, typeof host)
  console.log('- mainIsMySQLServerRunning port:', port, typeof port)
  console.log('- mainIsMySQLServerRunning user:', user, typeof user)
  console.log('- mainIsMySQLServerRunning password:', password, typeof password)

  try {
    // Create a connection object with the MySQL server
    const connection: Connection = await createConnection({
      host: host,
      port: Number(port),
      user: user,
      password: password != null && password != 'null' ? password : undefined
    })

    // If the connection is successful, the MySQL server is running
    console.log(`- mainIsMySQLServerRunning MySQL server is running with password: ${password}`)
    await connection.end() // Close the connection
    return true
  } catch (error) {
    // If the password didnt work, the MySQL server is not running
    console.log(`- mainIsMySQLServerRunning MySQL server is not running with password: ${password}`)
    return false
  }
}
export const mainIsSpringBootServerRunning = async (
  host: string,
  port: number
): Promise<boolean> => {
  console.log('- mainIsMySQLServerRunning host:', host, typeof host)
  console.log('- mainIsMySQLServerRunning port:', port, typeof port)
  try {
    return await new Promise((resolve) => {
      http
        .get({ host, port: Number(port) }, (res) => {
          console.log(
            '- mainIsSpringBootServerRunning res.statusCode === 200: ',
            res.statusCode === 200
          )
          resolve(res.statusCode === 200)
        })
        .on('error', (error) => {
          console.log('- mainIsSpringBootServerRunning error:', error)
          resolve(false)
        })
    })
  } catch (error) {
    // If the port/host combination didnt work, the SpringBoot server is not running
    console.log(
      `- mainIsSpringBootServerRunning SpringBoot server is not running on port ${port} of ${host}`
    )
    return false
  }
}

const killMySQLProcesses = async (
  mysqlConfig: MySQLConfig,
  mysqlConfigPath: string
): Promise<void> => {
  // Loop through each process in the config
  for (const processKey in mysqlConfig.mysql_sever_info.processes) {
    console.log('- killMySQLProcesses processName:', processKey)

    // Get the process info for the current process
    const processInfo: ProcessInfo = mysqlConfig.mysql_sever_info.processes[processKey]
    console.log('- killMySQLProcesses processInfo:', processInfo)

    const mysqlBinaryPath: string = processInfo.binaryPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )
    console.log('- killMySQLProcesses mysqlBinaryPath:', mysqlBinaryPath)

    for (const processName of processInfo.names) {
      // Check if the process with the given name is a checkIfMySQLProcessRunning process
      const checkIfMySQLProcessRunning: number[] | null = await isMySQLProcessRunning(
        processName,
        mysqlBinaryPath
      )
      console.log(
        `- killMySQLProcesses checkIfMySQLProcessRunning: ${processName} => `,
        checkIfMySQLProcessRunning
      )

      // If it is a checkIfMySQLProcessRunning process
      if (checkIfMySQLProcessRunning != null) {
        for (const mysqlProcessPID of checkIfMySQLProcessRunning) {
          if (mysqlProcessPID > 0) {
            // Command to kill the process with the given PID
            const killCommand = `taskkill /F /PID ${mysqlProcessPID}`
            console.log('- killMySQLProcesses killCommand : ', killCommand)

            // Execute the command
            exec(killCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(`- killMySQLProcesses Error killing process: ${error}`)
                return
              }
              if (stderr) {
                console.error(`- killMySQLProcesses Error getting PID: ${stderr}`)
                return
              }

              console.log(`- killMySQLProcesses Process killed successfully: ${stdout}`)
            })
          }
        }

        // console.log(`- killMySQLProcesses ${processName} PID IS NOW `, processInfo.PID)
      }
    }
  }
  // Write the updated config back to the JSON file
  await mainWriteMySQLConfigJson(mysqlConfigPath, mysqlConfig)
}

const killJavaProcesses = async (
  springBootConfig: SpringBootConfig,
  springBootConfigPath: string
): Promise<void> => {
  // Loop through each process in the config
  for (const processKey in springBootConfig.springboot_sever_info.processes) {
    console.log('- KillJavaProcesses processName:', processKey)

    // Get the process info for the current process
    const processInfo: ProcessInfo = springBootConfig.springboot_sever_info.processes[processKey]
    console.log('- KillJavaProcesses processInfo:', processInfo)

    const javaBinaryPath: string = processInfo.binaryPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )
    console.log('- killJavaProcesses javaBinaryPath:', javaBinaryPath)

    for (const processName of processInfo.names) {
      // Check if the process with the given name is a checkIJavaProcessRunning process
      const checkIJavaProcessRunning: number[] | null = await isJavaProcessRunning(
        processName,
        javaBinaryPath
      )
      console.log(
        `- KillJavaProcesses checkIJavaProcessRunning: ${processName} => `,
        checkIJavaProcessRunning
      )

      // If it is a checkIJavaProcessRunning process
      if (checkIJavaProcessRunning != null) {
        for (const javaProcessPID of checkIJavaProcessRunning) {
          if (javaProcessPID > 0) {
            // Command to kill the process with the given PID
            const killCommand = `taskkill /F /PID ${javaProcessPID}`
            console.log('- KillJavaProcesses killCommand : ', killCommand)

            // Execute the command
            exec(killCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(`- KillJavaProcesses Error killing process: ${error}`)
                return
              }
              if (stderr) {
                console.error(`- KillJavaProcesses Error getting PID: ${stderr}`)
                return
              }

              console.log(`- KillJavaProcesses Process killed successfully: ${stdout}`)
            })
          }
        }
      }
    }
  }
  // Write the updated config back to the JSON file
  await mainWriteSpringBootConfigJson(springBootConfigPath, springBootConfig)
}
const isMySQLProcessRunning = async (
  processName: string,
  mysqlBinaryPath: string
): Promise<number[] | null> => {
  // Return a new Promise that resolves with a boolean indicating whether the process is a MySQL process
  return new Promise((resolve) => {
    // Double the backslashes in the executable path
    const doubleSlashedMysqlBinaryPath = mysqlBinaryPath.replace(/\\/g, '\\\\')

    // Execute the wmic command to get the executable path of the process with the given name
    exec(
      `wmic process where "name='${processName}' and ExecutablePath='${doubleSlashedMysqlBinaryPath}'" get ProcessId`,
      (error, stdout, stderr) => {
        // If there's an error executing the command, log the error and reject the Promise
        if (error) {
          console.error(`- isMySQLProcessRunning exec error: ${error.message}`)
          resolve(null)
        }
        // If there's stderr output, log it and reject the Promise
        else if (stderr) {
          console.error(`- isMySQLProcessRunning stderr: ${stderr}`)
          resolve(null)
        }
        // If there's stdout output, process it
        else {
          // Extract the PIDs from the output
          const lines = stdout.split('\n').slice(1)

          if (lines.length <= 1) {
            console.log('- isMySQLProcessRunning output array is EMPTY: resolve null')
            resolve(null)
          } else {
            const pids = lines
              .map((line) => line.trim())
              .filter((pid) => !isNaN(Number(pid)))
              .map(Number)
            console.log('- isMySQLProcessRunning stdout:', stdout)
            console.log('- isMySQLProcessRunning pids:', pids)

            resolve(pids)
          }
        }
      }
    )
  })
}
const isJavaProcessRunning = async (
  processName: string,
  javaBinaryPath: string
): Promise<number[] | null> => {
  // Return a new Promise that resolves with a boolean indicating whether the process is a MySQL process
  return new Promise((resolve) => {
    // Double the backslashes in the executable path
    const doubleSlashedJavaBinaryPath = javaBinaryPath.replace(/\\/g, '\\\\')

    // Execute the wmic command to get the executable path of the process with the given name
    exec(
      `wmic process where "name='${processName}' and ExecutablePath='${doubleSlashedJavaBinaryPath}'" get ProcessId`,
      (error, stdout, stderr) => {
        // If there's an error executing the command, log the error and reject the Promise
        if (error) {
          console.error(`- isJavaProcessRunning exec error: ${error.message}`)
          resolve(null)
        }
        // If there's stderr output, log it and reject the Promise
        else if (stderr) {
          console.error(`- isJavaProcessRunning stderr: ${stderr}`)
          resolve(null)
        }
        // If there's stdout output, process it
        else {
          // Extract the PIDs from the output
          const lines = stdout.split('\n').slice(1)

          if (lines.length <= 1) {
            console.log('- isJavaProcessRunning output array is EMPTY: resolve null')
            resolve(null)
          } else {
            const pids = lines
              .map((line) => line.trim())
              .filter((pid) => !isNaN(Number(pid)))
              .map(Number)
            console.log('- isJavaProcessRunning stdout:', stdout)
            console.log('- isJavaProcessRunning pids:', pids)

            resolve(pids)
          }
        }
      }
    )
  })
}

export const mainExecuteCommand = async (command: string, timeout?: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    const process = exec(command)

    process.stdout?.on('data', (data) => {
      console.log(`- mainExecuteCommand stdout: ${data}`)
    })

    process.stderr?.on('data', (data) => {
      console.error(`- mainExecuteCommand stderr: ${data}`)
    })

    process.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        if (timeout) {
          console.error(`- mainExecuteCommand Command exited with code ${code}`)
          resolve()
        } else {
          reject(new Error(`- mainExecuteCommand Command exited with code ${code}`))
        }
      }
    })

    process.on('error', (error) => {
      console.error(`- mainExecuteCommand exec error: ${error.message}`)
      reject(error)
    })

    if (timeout) {
      setTimeout(() => {
        // process.kill()
        console.log(`- mainExecuteCommand Command timed out after ${timeout} milliseconds`)
        resolve()
      }, timeout)
    }
  })
}

// Function to import all SQL files in a directory
export const mainImportSqlFilesFromDirectory = async (
  // connection: Connection,
  mysqlPath: string,
  directoryPath: string,
  user: string,
  password: string
): Promise<void> => {
  // Get the list of folders in the directory
  const folders = fs_extra.readdirSync(directoryPath)
  console.log('- importSqlFilesFromDirectory folders:', folders)

  // Loop over each file/directory
  console.log('- importSqlFilesFromDirectory for (const folder of folders)')

  for (const folder of folders) {
    // Get the full path of the file/directory
    const folderPath = mainJoinPath(directoryPath, folder)
    console.log('- importSqlFilesFromDirectory folderPath:', folderPath)

    // Check if the path is a directory
    if (fs_extra.statSync(folderPath).isDirectory()) {
      console.log('- importSqlFilesFromDirectory folderPath is a directory')
      // If it's a directory, recursively import all SQL files in the directory
      await mainImportSqlFilesFromDirectory(mysqlPath, folderPath, user, password)
    } else if (folderPath.endsWith('.sql')) {
      console.log('- importSqlFilesFromDirectory folderPath is a file')
      // Command to import the SQL file using the MySQL binary
      const command = `"${mysqlPath}" -u ${user} -p${password} < "${folderPath}"`
      // If it's a SQL file, import the SQL file
      await mainExecuteCommand(command)
    }
  }
}
