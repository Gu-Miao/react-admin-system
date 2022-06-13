import { createStyles } from '@mantine/core'

export default createStyles(() => ({
  error: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#e9e9e9'
  },
  banner: {
    width: 500,
    height: 'auto',
    marginBottom: 50
  },
  title: {
    marginBottom: 20
  }
}))
