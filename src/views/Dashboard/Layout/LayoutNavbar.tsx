import { Navbar, ScrollArea } from '@mantine/core'
import NavbarMenu from '@/components/NavbarMenu'

function LayoutNavbar() {
  return (
    <Navbar p={0} hidden hiddenBreakpoint="sm" width={{ sm: 260, lg: 300 }}>
      <ScrollArea p="xs" scrollbarSize={8}>
        <NavbarMenu />
      </ScrollArea>
    </Navbar>
  )
}

export default LayoutNavbar
