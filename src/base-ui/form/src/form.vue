<template>
  <div class="my-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemLayout" v-if="!item.isHidden">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder"
                          :show-password="item.type === 'password'"
                          v-bind="item.otherOptions"
                          :modelValue="(modelValue as any)[item.field]"
                          @update:modelValue="handleValueChange($event, item.field)" />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select style="width: 100%"
                           v-bind="item.otherOptions"
                           :modelValue="(modelValue as any)[item.field]"
                           @update:modelValue="handleValueChange($event, item.field)"
                           :placeholder="item.placeholder">
                  <el-option v-for="option in item.options"
                             :key="option.value"
                             :value="option.value">{{ option.title }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%"
                                v-bind="item.otherOptions"
                                :modelValue="(modelValue as any)[item.field]"
                                @update:modelValue="handleValueChange($event, item.field)"></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemLayout: {
      type: Object,
      default: () => ({ padding: "10px 40px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style scoped>
.my-form {
  padding-top: 22px;
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
