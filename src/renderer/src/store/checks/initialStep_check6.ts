import { handleSpringBootServer } from '@renderer/handlers/handleSpringBootServer'
import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { initialStep_check5LogicAtom } from './initialStep_check5'

// Define atoms for each check with the initial state
const initialStep_check6Atom = atom<CheckStatus>('NOT_CHECKED')

const initialStep_check6LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(initialStep_check6Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    // If the fifth check hasn't PASSED, we return
    if (_get(initialStep_check5LogicAtom) != 'PASSED' && update != 'NOT_CHECKED') {
      console.log('- initialStep_check6Atom fourth check hasnt PASSED')
      set(initialStep_check6Atom, 'NOT_CHECKED')
      return
    }

    const hasTheSpringBootServerStarted = await handleSpringBootServer()
    console.log(
      '- initialStep_check6LogicAtom hasTheSpringBootServerStarted:',
      hasTheSpringBootServerStarted
    )

    if (hasTheSpringBootServerStarted) {
      set(initialStep_check6Atom, update)
    } else {
      set(initialStep_check6Atom, 'FAILED')
    }
  }
)

export { initialStep_check6LogicAtom }
