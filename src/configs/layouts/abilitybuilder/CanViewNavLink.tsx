import { ReactNode, useContext } from 'react'
import { NavLink } from '../../g_types/types'
import { useAbility } from 'src/configs/g_hooks/useAbility'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  const { children, navLink } = props
  const ability = useAbility()
  return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
}

export default CanViewNavLink
