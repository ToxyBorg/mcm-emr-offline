import { Image, ThemeIcon } from '@mantine/core'
import mcm_logo_text from '../../../../resources/icons/mcm-logo-text-40x125.png'

export const MCMlogo = (): JSX.Element => {
  return (
    <ThemeIcon
      variant="white"
      h="fit-content"
      w="fit-content"
      p={'lg'}
      radius={'lg'}
      aria-label="Open MCM EMR Webpage"
      style={{
        border: '2px solid grey',
        boxShadow: '5px 5px 2px grey'
      }}
    >
      <Image h={70} w="fit-content" fit="contain" src={mcm_logo_text} alt="MCM Systems Text Logo" />
    </ThemeIcon>
  )
}
