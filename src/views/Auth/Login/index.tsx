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
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { useForm } from '@mantine/form'
import useBoolean from '@/hooks/useBoolean'
import useStyles from './index.styles'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/user'
import { sleep } from '@/utils'
import message from '@/utils/message'
import forage from '@/utils/forage'

const DEMO_USERNAME = 'admin'
const DEMO_PASSWORD = 'ras123'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      username: DEMO_USERNAME,
      password: DEMO_PASSWORD,
      remember: false
    },
    validate: {
      username(value) {
        if (/[0-9a-zA-Z]{5,12}/.test(value)) return null
        else if (/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) return null
        else if (/^\S+@\S+$/.test(value)) return null
        return 'Please input valid username'
      },
      password(value) {
        if (/[0-9a-zA-Z]{6,16}/.test(value)) return null
        return 'Please input valid password'
      }
    }
  })
  const [submitting, toggleSubmitting] = useBoolean(false)

  async function handleSubmit(values: typeof form.values) {
    toggleSubmitting(true)

    const { username, password, remember } = values

    // Simulate login request
    await sleep(2)

    toggleSubmitting(false)

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      message.error('Login failed: username or password is not right')
      return
    }
    message.success(`Welcome back, ${username}!`)
    const userInfo = { username: 'admin', id: '0', roles: ['admin'] }
    dispatch(setUserInfo(userInfo))
    if (remember) {
      forage.setItem('user', { ...userInfo, expiry: Date.now() })
    }
    navigate('/dashboard', { replace: true })
  }

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
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          className={classes.formItem}
          placeholder="Please input your username"
          label="Username"
          description="email or phone number is also ok"
          size="lg"
          required
          disabled={submitting}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          className={classes.formItem}
          placeholder="Please input your password"
          label="Password"
          description="6~16 length, made of letters and numbers"
          size="lg"
          required
          disabled={submitting}
          {...form.getInputProps('password')}
        />
        <Group position="apart">
          <Checkbox label="Remember me" disabled={submitting} {...form.getInputProps('remember')} />
          <Link to="forget-password">Forget password?</Link>
        </Group>
        <Button className={classes.submit} loading={submitting} type="submit" fullWidth size="lg">
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
