import { Center, Flex, LoadingOverlay, Notification, Stack, Text } from '@mantine/core'
import { checking_index } from '@renderer/store/checks/checking_index'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Checker } from './Checker'
import { CopyRight } from './CopyRight'
import { MCMlogo } from './MCMlogo'
import { MCMredirect } from './MCMredirect'
import { MySQLStatus } from './MySQLStatus'
import { Reset } from './Reset'
import { SpringBootStatus } from './SpringBootStatus'
import { loadingStatusAtom } from '@renderer/store/shared/loadingStatus'
import { RxCrossCircled } from 'react-icons/rx'
import { RxCheckCircled } from 'react-icons/rx'
import { textDisplayAtom } from '../store/shared/textDisplay'
import { TextDisplay } from './TextDisplay'

export const Init = (): JSX.Element => {
  const [loading, setLoading] = useAtom(loadingStatusAtom)
  const setTextToDisplay = useSetAtom(textDisplayAtom)
  const [passed, setPassed] = useState<boolean | null>(null)

  const triggerChecks = useSetAtom(checking_index)
  const handleChecker = async (): Promise<void> => {
    setLoading(true)
    console.log('- triggerChecks loading:', loading)

    const hasTheInitializationPassed = await triggerChecks('PASSED')
    console.log('- triggerChecks hasTheInitializationPassed:', hasTheInitializationPassed)
    if (hasTheInitializationPassed == 'PASSED') {
      setPassed(true)
    } else {
      setPassed(false)
    }
    setTextToDisplay('')
    setLoading(false)
  }

  useEffect(() => {
    handleChecker()
    return (): void => {}
  }, [])

  return (
    <>
      {passed == false && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCrossCircled />}
          color="red"
          title="Bummer!"
          onClose={() => setPassed(null)}
        >
          Check Has Failed! Try Reseting
        </Notification>
      )}
      {passed == true && (
        <Notification
          pos={'fixed'}
          style={{ zIndex: 500, top: 0 }}
          icon={<RxCheckCircled />}
          color="teal"
          title="All good!"
          mt="md"
          onClose={() => setPassed(null)}
        >
          Check Went Well
        </Notification>
      )}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 5, backgroundOpacity: 0.7 }}
        loaderProps={{ color: 'blue', type: 'bars' }}
      />
      {loading && (
        <Center
          bg={'blue'}
          p={'lg'}
          pos={'fixed'}
          bottom={'30%'}
          left={'50%'}
          style={{
            transform: 'translateX(-50%)',
            zIndex: 2000,
            borderRadius: '2rem'
          }}
        >
          <TextDisplay />
        </Center>
      )}
      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="space-between"
        gap="lg"
        h={'100vh'}
        p={'lg'}
      >
        <Flex justify="space-between" wrap={'wrap-reverse'}>
          <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
            <Text size="xl" fw={'bold'} fs={'italic'}>
              Powered By
            </Text>
            <MySQLStatus />
            <SpringBootStatus />
          </Flex>
          <MCMlogo />
        </Flex>

        <Center>
          <MCMredirect />
        </Center>

        <Flex mih={50} gap="md" justify="space-between" align="center" direction="row" wrap="wrap">
          <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
            <Reset />
            <Checker />
          </Flex>
          <Center>
            <CopyRight />
          </Center>
        </Flex>
      </Stack>
    </>
  )
}
