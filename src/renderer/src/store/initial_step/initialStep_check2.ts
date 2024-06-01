import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check1LogicAtom } from './initialStep_check1'
import { handleCheckingBinaryFile } from '@renderer/handlers/handleCheckingBinaryFile'
import { binaries_to_check } from '@shared/consts/sharedPaths'

// Define atoms for each check with the initial state
const initialStep_check2Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check2LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check2Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the first check hasn't PASSED, we return
    if (_get(initialStep_check1LogicAtom) != 'PASSED') {
      set(initialStep_check2Atom, 'NOT_CHECKED')
      return
    }
    // We loop through every binary file that needs location confirmation
    for (const binary_to_check of binaries_to_check) {
      // This will return wether the localization of that file is
      // true or false
      const binaryFileCheckStatus: boolean = handleCheckingBinaryFile(binary_to_check)

      if (binaryFileCheckStatus == false) {
        alert(
          `An Error Occurred During The Initialization Step, Error with ${binary_to_check.nameOfBinary} at : ${binary_to_check.pathSegmentsToBinaryDirectory}`
        )
        set(initialStep_check2Atom, 'FAILED')
        return
      }
    }

    set(initialStep_check2Atom, update)
  }
)

export { initialStep_check2LogicAtom }
