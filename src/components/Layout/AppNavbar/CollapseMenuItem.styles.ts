import { createStyles } from '@mantine/core'

export default createStyles((_, __, getRef) => ({
  item: {
    border: 0
  },
  itemOpened: {
    [`&>.${getRef('itemTitle')}>.${getRef('control')}>.${getRef('icon')}`]: {
      transform: 'rotate(0)'
    }
  },
  control: {
    padding: '12px 8px',
    lineHeight: 'inherit'
  },
  label: {
    fontWeight: 'normal'
  },
  icon: {
    transform: 'rotate(-90deg)'
  },
  contentInner: {
    padding: 0,
    paddingLeft: 8
  }
}))
