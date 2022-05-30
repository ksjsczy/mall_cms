import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(createCb?: callbackFn, updateCb?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultValue = ref({})
  const otherInfo = ref({})

  const createData = () => {
    defaultValue.value = {}
    pageModalRef.value!.dialogVisible = true
    createCb && createCb()
  }

  const updateData = (item: any) => {
    defaultValue.value = { ...item }
    if (item.menuList !== undefined) {
      otherInfo.value = item.menuList
    }
    pageModalRef.value!.dialogVisible = true
    updateCb && updateCb(item)
  }
  return {
    pageModalRef,
    defaultValue,
    otherInfo,
    createData,
    updateData
  }
}
