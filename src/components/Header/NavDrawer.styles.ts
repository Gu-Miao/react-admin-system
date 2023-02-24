import { createStyles } from '@mantine/core'

export default createStyles(theme => ({
  root: {
    top: 60,
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    top: 60,
  },
  body: {
    height: '100%',
  },
  scrollRoot: {
    height: '100%',
  },
}))
