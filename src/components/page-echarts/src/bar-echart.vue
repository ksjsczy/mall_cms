<template>
  <div>
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue'
import echarts, { EChartsOption, graphic } from 'echarts'


export default defineComponent({
  components: { BaseEchart },
  props: {
    xLabels: {
      type: Array as PropType<string[]>
    },
    values: {
      type: Array as PropType<any[]>
    }
  },
  setup(props) {
    const option = computed<EChartsOption>(() => ({
      xAxis: {
        data: props.xLabels,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: props.values
        }
      ]
    }))

    return { option }
  }
})
</script>

<style scoped>
</style>
