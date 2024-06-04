import { defaultMysqlConfig, mysqlConfigPathSegments } from '@shared/consts/sharedPaths'
import { MySQLConfig, ProcessInfo } from '@shared/types/mysql_config'
import { exec } from 'child_process'
import * as fs_extra from 'fs-extra'
import { createConnection, Connection } from 'mysql2/promise'

import path from 'path'

export const stopMySQLServer = async (): Promise<void> => {
  try {
    const mysqlConfigPath: string = mysqlConfigPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )
    console.log('- stopMySQLServer mysqlConfigPath:', mysqlConfigPath)

    // Read the configuration file
    const mysqlConfig: MySQLConfig = await mainReadMySQLConfigJson(mysqlConfigPath)
    console.log('- stopMySQLServer mysqlConfig:', mysqlConfig)

    await mainKillMySQLProcesses(mysqlConfig, mysqlConfigPath)
    console.log('- stopMySQLServer after mainKillMySQLProcesses')

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

// export const mainExecuteCommand = (
//   command: string,
//   args: string[],
//   timeout?: number
// ): Promise<number> => {
//   return new Promise((resolve, reject) => {
//     const process = spawn(command, args)

//     process.stdout?.on('data', (data) => {
//       console.log(`- mainExecuteCommand stdout: ${data}`)
//     })

//     process.stderr?.on('data', (data) => {
//       console.error(`- mainExecuteCommand stderr: ${data}`)
//     })

//     process.on('exit', (code) => {
//       if (code === 0) {
//         resolve(process.pid!)
//       } else {
//         reject(new Error(`- mainExecuteCommand Command exited with code ${code}`))
//       }
//     })

//     process.on('error', (error) => {
//       console.error(`- mainExecuteCommand exec error: ${error.message}`)
//       reject(error)
//     })

//     if (timeout) {
//       setTimeout(() => {
//         process.kill()
//         resolve(new Error(`- mainExecuteCommand Command timed out after ${timeout} milliseconds`))
//       }, timeout)
//     }
//   })
// }
export const mainKillMySQLProcesses = async (
  mysqlConfig: MySQLConfig,
  mysqlConfigPath: string
): Promise<void> => {
  // Loop through each process in the config
  for (const processKey in mysqlConfig.mysql_sever_info.processes) {
    console.log('- mainKillMySQLProcesses processName:', processKey)

    // Get the process info for the current process
    const processInfo: ProcessInfo = mysqlConfig.mysql_sever_info.processes[processKey]
    console.log('- mainKillMySQLProcesses processInfo:', processInfo)

    const mysqlBinaryPath: string = processInfo.binaryPathSegments.reduce(
      (acc, curr) => mainJoinPath(acc, curr),
      mainGetCurrentDir()
    )
    console.log('- mainKillMySQLProcesses mysqlBinaryPath:', mysqlBinaryPath)

    for (const processName of processInfo.names) {
      // Check if the process with the given name is a checkIfMySQLProcessRunning process
      const checkIfMySQLProcessRunning: number[] | null = await isMySQLProcessRunning(
        processName,
        mysqlBinaryPath
      )
      console.log(
        `- mainKillMySQLProcesses checkIfMySQLProcessRunning: ${processName} => `,
        checkIfMySQLProcessRunning
      )

      // If it is a checkIfMySQLProcessRunning process
      if (checkIfMySQLProcessRunning != null) {
        for (const mysqlProcessPID of checkIfMySQLProcessRunning) {
          if (mysqlProcessPID > 0) {
            // Command to kill the process with the given PID
            const killCommand = `taskkill /F /PID ${mysqlProcessPID}`
            console.log('- mainKillMySQLProcesses killCommand : ', killCommand)

            // Execute the command
            exec(killCommand, (error, stdout, stderr) => {
              if (error) {
                console.error(`- mainKillMySQLProcesses Error killing process: ${error}`)
                return
              }
              if (stderr) {
                console.error(`- mainKillMySQLProcesses Error getting PID: ${stderr}`)
                return
              }

              console.log(`- mainKillMySQLProcesses Process killed successfully: ${stdout}`)
            })
          }
        }

        // console.log(`- mainKillMySQLProcesses ${processName} PID IS NOW `, processInfo.PID)
      }
    }
  }
  // Write the updated config back to the JSON file
  await mainWriteMySQLConfigJson(mysqlConfigPath, mysqlConfig)
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

export const mainExecuteCommand = (command: string, timeout?: number): Promise<void> => {
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
