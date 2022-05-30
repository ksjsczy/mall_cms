import { IForm } from "@/base-ui/form"

export const searchFormConfig: IForm = {
  formItems: [
    {
      field:'user',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field:'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      field:'createTime',
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请输入用户名',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    },
  ]
}