import { createStyles } from '@mantine/core'

export default createStyles((_, __, getRef) => ({
  item: {
    border: 0,
  },
  control: {
    borderRadius: 4,
    padding: '16px 8px',
    transition: 'background-color .35s ease-in-out',
    '&:hover': {
      backgroundColor: '#e7e8e9',
    },
  },
  content: {
    padding: 6,
    paddingRight: 2,
  },
  chevron: {
    transform: 'rotate(-90deg)',
    '&[data-rotate]': {
      transform: 'rotate(0deg)',
    },
  },
}))
