<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig"
                  pageName="role"
                  @createData="createData"
                  @updateData="updateData"></page-content>
    <page-modal :modalConfig="modalConfig"
                :defaultValue="defaultValue"
                :otherInfo="otherInfo"
                ref="pageModalRef"
                pageName="role">
      <div class="menu-tree">
        <el-tree
                 ref="elTreeRef"
                 :data="menus"
                 show-checkbox
                 node-key="id"
                 :props="{ children: 'children', label: 'name' }"
                 @check="handleCheckClick">
        </el-tree>
      </div>
    </page-modal>

  </div>
</template>

<script lang="ts">
import { ElTree } from 'element-plus'
import { computed, defineComponent, nextTick, ref } from 'vue'
import PageContent from '@/components/page-content/src/page-content.vue';
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search/src/page-search.vue';
import PageModal from '@/components/page-modal/src/page-modal.vue';
import { modalConfig } from './config/modal.config';
import { usePageModal } from '@/hooks/use-page-modal';
import { useStore } from 'vuex';
import { mapMenulistToLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const updateCb = (item: any) => {
      const leafKeys = mapMenulistToLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })

    }
    const { pageModalRef, defaultValue, otherInfo, createData, updateData } = usePageModal(undefined, updateCb)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)


    const handleCheckClick = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultValue,
      menus,
      otherInfo,
      elTreeRef,
      createData,
      updateData,
      handleCheckClick
    };
  },
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
