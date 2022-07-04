import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import { DirectionContext, DirectionContextProps } from '@/contexts/DirectionContext'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { useToggle } from '@mantine/hooks'
import theme from './theme'
import rtlPlugin from 'stylis-plugin-rtl'

function App() {
  const [dir, toggleDirection] = useToggle<DirectionContextProps['dir']>('ltr', ['ltr', 'rtl'])

  return (
    <Provider store={store}>
      <DirectionContext.Provider value={{ dir, toggleDirection }}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ ...theme, dir }}
          emotionOptions={
            dir === 'rtl' ? { key: 'mantine-rtl', stylisPlugins: [rtlPlugin] } : { key: 'mantine' }
          }
        >
          <NotificationsProvider position="top-right">
            <ModalsProvider modalProps={{ centered: true }}>
              <div dir={dir}>
                <BrowserRouter>
                  <Routes />
                </BrowserRouter>
              </div>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </DirectionContext.Provider>
    </Provider>
  )
}

function Routes() {
  const element = useRoutes(routes)
  return element
}

export default App
