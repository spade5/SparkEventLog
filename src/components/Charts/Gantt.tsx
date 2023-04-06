import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts/core'

function renderItem(params: any, api: any) {
  const categoryIndex = api.value(0)
  const start = api.coord([api.value(1), categoryIndex])
  const end = api.coord([api.value(2), categoryIndex])
  const height = api.size([0, 1])[1] * 0.6
  const rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  )
  return (
    rectShape && {
      type: 'rect',
      transition: ['shape'],
      shape: rectShape,
      style: api.style()
    }
  )
}

export interface GanttDataProps {
  name: string
  value: number[]
  itemStyle: {
    normal: {
      [key: string]: string
    }
  }
}

const getGanttOption = (data: GanttDataProps[], categories: string[], min = 0) => {
  return {
    tooltip: {
      formatter: function (params: any) {
        return `${params.marker}${params.name}: ${params.value[3]} ms<br />${params.value[1] - min}-${params.value[2] - min}ms`
      }
    },
    title: {
      text: 'Spark Streaming Timeline',
      left: 'center'
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'weakFilter',
        showDataShadow: false,
        top: 400,
        labelFormatter: ''
      },
      {
        type: 'inside',
        filterMode: 'weakFilter'
      }
    ],
    grid: {
      height: 300
    },
    xAxis: {
      min: min,
      scale: true,
      axisLabel: {
        formatter: function (val: number) {
          return Math.max(0, val - min) + ' ms'
        }
      }
    },
    yAxis: {
      data: categories
    },
    series: [
      {
        type: 'custom',
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.8,
          borderWidth: 1,
          borderColor: '#666'
        },
        encode: {
          x: [1, 2],
          y: 0
        },
        data: data
      }
    ]
  }
}

const GanttChart = (props: { data: GanttDataProps[]; categories: string[]; min?: number }) => {
  const { data, categories, min } = props
  return <ReactEcharts style={{ height: 500 }} option={getGanttOption(data, categories, min)} />
}

export default GanttChart
