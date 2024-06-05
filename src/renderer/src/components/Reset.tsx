import { ActionIcon, Flex, Notification, Text } from '@mantine/core'
import { checking_index } from '@renderer/store/checks/checking_index'
import { loadingStatusAtom } from '@renderer/store/shared/loadingStatus'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { GrPowerReset } from 'react-icons/gr'
import { RxCrossCircled } from 'react-icons/rx'
import { RxCheckCircled } from 'react-icons/rx'

export const Reset = (): JSX.Element => {
  const [loading, setLoading] = useAtom(loadingStatusAtom)
  const [resetStatus, setResetStatus] = useState<boolean | null>(null)

  const triggerChecks = useSetAtom(checking_index)
  const handleChecker = async (): Promise<void> => {
    setLoading(true)
    const hasTheInitializationPassed = await triggerChecks('NOT_CHECKED')
    console.log('- Reset hasTheInitializationPassed:', hasTheInitializationPassed)
    setLoading(false)

    if (hasTheInitializationPassed == 'FAILED') {
      setResetStatus(false)
    } else if (hasTheInitializationPassed == 'PASSED') {
      setResetStatus(true)
    }
  }
  return (
    <>
      {resetStatus == false && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCrossCircled />}
          color="red"
          title="Bummer!"
          onClose={() => setResetStatus(null)}
        >
          Reset Has Failed
        </Notification>
      )}
      {resetStatus == true && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCheckCircled />}
          color="teal"
          title="All good!"
          mt="md"
          onClose={() => setResetStatus(null)}
        >
          Reset Went Well
        </Notification>
      )}
      <ActionIcon
        disabled={loading}
        loading={loading}
        onClick={handleChecker}
        variant="gradient"
        gradient={{ from: 'red', to: 'grape', deg: 95 }}
        size={'fit-content'}
        p={'sm'}
        radius={'lg'}
        aria-label="Open MCM EMR Webpage"
        style={{
          border: '2px solid grey',
          boxShadow: '5px 5px 2px grey'
        }}
      >
        <Flex justify={'space-between'} align={'center'} gap={'lg'}>
          <GrPowerReset style={{ width: '2rem', height: '100%' }} />
          <Text ta={'center'} fw={'bold'}>
            Reset MCM
          </Text>
        </Flex>
      </ActionIcon>
    </>
  )
}
