import { Text } from '@mantine/core'
import { textDisplayAtom } from '../store/shared/textDisplay'
import { useAtomValue } from 'jotai'

export const TextDisplay = (): JSX.Element => {
  const textToDisplay = useAtomValue(textDisplayAtom)

  return <Text c={'white'}>{textToDisplay}</Text>
}
