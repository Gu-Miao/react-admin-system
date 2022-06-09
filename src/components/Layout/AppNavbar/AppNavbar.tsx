import { memo, FC } from 'react'
import { Navbar, Accordion, ScrollArea } from '@mantine/core'
import { Link } from 'react-router-dom'
import useStyles from './AppNavbar.styles'

type AppNavbarProps = {
  hidden: boolean
}

const AppNavbar: FC<AppNavbarProps> = ({ hidden }) => {
  const { classes } = useStyles()

  return (
    <Navbar p={0} hiddenBreakpoint="sm" hidden={hidden} width={{ sm: 260, lg: 300 }}>
      <ScrollArea p="xs" scrollbarSize={8}>
        <Accordion classNames={classes} multiple offsetIcon={false} sx={{ padding: 0 }}>
          <Accordion.Item label="Customization">
            <Accordion classNames={classes} multiple offsetIcon={false} sx={{ padding: 0 }}>
              <Accordion.Item label="Customization">
                <Link to="/">Customization</Link>
              </Accordion.Item>
              <Accordion.Item label="Flexibility">
                <Link to="/">Flexibility</Link>
              </Accordion.Item>
              <Accordion.Item label="No annoying focus ring">
                <Link to="/">No annoying focus ring</Link>
              </Accordion.Item>
            </Accordion>
          </Accordion.Item>
          <Accordion.Item label="Flexibility">
            <Accordion classNames={classes} multiple offsetIcon={false} sx={{ padding: 0 }}>
              <Accordion.Item label="Customization">
                <Link to="/">Customization</Link>
              </Accordion.Item>
              <Accordion.Item label="Flexibility">
                <Link to="/">Flexibility</Link>
              </Accordion.Item>
              <Accordion.Item label="No annoying focus ring">
                <Link to="/">No annoying focus ring</Link>
              </Accordion.Item>
            </Accordion>
          </Accordion.Item>
          <Accordion.Item label="No annoying focus ring">
            <Accordion classNames={classes} multiple offsetIcon={false} sx={{ padding: 0 }}>
              <Accordion.Item label="Customization">
                <Link to="/">Customization</Link>
              </Accordion.Item>
              <Accordion.Item label="Flexibility">
                <Link to="/">Flexibility</Link>
              </Accordion.Item>
              <Accordion.Item label="No annoying focus ring">
                <Link to="/">No annoying focus ring</Link>
              </Accordion.Item>
            </Accordion>
          </Accordion.Item>
        </Accordion>
      </ScrollArea>
    </Navbar>
  )
}

export default memo(AppNavbar)
