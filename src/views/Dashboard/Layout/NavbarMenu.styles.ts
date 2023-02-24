import { createStyles } from '@mantine/core'

export default createStyles(() => ({
  menuItem: {
    display: 'block',
    padding: '16px 8px',
    fontSize: 16,
    lineHeight: 1.15,
    borderRadius: 4,
    transition: 'background-color .35s ease-in-out',
    '&:hover': {
      backgroundColor: '#e7e8e9',
    },
  },
  active: {
    backgroundColor: '#e7e8e9',
  },
}))
