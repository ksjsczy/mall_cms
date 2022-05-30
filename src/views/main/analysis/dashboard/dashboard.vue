<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <MyCard title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </MyCard>
      </el-col>
      <el-col :span="10">
        <MyCard title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </MyCard>
      </el-col>
      <el-col :span="7">
        <MyCard title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </MyCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <MyCard title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </MyCard>
      </el-col>
      <el-col :span="12">
        <MyCard title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </MyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import MyCard from '@/base-ui/card'
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts'



export default defineComponent({
  name: "dashboard",
  components: {
    MyCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore();
    store.dispatch("dashboard/getDashboardDataAction");
    const categoryGoodsCount = computed(() => store.state.dashboard.categoryGoodsCount.map(item => {
      return { name: item.name, value: item.goodsCount }
    }))

    const categoryGoodsSale = computed(() => {
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      const xLabels: string[] = []
      const values: any[] = []
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      const xLabels: string[] = []
      const values: any[] = []
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => store.state.dashboard.addressGoodsSale.map(item => {
      return { name: item.address, value: item.count }
    }))

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    };
  },

})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
