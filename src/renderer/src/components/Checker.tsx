import { Button, LoadingOverlay } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { checking_index } from '@renderer/store/checks/checking_index'
import { useSetAtom } from 'jotai'
import React, { useEffect } from 'react'
import { MCMredirect } from './MCMredirect'
import { Reset } from './Reset'

export const Checker: React.FC = () => {
  const triggerChecks = useSetAtom(checking_index)

  const [loading, setLoading] = useDisclosure(true)
  const [passed, setPassed] = useDisclosure(false)

  const handleChecker = async (): Promise<void> => {
    setLoading.open()
    console.log('- Checker loading:', loading)

    const hasTheInitializationPassed = await triggerChecks('PASSED')
    console.log('- Checker hasTheInitializationPassed:', hasTheInitializationPassed)
    if (hasTheInitializationPassed == 'PASSED') {
      setPassed.open()
    } else {
      setPassed.close()
    }
    setLoading.close()
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
      <Reset checksAreLoading={loading} />
      {!loading && (
        <Button onClick={handleChecker} disabled={loading}>
          Refresh
        </Button>
      )}
      <MCMredirect checksHavePassed={passed} />
    </>
  )
}
