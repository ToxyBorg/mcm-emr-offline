import { Button, LoadingOverlay } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { initial_step_index } from '@renderer/store/initial_step/initial_step_index'
import { useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'

export const Checker: React.FC = () => {
  const triggerChecks = useSetAtom(initial_step_index)

  const [loading, setLoading] = useDisclosure(true)
  const [resetInitializer, setResetInitializer] = useState(false)

  const handleChecker = async (): Promise<void> => {
    setLoading.open()

    if (resetInitializer == true) {
      const hasTheInitializationPassed = await triggerChecks('NOT_CHECKED')

      if (hasTheInitializationPassed == 'PASSED') {
        setResetInitializer(false)
        setLoading.close()
      } else if (hasTheInitializationPassed == 'FAILED') {
        setResetInitializer(true)
        setLoading.close()
      }
    } else {
      const hasTheInitializationPassed = await triggerChecks('PASSED')
      if (hasTheInitializationPassed == 'PASSED') {
        setResetInitializer(false)
        setLoading.close()
      } else if (hasTheInitializationPassed == 'FAILED') {
        setResetInitializer(true)
        setLoading.close()
      }
    }
  }

  useEffect(() => {
    handleChecker()

    return (): void => {}
  }, [])

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      {!loading && resetInitializer && (
        <Button onClick={handleChecker} disabled={loading && !resetInitializer}>
          Failed INITIALIZATION! Click To Retry
        </Button>
      )}
      {!loading && !resetInitializer && (
        <Button onClick={handleChecker} disabled={loading && resetInitializer}>
          Start Checks
        </Button>
      )}
      <Button onClick={() => setResetInitializer(!resetInitializer)} color="red">
        DEVELOPER
      </Button>
    </>
  )
}
