import { createStyles } from '@mantine/core'

export default createStyles((_, { show }: { show: boolean }) => ({
  item: {},
  itemTitle: {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  control: {
    width: '100%',
    padding: '12px 8px'
  },
  icon: {
    transform: `rotate(${show ? '90deg' : 0})`
  },
  content: {
    padding: 8
  }
}))
