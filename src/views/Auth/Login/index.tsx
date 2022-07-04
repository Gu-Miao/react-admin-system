import {
  Group,
  Title,
  Text,
  Divider,
  TextInput,
  PasswordInput,
  Checkbox,
  Button
} from '@mantine/core'
import { Link } from 'react-router-dom'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { useForm } from '@mantine/form'
import useStyles from './index.styles'

function Login() {
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      remember: undefined
    }
  })

  return (
    <div>
      <Group className={classes.titleContainer} spacing={0} position="center">
        <React className={classes.logo} />
        <Title className={classes.title} order={1}>
          React Admin System
        </Title>
      </Group>
      <Title className={classes.welcome} order={2}>
        Hi, Welcome Back
      </Title>
      <Text align="center" color="dimmed">
        Please sign-in to your account and start the adventure
      </Text>
      <Divider className={classes.divider} />
      <form className={classes.form}>
        <TextInput
          className={classes.formItem}
          placeholder="Please input your username"
          label="Username"
          description="email or phone number is also ok"
          size="lg"
          required
          {...form.getInputProps('username')}
        />
        <PasswordInput
          className={classes.formItem}
          placeholder="Please input your password"
          label="Password"
          description="6~12 length, made of letters and numbers"
          size="lg"
          required
          {...form.getInputProps('password')}
        />
        <Group position="apart">
          <Checkbox label="Remember me" {...form.getInputProps('remember')} />
          <Link to="forget-password">Forget password?</Link>
        </Group>
        <Button className={classes.submit} type="submit" fullWidth size="lg">
          Login
        </Button>
      </form>
    </div>
  )
}
export default Login
