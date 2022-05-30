<template>
  <div class="nav-header">
    <i class="fold-menu"
       :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
       @click="handleFoldClick"></i>
    <div class="content">
      <my-breadcrumb :breadcrumbs="breadcrumbs"></my-breadcrumb>
      <user-info>
      </user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, } from 'vue'
import UserInfo from './cpns/user-info.vue'
import MyBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  emits: ["foldChange"],
  components: {
    UserInfo,
    MyBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false);
    const store = useStore()
    const route = useRoute()
    const breadcrumbs = computed(() => {
      return pathMapBreadcrumbs(store.state.login.userMenus, route.path)
    })

    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    };
  },

})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
