import { FC, PropsWithChildren } from 'react'
import { Link, LinkProps, matchRoutes, useLocation, RouteMatch } from 'react-router-dom'
import { List, UnstyledButton } from '@mantine/core'
import CollapseItem from '@/components/CollapseItem/CollapseItem'
import routes, { RouteWithMeta } from '@/routes'
import useStyles from './NavbarMenu.sytles'

const MenuList: FC<PropsWithChildren> = ({ children }) => {
  return <List listStyleType="none">{children}</List>
}

const MenuItem: FC<PropsWithChildren<{ to: LinkProps['to']; active?: boolean }>> = ({
  to,
  children,
  active = false
}) => {
  const { classes, cx } = useStyles()
  return (
    <List.Item className={cx(classes.menuItem, active && classes.menuItemActive)}>
      <UnstyledButton component={Link} to={to}>
        {children}
      </UnstyledButton>
    </List.Item>
  )
}

const ItemWithChildren: FC<PropsWithChildren<{ label?: string; defaultOpened?: boolean }>> = ({
  label,
  defaultOpened,
  children
}) => {
  const props: { initialItem?: number } = {}
  if (defaultOpened) props.initialItem = 0
  return (
    <CollapseItem label={label} open={defaultOpened}>
      <MenuList>{children}</MenuList>
    </CollapseItem>
  )
}

function NavbarMenu() {
  const location = useLocation()
  const [, ...matchedRoutes] = matchRoutes(routes, location, process.env.PUBLIC_URL) as RouteMatch[]

  const topLevelRoutes = routes.find(route => route.path === '/')?.children as RouteWithMeta[]
  return (
    <MenuList>
      <MenuItems routes={topLevelRoutes} matchedRoutes={matchedRoutes} />
    </MenuList>
  )
}

interface MenuItemProps {
  routes: RouteWithMeta[]
  prefix?: string
  matchedRoutes: RouteMatch[]
}

const MenuItems: FC<MenuItemProps> = ({ routes, prefix = '', matchedRoutes }) => {
  return (
    <>
      {routes.map(route => {
        const path = getPath(route, prefix)
        const [current, ...rest] = matchedRoutes
        const isMatched = current?.route === route

        if (route.children) {
          return (
            <List.Item key={path}>
              <ItemWithChildren defaultOpened={isMatched} label={route.meta?.title}>
                <MenuItems routes={route.children} prefix={path} matchedRoutes={rest} />
              </ItemWithChildren>
            </List.Item>
          )
        }

        return (
          <MenuItem key={path} to={path} active={isMatched}>
            {route.meta?.title}
          </MenuItem>
        )
      })}
    </>
  )
}

function getPath(route: RouteWithMeta, prefix: string) {
  if (route.index) return prefix
  if (route.path?.startsWith('/') || prefix === '') return route.path as string
  return prefix.endsWith('/') ? prefix + route.path : `${prefix}/${route.path}`
}

export default NavbarMenu
