import { memo, FC } from 'react'
import { Navbar, ScrollArea } from '@mantine/core'
import NavbarMenu from './NavbarMenu'

interface LayoutNavbarProps {
  hidden: boolean
}

const LayoutNavbar: FC<LayoutNavbarProps> = ({ hidden }) => {
  return (
    <Navbar p={0} hiddenBreakpoint="sm" hidden={hidden} width={{ sm: 260, lg: 300 }}>
      <ScrollArea p="xs" scrollbarSize={8}>
        <NavbarMenu />
      </ScrollArea>
    </Navbar>
  )
}

export default memo(LayoutNavbar)
