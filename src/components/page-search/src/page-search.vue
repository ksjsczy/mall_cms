<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick">重置</el-button>
          <el-button icon="el-icon-search" type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import { searchFormConfig } from '@/views/main/system/user/config/search.config'
import MyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    MyForm
  },
  emits: ['resetBtnClick', 'searchBtnClick'],
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    //双向绑定的属性应该是由配置文件的field来决定
    //1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //2.优化二：当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      // for (const key in formData.value) {
      //   formData.value[key] = formOriginData[key]
      // }
      emit('resetBtnClick')
    }

    //3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('searchBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.header {
  color: red;
}

.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
