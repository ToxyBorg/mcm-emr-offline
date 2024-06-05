import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { checking_index } from '@renderer/store/checks/checking_index'
import { useSetAtom } from 'jotai'
interface ResetProps {
  checksAreLoading: boolean
}
export const Reset = (props: ResetProps): JSX.Element => {
  const triggerChecks = useSetAtom(checking_index)

  const [reset, setReset] = useDisclosure(false)

  const handleChecker = async (): Promise<void> => {
    setReset.open()
    console.log('- Checker reset:', reset)

    const hasTheInitializationPassed = await triggerChecks('NOT_CHECKED')
    console.log('- Checker hasTheInitializationPassed:', hasTheInitializationPassed)
    setReset.close()
  }
  return (
    <Button
      color="orange"
      onClick={handleChecker}
      loading={reset}
      disabled={props.checksAreLoading}
    >
      Reset
    </Button>
  )
}
