import { Indicator } from '@mantine/core'
import { BiLogoSpringBoot } from 'react-icons/bi'

export const SpringBootStatus = (): JSX.Element => {
  return (
    <Indicator color="green">
      <BiLogoSpringBoot size={'4rem'} color="green" />
    </Indicator>
  )
}
