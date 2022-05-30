<template>
  <div class="page-modal">
    <el-dialog title="新建用户"
               v-model="dialogVisible"
               width="30%"
               center
               destroy-on-close>
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, } from 'vue'
import MyForm from '@/base-ui/form'
import { useStore } from '@/store'



export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      default: () => ({})
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    MyForm
  },
  setup(props, { emit }) {
    const formData = ref<any>({})
    const dialogVisible = ref(false)
    const store = useStore()

    watch(() => props.defaultValue, (newValue) => {
      for (const item of props.modalConfig.formItems) {
        formData.value[item.field] = newValue[item.field]
      }
    }, { deep: true })

    const handleConfirmClick = () => {
      dialogVisible.value = false

      if (Object.keys(props.defaultValue).length > 0) {
        //编辑
        store.dispatch('system/updatePageDataAction', {
          pageName: props.pageName,
          updateData: { ...formData.value, ...props.otherInfo },
          id: props.defaultValue.id
        })
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
        })
      }
    }

    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped>
</style>
