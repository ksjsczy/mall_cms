import myRequest from '@/service'
import { IAccount, ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  userMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(roleId: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.userMenus + roleId + '/menu',
    showLoading: false
  })
}
