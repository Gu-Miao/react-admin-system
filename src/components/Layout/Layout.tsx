import { AppShell, Footer, Center, Text, MantineProvider } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader/AppHeder'
import AppNavbar from './AppNavbar/AppNavbar'
import useBoolean from '@/hooks/useBoolean'
import { DirectionContext, DirectionContextProps } from './DirectionContext'
import { useToggle } from '@mantine/hooks'
import rtlPlugin from 'stylis-plugin-rtl'

function AppFooter() {
  return (
    <Footer height={60} p="md">
      <Center>
        <Text>
          Made by{' '}
          <Text
            variant="link"
            component="a"
            href="https://github.com/Gu-Miao"
            target="_blank"
            rel="noreferrer"
          >
            Gu Miao
          </Text>
        </Text>
      </Center>
    </Footer>
  )
}

function AppLayout() {
  const [opened, toggleOpened] = useBoolean(false)
  const [dir, toggleDirection] = useToggle<DirectionContextProps['dir']>('ltr', ['ltr', 'rtl'])

  return (
    <DirectionContext.Provider value={{ dir, toggleDirection }}>
      <MantineProvider
        theme={{ dir }}
        emotionOptions={
          dir === 'rtl' ? { key: 'mantine-rtl', stylisPlugins: [rtlPlugin] } : { key: 'mantine' }
        }
      >
        <div dir={dir}>
          <AppShell
            fixed
            header={<AppHeader opened={opened} onOpenedChange={() => toggleOpened()} />}
            navbar={<AppNavbar hidden={!opened} />}
            footer={<AppFooter />}
          >
            <Outlet />
          </AppShell>
        </div>
      </MantineProvider>
    </DirectionContext.Provider>
  )
}

export default AppLayout
