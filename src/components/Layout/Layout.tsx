import { AppShell, Footer, Center, Text, Anchor } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader/AppHeder'
import AppNavbar from './AppNavbar/AppNavbar'
import useBoolean from '@/hooks/useBoolean'

function AppFooter() {
  return (
    <Footer height={60} p="md">
      <Center>
        <Text>
          Made by{' '}
          <Anchor href="https://github.com/Gu-Miao" target="_blank" rel="noreferrer">
            Gu Miao
          </Anchor>
        </Text>
      </Center>
    </Footer>
  )
}

function AppLayout() {
  const [opened, toggleOpened] = useBoolean(false)

  return (
    <AppShell
      fixed
      header={<AppHeader opened={opened} onOpenedChange={() => toggleOpened()} />}
      navbar={<AppNavbar hidden={!opened} />}
      footer={<AppFooter />}
    >
      <Outlet />
    </AppShell>
  )
}

export default AppLayout
