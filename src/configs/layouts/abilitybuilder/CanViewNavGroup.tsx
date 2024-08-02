import { ReactNode, useContext } from 'react'
import { NavGroup, NavLink } from '../../g_types/types'
import { useAbility } from 'src/configs/g_hooks/useAbility'

interface Props {
  navGroup?: NavGroup
  children: ReactNode
}

const CanViewNavGroup = (props: Props) => {
  const { children, navGroup } = props
  const ability = useAbility()

  const checkForVisibleChild = (arr: NavLink[] | NavGroup[]): boolean => {
    return arr.some((i: NavGroup) => {
      if (i.children) {
        return checkForVisibleChild(i.children)
      } else {
        return ability?.can(i.action, i.subject)
      }
    })
  }

  const canViewMenuGroup = (item: NavGroup) => {
    const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children)

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
  }

  return navGroup && canViewMenuGroup(navGroup) ? <>{children}</> : null
}

export default CanViewNavGroup
