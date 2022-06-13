import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from './routes'
import { MantineProvider } from '@mantine/core'
import theme from './theme'

function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  )
}

function Routes() {
  const element = useRoutes(routes)
  return element
}

export default App
