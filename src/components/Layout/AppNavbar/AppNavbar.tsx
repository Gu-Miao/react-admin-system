import { memo, FC } from 'react'
import { Navbar, Text } from '@mantine/core'

type AppNavbarProps = {
  hidden: boolean
}

const AppNavbar: FC<AppNavbarProps> = ({ hidden }) => {
  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={hidden} width={{ sm: 200, lg: 300 }}>
      <Text>Application navbar</Text>
    </Navbar>
  )
}

export default memo(AppNavbar)
