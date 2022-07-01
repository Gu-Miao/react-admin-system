import { memo, forwardRef, ComponentPropsWithoutRef } from 'react'
import { UnstyledButton, Tooltip, Anchor } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './index.styles'

interface HeaderControlProps extends ComponentPropsWithoutRef<'button'> {
  tooltip: string
  link?: string
}

const HeaderControl = forwardRef<HTMLDivElement, HeaderControlProps>(
  ({ className, tooltip, link, ...others }, ref) => {
    const { classes, theme } = useStyles()
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

    if (link) {
      return (
        <Tooltip
          ref={ref}
          label={tooltip}
          disabled={isMobile}
          className={className}
          transition="fade"
          openDelay={300}
        >
          <Anchor
            className={classes.control}
            href={link}
            target="_blank"
            rel="noreferrer"
            {...(others as any)}
          >
            {others.children}
          </Anchor>
        </Tooltip>
      )
    }

    return (
      <Tooltip
        ref={ref}
        label={tooltip}
        disabled={isMobile}
        className={className}
        transition="fade"
        openDelay={300}
      >
        <UnstyledButton className={classes.control} {...others} />
      </Tooltip>
    )
  }
)

export default memo(HeaderControl)
