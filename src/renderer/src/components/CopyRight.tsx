import { Text } from '@mantine/core'

export const CopyRight = (): JSX.Element => {
  const year = new Date().getFullYear()

  return (
    <Text ta={'center'} fw={'bold'}>
      MCM &copy; {year}
    </Text>
  )
}
