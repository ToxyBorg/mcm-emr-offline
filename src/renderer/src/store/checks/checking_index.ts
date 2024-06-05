import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from '@shared/types/check_status'
import { initialStep_check1LogicAtom } from './initialStep_check1'
import { initialStep_check2LogicAtom } from './initialStep_check2'
import { initialStep_check3LogicAtom } from './initialStep_check3'
import { initialStep_check4LogicAtom } from './initialStep_check4'
import { initialStep_check5LogicAtom } from './initialStep_check5'
import { initialStep_check6LogicAtom } from './initialStep_check6'
import { secondStep_check1LogicAtom } from './secondStep_check'
// import { initialStep_check5LogicAtom } from './initialStep_check5'

export const checking_index = atom<null, [update: CheckStatus], Promise<CheckStatus>>(
  null, // getter (doesn't need to get anything)
  async (get: Getter, set: Setter, update: CheckStatus) => {
    // Perform initial step check 1
    await set(initialStep_check1LogicAtom, update)
    if (get(initialStep_check1LogicAtom) !== update) {
      console.log('- initialStep_check1LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform initial step check 2
    await set(initialStep_check2LogicAtom, update)
    if (get(initialStep_check2LogicAtom) !== update) {
      console.log('- initialStep_check2LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform initial step check 3
    await set(initialStep_check3LogicAtom, update)
    if (get(initialStep_check3LogicAtom) !== update) {
      console.log('- initialStep_check3LogicAtom FAILED')
      return 'FAILED'
    }
    // Perform initial step check 4
    await set(initialStep_check4LogicAtom, update)
    if (get(initialStep_check4LogicAtom) !== update) {
      console.log('- initialStep_check4LogicAtom FAILED')
      return 'FAILED'
    }

    // Perform initial step check 5
    await set(initialStep_check5LogicAtom, update)
    if (get(initialStep_check5LogicAtom) !== update) {
      console.log('- initialStep_check5LogicAtom FAILED')
      return 'FAILED'
    }

    // Perform initial step check 6
    await set(initialStep_check6LogicAtom, update)
    if (get(initialStep_check6LogicAtom) !== update) {
      console.log('- initialStep_check6LogicAtom FAILED')
      return 'FAILED'
    }

    // Perform second step check 1
    await set(secondStep_check1LogicAtom, update)
    if (get(secondStep_check1LogicAtom) !== update) {
      console.log('- secondStep_check1LogicAtom FAILED')
      return 'FAILED'
    }

    return 'PASSED'
    // ... add more checks as needed
  }
)
