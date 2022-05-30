<template>
  <div class="goods">
    <page-content :content-table-config="contentTableConfig" page-name="goods">
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>
      <template #image="scope">
        <el-image style="width:60px;height:60px"
                  :src="scope.row.imgUrl"
                  :preview-src-list="[scope.row.imgUrl]"></el-image>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content/src/page-content.vue'
import { contentTableConfig } from './config/content-config'

export default defineComponent({
  name: "goods",
  setup() {
    return {
      contentTableConfig
    };
  },
  components: { PageContent }
})
</script>

<style scoped>
</style>
