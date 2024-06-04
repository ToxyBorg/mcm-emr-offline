import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from '@shared/types/check_status'
import { initialStep_check1LogicAtom } from './initialStep_check1'
import { initialStep_check2LogicAtom } from './initialStep_check2'
import { initialStep_check3LogicAtom } from './initialStep_check3'
import { initialStep_check4LogicAtom } from './initialStep_check4'

const initial_step_index = atom<null, [update: CheckStatus], Promise<CheckStatus>>(
  null, // getter (doesn't need to get anything)
  async (get: Getter, set: Setter, update: CheckStatus) => {
    // Perform check 1
    await set(initialStep_check1LogicAtom, update)
    if (get(initialStep_check1LogicAtom) !== update) {
      console.log('- initialStep_check1LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform check 2
    await set(initialStep_check2LogicAtom, update)
    if (get(initialStep_check2LogicAtom) !== update) {
      console.log('- initialStep_check2LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform check 3
    await set(initialStep_check3LogicAtom, update)
    if (get(initialStep_check3LogicAtom) !== update) {
      console.log('- initialStep_check3LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform check 4
    await set(initialStep_check4LogicAtom, update)
    if (get(initialStep_check4LogicAtom) !== update) {
      console.log('- initialStep_check4LogicAtom FAILED')
      return 'FAILED'
    }
    return 'PASSED'
    // ... add more checks as needed
  }
)

export { initial_step_index }
