import {
  getPageListData,
  deletePageData,
  createPageData,
  updatePageData
} from '@/service/main/system/system'
import { Module } from 'vuex'
import { IRootState } from '../../types'
import { ISystemState } from './types'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      //对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      const { list, totalCount } = pageResult.data
      const capitalPageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${capitalPageName}List`, list)
      commit(`change${capitalPageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const { id, pageName } = payload
      const url = `/${pageName}/${id}`
      await deletePageData(url)
      const queryInfo = {
        offset: 0,
        size: 10
      }
      dispatch('getPageListAction', {
        pageName,
        queryInfo
      })
    },

    async createPageDataAction({ dispatch }, payload) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageData(url, newData)
      const queryInfo = {
        offset: 0,
        size: 10
      }
      dispatch('getPageListAction', {
        pageName,
        queryInfo
      })
    },

    async updatePageDataAction({ dispatch }, payload) {
      const { pageName, updateData, id } = payload
      const url = `/${pageName}/${id}`
      await updatePageData(url, updateData)
      const queryInfo = {
        offset: 0,
        size: 10
      }
      dispatch('getPageListAction', {
        pageName,
        queryInfo
      })
    },
    test(_, payload) {
      console.log(payload)
    }
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  }
}

export default systemModule
