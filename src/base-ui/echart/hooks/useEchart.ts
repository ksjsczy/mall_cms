import * as echart from 'echarts'
import chinaMapData from '../data/china.json'

export default function(el:HTMLElement){
  echart.registerMap('china',chinaMapData)

  const echartInstance = echart.init(el)
  const setOptions = (options: echart.EChartsOption)=>{
    echartInstance.setOption(options)
  }
  window.addEventListener('resize',()=>{
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions
  }
}
