import { ref } from 'vue'
import PageContent from '@/components/page-content/src/page-content.vue'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleSearchBtnClick = (payload: any) => {
    pageContentRef.value?.getPageData(payload)
  }
  return { pageContentRef, handleResetBtnClick, handleSearchBtnClick }
}
