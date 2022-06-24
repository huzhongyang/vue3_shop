<script setup lang="ts">
  import { LineChart, PieChart } from "echarts/charts"
  import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from "echarts/components"
  import { use } from "echarts/core"
  import { CanvasRenderer } from "echarts/renderers"
  import VChart from "vue-echarts"
  import { getReports } from '../api/reports'

  use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    LineChart
  ])

  const option = ref()

  const a = await getReports()
  const b = {
    title: {
      text: '用户来源'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#E9EEF3'
        }
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
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ]
  }
  option.value = { ...b, ...a }
</script>

<template>
  <!-- 导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card style="margin-top: 10px">
    <v-chart style="height: 400px;" :option="option" />
  </el-card>
</template>

<style scoped>

</style>
