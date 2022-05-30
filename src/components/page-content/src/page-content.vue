<template>
  <div class="page-content">
    <my-table :pageList="pageList"
              :pageCount="pageCount"
              v-bind="contentTableConfig"
              @selectionChange="handleSelectionChange"
              v-model:page="pageInfo">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate"
                   type="primary"
                   size="medium"
                   @click="handleCreateClick">新建</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button size="mini" plain
                   :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button v-if="isUpdate"
                     icon="el-icon-edit"
                     size="mini"
                     type="text"
                     @click="handleUpdataClick(scope.row)">编辑</el-button>
          <el-button v-if="isDelete"
                     icon="el-icon-delete"
                     size="mini"
                     type="text"
                     @click="handleDeleteClick(scope.row)">删除</el-button>
        </div>
      </template>
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import MyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  emits: ['createData', 'updateData'],
  components: {
    MyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    const store = useStore()
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    const pageList = computed(() => store.getters['system/pageListData'](props.pageName))

    const pageCount = computed(() => store.getters['system/pageListCount'](props.pageName))

    const handleSelectionChange = (value: any) => {
      console.log(value);
    }
    watch(pageInfo, () => {
      getPageData()
    })

    const otherPropSlots = props.contentTableConfig?.propList.filter((item: any) => {
      if (item.slotName === undefined) return false
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        id: item.id,
        pageName: props.pageName
      })
    }
    const handleCreateClick = () => {
      emit('createData')
    }
    const handleUpdataClick = (item: any) => {
      emit('updateData', item)
    }


    return {
      pageList,
      pageCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      isQuery,
      handleCreateClick,
      handleSelectionChange,
      getPageData,
      handleDeleteClick,
      handleUpdataClick
    }
  }
})
</script>

<style scoped>
</style>
