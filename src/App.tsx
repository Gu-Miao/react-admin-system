import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { NavigationProgress } from '@mantine/nprogress'
import { useAppSelector } from '@/hooks/useRedux'
import { selectLayout } from '@/store/layout'
import theme from './theme'
import rtlPlugin from 'stylis-plugin-rtl'

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  stylisPlugins: [rtlPlugin],
})

function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <AppInner />
      </Provider>
    </StrictMode>
  )
}

function AppInner() {
  const layout = useAppSelector(selectLayout)
  const emotionCache = layout.dir === 'rtl' ? rtlCache : undefined

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ ...theme, dir: layout.dir }}
      emotionCache={emotionCache}
    >
      <NavigationProgress />
      <NotificationsProvider position="top-right">
        <ModalsProvider modalProps={{ centered: true }}>
          <div dir={layout.dir}>
            <RouterProvider router={router} />
          </div>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
