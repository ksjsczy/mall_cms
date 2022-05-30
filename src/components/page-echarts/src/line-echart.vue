<template>
  <div>
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue'
import { EChartsOption } from 'echarts'

export default defineComponent({
  props: {
    title: {
      type: String
    },
    xLabels: {
      type: Array as PropType<string[]>
    },
    values: {
      type: Array as PropType<any[]>
    }
  },
  setup(props) {
    const option = computed<EChartsOption>(() => {
      return {
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.xLabels
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '分类销量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.values
          }
        ]
      }
    })
    return {
      option
    };
  },
  components: { BaseEchart }
})
</script>

<style scoped>
</style>
