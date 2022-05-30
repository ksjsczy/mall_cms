<template>
  <div class="pie-echarts">
    <base-echart :option="option"></base-echart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import * as echart from 'echarts'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue';
import { IDataType } from '../types';


export default defineComponent({
  props: {
    pieData: {
      type: Array as PropType<IDataType[]>,
      required: true
    }
  },
  setup(props) {
    const option = computed<echart.EChartsOption>(() => ({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'left'
      },
      series: [
        {
          name: '分类数据',
          type: 'pie',
          radius: '50%',
          data: props.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }));
    return {
      option
    };
  },
  components: {
    BaseEchart
  }
})
</script>

<style scoped>
</style>
