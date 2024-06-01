import { atom, Getter, Setter } from 'jotai'
import { initialStep_check1LogicAtom } from './initialStep_check1'
import { CheckStatus } from '@shared/types/check_status'
import { initialStep_check2LogicAtom } from './initialStep_check2'

const initial_step_index = atom<null, [update: CheckStatus], Promise<CheckStatus>>(
  null, // getter (doesn't need to get anything)
  async (get: Getter, set: Setter, update: CheckStatus) => {
    // Perform check 1
    await set(initialStep_check1LogicAtom, update)

    if (get(initialStep_check1LogicAtom) !== update) {
      return 'FAILED'
    }
    // Perform check 2
    await set(initialStep_check2LogicAtom, update)
    if (get(initialStep_check2LogicAtom) !== update) {
      return 'FAILED'
    }

    return 'PASSED'
    // ... add more checks as needed
  }
)

export { initial_step_index }
