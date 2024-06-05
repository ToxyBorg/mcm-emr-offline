import { ActionIcon, Notification, Stack, Text } from '@mantine/core'
import { handleMCMOpener } from '@renderer/handlers/handleMCMOpener'
import { loadingStatusAtom } from '@renderer/store/shared/loadingStatus'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { IoOpenOutline } from 'react-icons/io5'
import { RxCrossCircled } from 'react-icons/rx'
import { RxCheckCircled } from 'react-icons/rx'

export const MCMredirect = (): JSX.Element => {
  const [loading, setLoading] = useAtom(loadingStatusAtom)
  const [launchingTheWebsiteStatus, setLaunchingTheWebsiteStatus] = useState<boolean | null>(null)

  const shouldWeLaunchTheWebsite = async (): Promise<void> => {
    setLoading(true)
    const areBothServersUpAndRunning = await handleMCMOpener()
    setLoading(false)

    if (areBothServersUpAndRunning == true) {
      setLaunchingTheWebsiteStatus(true)
    } else if (areBothServersUpAndRunning == false) {
      setLaunchingTheWebsiteStatus(false)
    }
  }
  return (
    <>
      {launchingTheWebsiteStatus == false && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCrossCircled />}
          color="red"
          title="Bummer!"
          onClose={() => setLaunchingTheWebsiteStatus(null)}
        >
          Launching The Website Has Failed! Try Checking If Both Servers Are Running
        </Notification>
      )}
      {launchingTheWebsiteStatus == true && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCheckCircled />}
          color="teal"
          title="All good!"
          mt="md"
          onClose={() => setLaunchingTheWebsiteStatus(null)}
        >
          MCM Website Open on http://localhost:2200
        </Notification>
      )}
      <ActionIcon
        loading={loading}
        disabled={loading}
        onClick={shouldWeLaunchTheWebsite}
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 287 }}
        size={'fit-content'}
        p={'lg'}
        radius={'lg'}
        aria-label="Open MCM EMR Webpage"
        style={{
          border: '2px solid grey',
          boxShadow: '5px 5px 2px grey'
        }}
      >
        <Stack>
          <IoOpenOutline style={{ width: '6rem', height: '100%' }} />
          <Text ta={'center'} fw={'bold'}>
            Open MCM
          </Text>
        </Stack>
      </ActionIcon>
    </>
  )
}
