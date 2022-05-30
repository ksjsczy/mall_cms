import { useStore } from '../store'

export function usePermission(pageName: string, handleName: string): boolean {
  const store = useStore()
  const valifyPermission = `system:${pageName}:${handleName}`
  for (const permission of store.state.login.permissions) {
    if (valifyPermission === permission) {
      return true
    }
  }
  return false
}

// export function usePermission(pageName: string, handleName: string): boolean {
//   const store = useStore()
//   let flag = false
//   const valifyPermission = `system:${pageName}:${handleName}`
//   store.state.login.permissions.forEach((permission) => {
//     if (valifyPermission === permission) {
//       flag = true
//     }
//   })
//   return flag
// }
