import { useMantineTheme, Burger } from '@mantine/core'
import NavDrawer from './NavDrawer'
import useBoolean from '@/hooks/useBoolean'

function MobileNav() {
  const [opened, toggleOpened] = useBoolean(false)
  const theme = useMantineTheme()

  return (
    <>
      <Burger
        opened={opened}
        onClick={() => toggleOpened()}
        size="sm"
        color={theme.colors.gray[6]}
        mr="xl"
      />
      <NavDrawer opened={opened} onClose={() => toggleOpened(false)} />
    </>
  )
}
export default MobileNav
