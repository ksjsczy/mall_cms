<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig"
                 @resetBtnClick="handleResetBtnClick"
                 @searchBtnClick="handleSearchBtnClick"></page-search>
    <page-content :contentTableConfig="contentTableConfig"
                  pageName="users"
                  ref="pageContentRef"
                  @createData="createData"
                  @updateData="updateData"></page-content>
    <page-modal :modalConfig="modalConfigRef"
                :defaultValue="defaultValue"
                ref="pageModalRef"
                pageName="users"></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const { pageContentRef, handleResetBtnClick, handleSearchBtnClick } = usePageSearch()

    const store = useStore()

    const createCb = () => {
      for (const item of modalConfig.formItems) {
        if (item.isHidden !== undefined) {
          item.isHidden = false
        }
      }
    }
    const updateCb = () => {
      for (const item of modalConfig.formItems) {
        if (item.isHidden !== undefined) {
          item.isHidden = true
        }
      }
    }

    const modalConfigRef = computed(() => {
      for (const item of modalConfig.formItems) {
        if (item.field === 'departmentId') {
          item.options = store.state.entireDepartment.map(item => ({ title: item.name, value: item.id }))
        } else if (item.field === 'roleId') {
          item.options = store.state.entireRole.map(item => ({ title: item.name, value: item.id }))
        }
      }
      return modalConfig
    })

    const { pageModalRef, defaultValue, createData, updateData } = usePageModal(createCb, updateCb)

    return {
      pageContentRef,
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageModalRef,
      defaultValue,
      handleResetBtnClick,
      handleSearchBtnClick,
      createData,
      updateData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
