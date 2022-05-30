/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

import { store } from '@/store' // path to store file
import { Store } from 'element-plus/lib/el-table/src/store'
declare module '@vue/runtime-core' {
  declare module '*.json'
  interface ComponentCustomProperties {
    $store: Store
    $filters: any
  }
}
