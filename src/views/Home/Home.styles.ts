import { createStyles } from '@mantine/core'

export default createStyles(theme => {
  const breakPointLg = `@media (max-width: ${theme.breakpoints.lg}px)`

  return {
    scroll: {
      height: 'calc(100vh - 60px)'
    },
    container: {
      paddingTop: 180
    },
    title: {
      width: '100%',
      height: 'auto',
      marginBottom: 32
    },
    description: {
      fontSize: 28,
      color: theme.colors.gray[7],
      marginBottom: 30,
      [breakPointLg]: {
        '&': {
          fontSize: 22
        }
      },
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        '&': {
          fontSize: 18
        }
      }
    },
    controls: {
      marginTop: theme.spacing.xl * 1.5,
      [breakPointLg]: {
        marginTop: theme.spacing.xl
      }
    },
    control: {
      height: 64,
      paddingLeft: 46,
      paddingRight: 46,
      fontSize: 22,
      [breakPointLg]: {
        height: 54,
        paddingLeft: 18,
        paddingRight: 18,
        flex: 1
      }
    },
    controlPrimary: {
      border: 0,
      backgroundImage: `linear-gradient(52deg, ${
        theme.colors.blue[theme.colorScheme === 'dark' ? 5 : 7]
      } 3%, ${theme.colors.cyan[theme.colorScheme === 'dark' ? 4 : 5]} 97%)`
    },
    githubControl: {
      borderWidth: 2,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.dark[9],
      backgroundColor: 'transparent',

      '&:hover': {
        backgroundColor: `${
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        } !important`
      }
    },
    wave: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 'auto',
      zIndex: -1
    }
  }
})
