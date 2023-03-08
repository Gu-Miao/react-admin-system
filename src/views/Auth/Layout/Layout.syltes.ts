import { createStyles } from '@mantine/core'

export default createStyles(() => ({
  container: {
    position: 'relative',
    zIndex: 0,
    height: '100vh',
    padding: '0 20px',
    background: '#eee',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 500,
    padding: '42px 20px',
    background: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    boxShadow: 'rgb(58 53 65 / 10%) 0px 2px 10px 0px',
  },
  wave: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
}))
