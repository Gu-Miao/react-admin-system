import { createStyles } from '@mantine/core'

export default createStyles((_, __, getRef) => ({
  menuItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f8f9fa',
    },
    '& *': {
      display: 'block',
    },
    '& a': {
      padding: '12px 8px',
    },
  },
  menuItemActive: {
    backgroundColor: '#f8f9fa',
  },
}))
