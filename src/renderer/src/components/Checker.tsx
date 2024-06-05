import { ActionIcon, Flex, Notification, Text } from '@mantine/core'
import { checking_index } from '@renderer/store/checks/checking_index'
import { loadingStatusAtom } from '@renderer/store/shared/loadingStatus'
import { useAtom, useSetAtom } from 'jotai'
import { useState } from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { RxCrossCircled } from 'react-icons/rx'
import { RxCheckCircled } from 'react-icons/rx'

export const Checker = (): JSX.Element => {
  const [loading, setLoading] = useAtom(loadingStatusAtom)
  const [checkStatus, setCheckStatus] = useState<boolean | null>(null)

  const triggerChecks = useSetAtom(checking_index)
  const handleChecker = async (): Promise<void> => {
    setLoading(true)
    const hasTheInitializationPassed = await triggerChecks('PASSED')
    console.log('- Checker hasTheInitializationPassed:', hasTheInitializationPassed)
    setLoading(false)

    if (hasTheInitializationPassed == 'FAILED') {
      setCheckStatus(false)
    } else if (hasTheInitializationPassed == 'PASSED') {
      setCheckStatus(true)
    }
  }

  return (
    <>
      {checkStatus == false && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCrossCircled />}
          color="red"
          title="Bummer!"
          onClose={() => setCheckStatus(null)}
        >
          Check Has Failed! Try Reseting
        </Notification>
      )}
      {checkStatus == true && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCheckCircled />}
          color="teal"
          title="All good!"
          mt="md"
          onClose={() => setCheckStatus(null)}
        >
          Manual Check Went Well
        </Notification>
      )}
      <ActionIcon
        loading={loading}
        disabled={loading}
        variant="gradient"
        gradient={{ from: 'yellow', to: 'lime', deg: 95 }}
        size={'fit-content'}
        p={'sm'}
        radius={'lg'}
        aria-label="Open MCM EMR Webpage"
        style={{
          border: '2px solid grey',
          boxShadow: '5px 5px 2px grey'
        }}
        onClick={handleChecker}
      >
        <Flex justify={'space-between'} align={'center'} gap={'lg'}>
          <FaRegCircleCheck style={{ width: '2rem', height: '100%' }} />
          <Text ta={'center'} fw={'bold'}>
            Check MCM
          </Text>
        </Flex>
      </ActionIcon>
    </>
  )
}
