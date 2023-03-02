import { useState, useEffect } from 'react'
import { Group, Title, Text, Divider, TextInput, PasswordInput, Button } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as React } from '@/assets/images/react.svg'
import { useForm } from '@mantine/form'
import useBoolean from '@/hooks/useBoolean'
import { sleep } from '@/utils'
import message from '@/utils/message'
import useStyles from './ForgetPassword.styles'

const DEMO_USERNAME = 'admin'

let timer: ReturnType<typeof setInterval> | null = null

function ForgetPassword() {
  const navigate = useNavigate()
  const { classes } = useStyles()
  const form = useForm({
    initialValues: {
      username: DEMO_USERNAME,
      verification: '',
      password: '',
      confirm: '',
    },
    validate: {
      username(value) {
        if (/[0-9a-zA-Z]{5,12}/.test(value)) return null
        else if (/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) return null
        else if (/^\S+@\S+$/.test(value)) return null
        return 'Please input valid username'
      },
      verification(value) {
        if (verified) return null
        if (/[0-9a-zA-Z]{6}/.test(value)) return null
        return 'Verification code is made of 6 numbers and letters'
      },
      password(value) {
        if (!verified) return null
        if (/[0-9a-zA-Z]{6,16}/.test(value)) return null
        return 'Please input valid password'
      },
      confirm(value) {
        if (!verified) return null
        if (value === form.values.password) return null
        return 'Please input the same passowrd again'
      },
    },
  })
  const [vcd, setVcd] = useState(0)
  const [sent, toggleSent] = useBoolean(false)
  const [verified, toggleVerified] = useBoolean(false)
  const [submitting, toggleSubmitting] = useBoolean(false)

  async function handleSubmit(values: typeof form.values) {
    toggleSubmitting(true)
    await sleep(2)
    toggleSubmitting(false)

    if (verified) {
      message.success(`Password reset!`)
      navigate('/auth/login', { replace: true })
    } else {
      toggleVerified(true)
    }
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

  function reInput() {
    toggleVerified(false)
    toggleSent(false)
    form.setValues({
      verification: '',
      password: '',
      confirm: '',
    })
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
        Recover Passport
      </Title>
      <Text align="center" color="dimmed">
        Verify the user's identity and reset the password
      </Text>
      <Divider className={classes.divider} />
      <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          className={classes.formItem}
          placeholder="Please input your username"
          label="Username"
          description="email or phone number is also ok"
          required
          disabled={verified || submitting}
          {...form.getInputProps('username')}
        />
        {!verified && (
          <TextInput
            className={classes.formItem}
            classNames={{ rightSection: classes.rightSection, input: classes.input }}
            placeholder="Please input your verification code"
            label="Verification Code"
            description="Verification code will send to your phone"
            required
            maxLength={6}
            disabled={verified && submitting}
            {...form.getInputProps('verification')}
            rightSection={
              <Button size="xs" onClick={sendVerificationCode} disabled={vcd > 0}>
                {vcd === 0 ? 'Send' : vcd + ' s'}
              </Button>
            }
          />
        )}
        {verified && (
          <>
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
              description="Input the same password agin"
              required
              disabled={submitting}
              {...form.getInputProps('confirm')}
            />
          </>
        )}
        <Group position="right">
          <Link to="/auth/login">Already have account? To login</Link>
        </Group>
        {verified ? (
          <Group className={classes.submit} position="apart" noWrap>
            <Button loading={submitting} type="submit" fullWidth>
              Submit
            </Button>
            <Button disabled={submitting} variant="outline" fullWidth onClick={reInput}>
              Re-input username
            </Button>
          </Group>
        ) : (
          <Button
            className={classes.submit}
            loading={submitting}
            disabled={!sent}
            type="submit"
            fullWidth
          >
            Verify
          </Button>
        )}
      </form>
    </div>
  )
}

export default ForgetPassword
