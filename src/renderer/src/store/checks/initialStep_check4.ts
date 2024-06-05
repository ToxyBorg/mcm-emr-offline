import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check3LogicAtom } from './initialStep_check3'
import {
  mysqlBinPathSegments,
  mysqlConfigPathSegments,
  mysqlDataDirSegments
} from '@shared/consts/sharedPaths'
import { handleMySQLServer } from '@renderer/handlers/handleMySQLServer'
import { textDisplayAtom } from '../shared/textDisplay'

// Define atoms for each check with the initial state
const initialStep_check4Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check4LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check4Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the third check hasn't PASSED, we return
    if (_get(initialStep_check3LogicAtom) != 'PASSED' && update != 'NOT_CHECKED') {
      console.log('- initialStep_check4Atom third check hasnt PASSED')
      set(initialStep_check4Atom, 'NOT_CHECKED')
      return
    }
    // This will return wether the localization of that file is
    // true or false
    const shouldWeResetTheServer = update == 'NOT_CHECKED'
    console.log('- initialStep_check4Atom shouldWeResetTheServer:', shouldWeResetTheServer)

    set(textDisplayAtom, `Entering handling MySQL server`)

    const isTheMySQLServerReady: boolean = await handleMySQLServer(
      mysqlConfigPathSegments,
      mysqlBinPathSegments,
      mysqlDataDirSegments,
      shouldWeResetTheServer
    )
    console.log('- initialStep_check4Atom isTheMySQLServerReady: ', isTheMySQLServerReady)

    set(textDisplayAtom, `Checking if the MySQL server is ready:  ${isTheMySQLServerReady}`)

    if (isTheMySQLServerReady) {
      set(initialStep_check4Atom, update)
    } else {
      set(initialStep_check4Atom, 'FAILED')
    }
  }
)

export { initialStep_check4LogicAtom }
