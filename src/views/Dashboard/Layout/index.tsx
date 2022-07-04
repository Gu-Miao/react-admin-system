import { AppShell, Footer, Center, Text, Anchor } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import LayoutHeader from './LayoutHeader'
import LayoutNavbar from './LayoutNavbar'
import { useSelector } from 'react-redux'
import useBoolean from '@/hooks/useBoolean'
import useNavigateHome from '@/hooks/useNavigateHome'
import { selectUser } from '@/store/user'

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
  const user = useSelector(selectUser)
  useNavigateHome(!user.id)
  const [opened, toggleOpened] = useBoolean(false)

  return (
    <AppShell
      fixed
      header={<LayoutHeader opened={opened} onOpenedChange={() => toggleOpened()} />}
      navbar={<LayoutNavbar hidden={!opened} />}
      footer={<AppFooter />}
    >
      <Outlet />
    </AppShell>
  )
}

export default AppLayout
