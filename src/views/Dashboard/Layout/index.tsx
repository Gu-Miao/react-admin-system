import { AppShell, Footer, Center, Text, Anchor } from '@mantine/core'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/components/Header/Header'
import LayoutNavbar from './LayoutNavbar'
import { useAppSelector } from '@/hooks/useRedux'
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
  const user = useAppSelector(selectUser)

  if (user.initializing) {
    return null
  }
  if (!user.id) {
    return <Navigate to="/auth/login" replace />
  }
  return (
    <AppShell fixed header={<Header />} navbar={<LayoutNavbar />} footer={<LayoutFooter />}>
      <Outlet />
    </AppShell>
  )
}

export default AppLayout
