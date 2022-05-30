import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './analysis/dashboard'
import { IRootState, IStoreType } from './types'
import myRequest from '@/service'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await myRequest.post({
        url: '/department/list',
        data: {
          offset: 0,
          size: 1000
        }
      })
      commit('changeDepartmentList', departmentResult.data.list)

      const roleResult = await myRequest.post({
        url: '/role/list',
        data: {
          offset: 0,
          size: 1000
        }
      })
      commit('changeRoleList', roleResult.data.list)

      const menuResult = await myRequest.post({
        url: '/menu/list',
        data: {}
      })
      commit('changeMenuList', menuResult.data.list)
    }
  },
  mutations: {
    changeDepartmentList(state, payload) {
      state.entireDepartment = payload
    },
    changeRoleList(state, payload) {
      state.entireRole = payload
    },
    changeMenuList(state, payload) {
      state.entireMenu = payload
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
