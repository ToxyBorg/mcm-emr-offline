import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check1LogicAtom } from './initialStep_check1'
import { handleCheckingBinaryFile } from '@renderer/handlers/handleCheckingBinaryFile'
import {
  binaries_to_check,
  mysqlConfigPathSegments,
  springBootConfigPathSegments
} from '@shared/consts/sharedPaths'
import { MySQLConfig, ProcessInfo } from '@shared/types/mysql_config'
import { SpringBootConfig } from '@shared/types/springboot_config'

// Define atoms for each check with the initial state
const initialStep_check2Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check2LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check2Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the first check hasn't PASSED, we return
    if (_get(initialStep_check1LogicAtom) != 'PASSED' && update != 'NOT_CHECKED') {
      console.log('- initialStep_check2LogicAtom first check hasnt PASSED ')
      set(initialStep_check2Atom, 'NOT_CHECKED')
      return
    }
    // We loop through every binary file that needs location confirmation
    const binariesHaveBeenChecked: boolean[] = []
    for (const binary_to_check of binaries_to_check) {
      console.log('- binary_to_check: ', binary_to_check)

      // This will return wether the localization of that file is
      // true or false
      const binaryFileCheckStatus: boolean = await handleCheckingBinaryFile(binary_to_check)
      console.log('- initialStep_check2LogicAtom binaryFileCheckStatus: ', binaryFileCheckStatus)
      if (binaryFileCheckStatus) {
        const mysqlConfigFilePath: string = await mysqlConfigPathSegments.reduce(
          async (acc, curr) => window.api.joinPath(await acc, curr),
          window.api.getCurrentDir()
        )
        console.log('- initialStep_check2LogicAtom mysqlConfigFilePath: ', mysqlConfigFilePath)

        const mysqlConfigReadFromFile: MySQLConfig =
          await window.api.readMySQLConfigJson(mysqlConfigFilePath)

        console.log(
          '- initialStep_check2LogicAtom mysqlConfigReadFromFile: ',
          mysqlConfigReadFromFile
        )

        const springbootConfigFilePath: string = await springBootConfigPathSegments.reduce(
          async (acc, curr) => window.api.joinPath(await acc, curr),
          window.api.getCurrentDir()
        )
        console.log(
          '- initialStep_check2LogicAtom springbootConfigFilePath: ',
          springbootConfigFilePath
        )

        const springbootConfigReadFromFile: SpringBootConfig =
          await window.api.readSpringBootConfigJson(springbootConfigFilePath)

        console.log(
          '- initialStep_check2LogicAtom springbootConfigReadFromFile: ',
          springbootConfigReadFromFile
        )

        for (const processKey in mysqlConfigReadFromFile.mysql_sever_info.processes) {
          if (processKey == binary_to_check.nameOfBinary.slice(0, -4)) {
            // Get the process info for the current process
            const processInfo: ProcessInfo =
              mysqlConfigReadFromFile.mysql_sever_info.processes[processKey]
            processInfo.binaryPathSegments = [
              ...binary_to_check.pathSegmentsToBinaryDirectory,
              binary_to_check.nameOfBinary
            ]
            await window.api.writeMySQLConfigJson(mysqlConfigFilePath, mysqlConfigReadFromFile)
          }
        }

        for (const processKey in springbootConfigReadFromFile.springboot_sever_info.processes) {
          if (processKey == binary_to_check.nameOfBinary.slice(0, -4)) {
            // Get the process info for the current process
            const processInfo: ProcessInfo =
              springbootConfigReadFromFile.springboot_sever_info.processes[processKey]
            processInfo.binaryPathSegments = [
              ...binary_to_check.pathSegmentsToBinaryDirectory,
              binary_to_check.nameOfBinary
            ]
            await window.api.writeSpringBootConfigJson(
              springbootConfigFilePath,
              springbootConfigReadFromFile
            )
          }
        }
      } else {
        alert(
          `An Error Occurred During The Initialization Step, Error with ${binary_to_check.nameOfBinary} at : ${binary_to_check.pathSegmentsToBinaryDirectory}`
        )
      }
      binariesHaveBeenChecked.push(binaryFileCheckStatus)
    }
    if (binariesHaveBeenChecked.includes(false)) {
      set(initialStep_check2Atom, 'FAILED')
      return
    }
    set(initialStep_check2Atom, update)
  }
)

export { initialStep_check2LogicAtom }
