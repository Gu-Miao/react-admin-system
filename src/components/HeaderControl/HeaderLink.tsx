import { memo, forwardRef, ComponentPropsWithoutRef, ForwardedRef } from 'react'
import { Anchor } from '@mantine/core'
import HeaderTooltip from './HeaderTooltip'
import useStyles from './HeaderControl.styles'

interface HeaderLinkProps extends ComponentPropsWithoutRef<'a'> {
  tooltip: string
  link: string
}

const HeaderLink = forwardRef<HTMLAnchorElement, HeaderLinkProps>(
  ({ className, tooltip, link, ...others }, ref) => {
    const { classes, cx } = useStyles()

    return (
      <HeaderTooltip label={tooltip}>
        <Anchor
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={cx(classes.control, className)}
          href={link}
          target="_blank"
          rel="noreferrer"
          {...others}
        >
          {others.children}
        </Anchor>
      </HeaderTooltip>
    )
  },
)

export default memo(HeaderLink)
