import { createStyles } from '@mantine/core'

export default createStyles(theme => ({
  titleContainer: {
    marginBottom: 24
  },
  logo: {
    width: 56,
    height: 'auto'
  },
  title: {
    fontSize: 22,
    fontWeight: 400,
    textAlign: 'center',
    margin: 0
  },
  welcome: {
    fontSize: 22,
    color: theme.colors.blue[6],
    textAlign: 'center',
    margin: 0,
    marginBottom: 6
  },
  divider: {
    margin: 32
  },
  form: {
    padding: '0 20px'
  },
  formItem: {
    marginBottom: 24
  },
  submit: {
    marginTop: 32
  },
  dot1: {
    position: 'fixed',
    bottom: 20,
    left: 20,
    zIndex: -1,
    width: 30
  }
}))
