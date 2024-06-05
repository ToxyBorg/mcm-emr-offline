import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check2LogicAtom } from './initialStep_check2'
import { handleCheckingMySQLDataDirectory } from '@renderer/handlers/handleCheckingMySQLDataDirectory'
import { mysqlDataDirSegments } from '@shared/consts/sharedPaths'
import { handleCreatingMySQLDataDirectory } from '@renderer/handlers/handleCreatingMySQLDataDirectory'
import { textDisplayAtom } from '../shared/textDisplay'

// Define atoms for each check with the initial state
const initialStep_check3Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check3LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check3Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the second check hasn't PASSED, we return
    if (_get(initialStep_check2LogicAtom) != 'PASSED' && update != 'NOT_CHECKED') {
      console.log('- initialStep_check3LogicAtom second check hasnt PASSED ')
      set(initialStep_check3Atom, 'NOT_CHECKED')
      return
    }
    // This will return wether the localization of that file is
    // true or false
    const mysqlDataDirectoryCheckStatus: boolean =
      await handleCheckingMySQLDataDirectory(mysqlDataDirSegments)
    console.log(
      '- initialStep_check3LogicAtom mysqlDataDirectoryCheckStatus: ',
      mysqlDataDirectoryCheckStatus
    )
    set(
      textDisplayAtom,
      `Checking the MySQL data directory if exists:  ${mysqlDataDirectoryCheckStatus}`
    )

    if (mysqlDataDirectoryCheckStatus == false) {
      if ((await handleCreatingMySQLDataDirectory(mysqlDataDirSegments)) == false) {
        alert(
          `An Error Occurred During The Initialization Step, Error with data directory at : ${mysqlDataDirSegments}`
        )
        set(initialStep_check3Atom, 'FAILED')
        return
      }
    }

    set(initialStep_check3Atom, update)
  }
)

export { initialStep_check3LogicAtom }
