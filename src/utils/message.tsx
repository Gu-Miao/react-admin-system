import { showNotification, NotificationProps } from '@mantine/notifications'

type MessageOption = Omit<NotificationProps, 'message'>

const defaultStyles = {
  title: { fontSize: 22 },
  description: { fontSize: 16 }
}

function info(message: string, option?: MessageOption) {
  showNotification({
    title: 'INFO',
    message,
    styles: defaultStyles,
    ...option
  })
}

function warning(message: string, option?: MessageOption) {
  showNotification({
    title: 'WARNING',
    message,
    color: 'yellow',
    styles: defaultStyles,
    ...option
  })
}

function success(message: string, option?: MessageOption) {
  showNotification({
    title: 'SUCCESS',
    message,
    color: 'green',
    styles: defaultStyles,
    ...option
  })
}

function error(message: string, option?: MessageOption) {
  showNotification({
    title: 'ERROR!',
    message,
    color: 'red',
    styles: defaultStyles,
    ...option
  })
}

const message = {
  info,
  warning,
  success,
  error
}

export default message
