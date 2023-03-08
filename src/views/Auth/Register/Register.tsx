import { useState, useEffect } from 'react'
import { Group, Title, Text, Divider, TextInput, PasswordInput, Button } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { useForm } from '@mantine/form'
import useBoolean from '@/hooks/useBoolean'
import { sleep } from '@/utils'
import message from '@/utils/message'
import useStyles from './Register.styles'

let timer: ReturnType<typeof setInterval> | null = null

function Register() {
  const navigate = useNavigate()
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      email: '',
      verification: '',
      password: '',
      confirm: '',
    },
    validate: {
      email(value) {
        if (/^\S+@\S+$/.test(value)) return null
        return 'Please input valid email'
      },
      verification(value) {
        if (/[0-9a-zA-Z]{6}/.test(value)) return null
        return 'Verification code is made of 6 numbers and letters'
      },
      password(value) {
        if (/[0-9a-zA-Z]{6,16}/.test(value)) return null
        return 'Please input valid password'
      },
      confirm(value) {
        if (value === form.values.password) return null
        return 'Please input the same passowrd again'
      },
    },
  })
  const [vcd, setVcd] = useState(0)
  const [sent, toggleSent] = useBoolean(false)
  const [submitting, toggleSubmitting] = useBoolean(false)

  async function handleSubmit() {
    toggleSubmitting(true)
    await sleep(2)
    toggleSubmitting(false)

    message.success('Register request sent!')
    navigate('/auth/login', { replace: true })
  }

  function sendVerificationCode() {
    toggleSent(true)
    setVcd(30)

    timer = setInterval(() => {
      setVcd(vcd => {
        if (vcd === 1) {
          if (timer) clearInterval(timer)
          timer = null
        }
        return vcd - 1
      })
    }, 1000)
  }

  useEffect(
    () => () => {
      if (timer) clearInterval(timer)
    },
    [],
  )

  return (
    <div>
      <Group className={classes.titleContainer} spacing={0} position="center">
        <React className={classes.logo} />
        <Title className={classes.title} order={1}>
          React Admin System
        </Title>
      </Group>
      <Title className={classes.welcome} order={2}>
        Cretae a new passport
      </Title>
      <Text align="center" color="dimmed">
        Name your account and join the party here
      </Text>
      <Divider className={classes.divider} />
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          className={classes.formItem}
          placeholder="Please input your e-mail"
          label="E-mail"
          description="It will be used for authentication"
          required
          disabled={submitting}
          {...form.getInputProps('email')}
        />
        <TextInput
          className={classes.formItem}
          classNames={{ rightSection: classes.rightSection, input: classes.input }}
          placeholder="Please input your verification code"
          label="Verification Code"
          description="Verification code will be sent to your e-mail"
          required
          maxLength={6}
          disabled={submitting}
          {...form.getInputProps('verification')}
          rightSection={
            <Button size="xs" onClick={sendVerificationCode} disabled={vcd > 0}>
              {vcd === 0 ? 'Send' : vcd + ' s'}
            </Button>
          }
        />
        <PasswordInput
          className={classes.formItem}
          placeholder="Please input your password"
          label="Password"
          description="6~16 length, made of letters and numbers"
          required
          disabled={submitting}
          {...form.getInputProps('password')}
        />
        <PasswordInput
          className={classes.formItem}
          placeholder="Please confirm your password"
          label="Confirm password"
          description="Input the same password again"
          required
          disabled={submitting}
          {...form.getInputProps('confirm')}
        />
        <Group position="right">
          <Link to="/auth/login">Already have account? To login</Link>
        </Group>
        <Button
          className={classes.submit}
          loading={submitting}
          disabled={!sent}
          type="submit"
          fullWidth
        >
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
