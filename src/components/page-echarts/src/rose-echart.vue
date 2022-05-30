<template>
  <div class="rose-echart">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import BaseEchart from '@/base-ui/echart'
import { IDataType } from '../types'
import { EChartsOption } from 'echarts'
export default defineComponent({
  props: {
    roseData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  components: {
    BaseEchart
  },
  setup(props) {
    const option = computed<EChartsOption>(() => ({
      // legend: {
      //   top: 'bottom'
      // },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: '类别数据',
          type: 'pie',
          radius: [10, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: props.roseData
        }
      ]
    }))
    return {
      option
    }
  }
})
</script>

<style scoped>
</style>
