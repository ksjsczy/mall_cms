<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="pageList"
              border
              style="width:100%"
              @selectionChange="handleSelectionChange"
              v-bind="childrenProps">
      <el-table-column v-if="showSelectColumn"
                       type="selection"
                       align="center"
                       width="60"></el-table-column>
      <el-table-column v-if="showIndexColumn"
                       type="index"
                       label="序号"
                       align="center"
                       width="80"></el-table-column>
      <template v-for="propitem in propList" :key="propitem.prop">
        <el-table-column v-bind="propitem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="(propitem as any).slotName" :row="scope.row">
              {{ scope.row[(propitem as any).prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination v-if="showTable"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page.currentPage"
                       :page-size="page.pageSize"
                       :page-sizes="[10, 20, 30]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pageCount">
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    pageList: {
      type: Array,
    },
    pageCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    propList: {
      type: Array,
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showTable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleSizeChange = (pageSize: number) => {
      console.log('pageSize');
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      console.log('currentPage');
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
