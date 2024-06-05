import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check4LogicAtom } from './initialStep_check4'
import { handleDumpingSQLFiles } from '@renderer/handlers/handleDumpingSQLFiles'
import { textDisplayAtom } from '../shared/textDisplay'

// Define atoms for each check with the initial state
const initialStep_check5Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check5LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check5Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the fourth check hasn't PASSED, we return
    if (_get(initialStep_check4LogicAtom) != 'PASSED' && update != 'NOT_CHECKED') {
      console.log('- initialStep_check5Atom fourth check hasnt PASSED')
      set(initialStep_check5Atom, 'NOT_CHECKED')
      return
    }

    // TODO: handle dumping the sql files
    set(textDisplayAtom, `Entering MySQL data dump step`)
    const haveTheSQLFilesBeenDumped = await handleDumpingSQLFiles()
    console.log(
      '- initialStep_check5LogicAtom haveTheSQLFilesBeenDumped:',
      haveTheSQLFilesBeenDumped
    )
    set(
      textDisplayAtom,
      `Checking if the MySQL data has been dumped:  ${haveTheSQLFilesBeenDumped}`
    )

    if (haveTheSQLFilesBeenDumped) {
      set(initialStep_check5Atom, update)
    } else {
      set(initialStep_check5Atom, 'FAILED')
    }
  }
)

export { initialStep_check5LogicAtom }
