import { createStyles } from '@mantine/core'

export default createStyles((_, __, getRef) => ({
  itemOpened: {
    [`&>.${getRef('itemTitle')} .${getRef('icon')}`]: {
      transform: 'rotate(-90deg) !important'
    }
  },
  contentInner: {
    padding: 8
  }
}))
