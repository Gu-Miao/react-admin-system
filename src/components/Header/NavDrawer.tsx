import { Drawer, ScrollArea } from '@mantine/core'
import useStyles from './NavDrawer.styles'
import NavbarMenu from '@/components/NavbarMenu'

type NavDrawerProps = {
  opened: boolean
  onClose(): void
}

function NavDrawer({ opened, onClose }: NavDrawerProps) {
  const { classes } = useStyles()

  return (
    <Drawer
      classNames={classes}
      opened={opened}
      onClose={onClose}
      size="75%"
      position="top"
      withCloseButton={false}
      transition="fade"
    >
      <ScrollArea p="xs" scrollbarSize={8} classNames={{ root: classes.scrollRoot }}>
        <NavbarMenu onClick={onClose} />
      </ScrollArea>
    </Drawer>
  )
}

export default NavDrawer
