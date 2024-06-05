import { Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { handleMCMOpener } from '@renderer/handlers/handleMCMOpener'

interface MCMredirectProps {
  checksHavePassed: boolean
}
export const MCMredirect = (props: MCMredirectProps): JSX.Element => {
  const [loading, setLoading] = useDisclosure(false)
  const shouldWeLaunchTheWebsite = async (): Promise<void> => {
    setLoading.open()
    await handleMCMOpener()
    setLoading.close()
  }
  return (
    <>
      <Button
        color="orange"
        onClick={shouldWeLaunchTheWebsite}
        loading={loading}
        disabled={!props.checksHavePassed}
      >
        MCM
      </Button>
    </>
  )
}
