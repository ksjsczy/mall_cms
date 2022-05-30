<template>
  <div class="base-echart">
    <div ref="divRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
import useEchart from '../hooks/useEchart';

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<echarts.EChartsOption>,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    }
  },
  setup(props) {
    const divRef = ref<HTMLElement>()

    onMounted(() => {
      const { echartInstance, setOptions } = useEchart(divRef.value!)
      watchEffect(() => {
        setOptions(props.option)
      })
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped>
</style>
