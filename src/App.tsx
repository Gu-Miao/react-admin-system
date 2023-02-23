import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { DirectionContext, DirectionContextProps } from '@/contexts/DirectionContext'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { useToggle } from '@mantine/hooks'
import theme from './theme'
import rtlPlugin from 'stylis-plugin-rtl'

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
})

function App() {
  const [dir, toggleDirection] = useToggle<DirectionContextProps['dir']>(['ltr', 'rtl'] as const)
  const emotionCache = dir === 'rtl' ? rtlCache : undefined

  return (
    <StrictMode>
      <Provider store={store}>
        <DirectionContext.Provider value={{ dir, toggleDirection }}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ ...theme, dir }}
            emotionCache={emotionCache}
          >
            <NotificationsProvider position="top-right">
              <ModalsProvider modalProps={{ centered: true }}>
                <div dir={dir}>
                  <RouterProvider router={router} />
                </div>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </DirectionContext.Provider>
      </Provider>
    </StrictMode>
  )
}

export default App
