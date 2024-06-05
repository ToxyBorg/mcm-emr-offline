import { handleCheckingStartup } from '@renderer/handlers/handleCheckingStartup'
import { atom, Getter, Setter } from 'jotai'
import { CheckStatus } from 'src/shared/types/check_status'
import { textDisplayAtom } from '../shared/textDisplay'

// Define atoms for each check with the second state
const secondStep_check1Atom = atom<CheckStatus>('NOT_CHECKED')

const secondStep_check1LogicAtom = atom<CheckStatus, [update: CheckStatus], void>(
  (get: Getter): CheckStatus => get(secondStep_check1Atom), // getter
  async (_get: Getter, set: Setter, update: CheckStatus): Promise<void> => {
    if (update == 'NOT_CHECKED') {
      set(secondStep_check1Atom, update)
    }

    // This will return wether both MySQL and SpringBoot servers are up and running
    const areBothServersUp: boolean = await handleCheckingStartup()

    set(textDisplayAtom, `Checking if both servers are up and running: ${areBothServersUp}`)

    if (areBothServersUp) {
      set(secondStep_check1Atom, 'PASSED')
      return
    } else {
      set(secondStep_check1Atom, 'FAILED')
      return
    }
  }
)

export { secondStep_check1LogicAtom }
