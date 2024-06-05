import { Indicator } from '@mantine/core'
import { SiMysql } from 'react-icons/si'

export const MySQLStatus = (): JSX.Element => {
  return (
    <Indicator color="green">
      <SiMysql size={'4rem'} color="green" />
    </Indicator>
  )
}
