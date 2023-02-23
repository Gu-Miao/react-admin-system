import { MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
  globalStyles: () => ({
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  }),
}

export default theme
