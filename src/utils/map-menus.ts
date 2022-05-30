import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先去加载魔人的所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    // console.log(key)
    // console.log('@/router/main' + key.slice(1))
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route.default)
  })

  //2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) firstMenu = menu
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapBreadcrumbs(
  userMenus: any[],
  currentPath: string
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const res = pathMapToMenu(menu.children ?? [], currentPath)
      if (res) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: res.name })
        return res
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }

export function mapMenusToPersimmons(userMenus: any[]) {
  const permissions: string[] = []
  function _recurseGetPermission(menus: any) {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      }
      permissions.push(menu.permission)
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function mapMenulistToLeafKeys(menulist: any[]) {
  const leafKeys: number[] = []
  function _recurseGetLeafKeys(item: any) {
    for (const i of item) {
      if (i?.children) {
        _recurseGetLeafKeys(i.children)
      } else {
        leafKeys.push(i.id)
      }
    }
  }
  _recurseGetLeafKeys(menulist)
  return leafKeys
}
