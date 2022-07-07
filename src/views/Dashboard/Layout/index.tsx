import { AppShell, Footer, Center, Text, Anchor } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'
import LayoutHeader from './LayoutHeader'
import LayoutNavbar from './LayoutNavbar'
import { useSelector } from 'react-redux'
import useBoolean from '@/hooks/useBoolean'
import { selectUser } from '@/store/user'

function LayoutFooter() {
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
  const user = useSelector(selectUser)
  const [opened, toggleOpened] = useBoolean(false)

  if (user.initializing) {
    return null
  }
  if (!user.id) {
    return <Navigate to="/auth/login" replace />
  }
  return (
    <AppShell
      fixed
      header={<LayoutHeader opened={opened} onOpenedChange={() => toggleOpened()} />}
      navbar={<LayoutNavbar hidden={!opened} />}
      footer={<LayoutFooter />}
    >
      <Outlet />
    </AppShell>
  )
}

export default AppLayout
