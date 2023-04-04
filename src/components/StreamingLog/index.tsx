import React, { useCallback, useEffect, useState } from 'react'
import Gantt, { GanttDataProps } from 'components/Charts/Gantt'
import ReactEcharts from 'echarts-for-react'
const categories = ['Tasks', 'Stages', 'Jobs']
const types = [
  { name: 'JS Heap', color: '#7b9ce1' },
  { name: 'Documents', color: '#bd6d6c' },
  { name: 'Nodes', color: '#75d874' },
  { name: 'Listeners', color: '#e0bc78' },
  { name: 'GPU Memory', color: '#dc77dc' },
  { name: 'GPU', color: '#72b362' }
]

const StreamingLog = (props: { dataUrl: string }) => {
  const [data, setData] = useState<GanttDataProps[]>()
  const [startTime, setStartTime] = useState<number>(0)
  const [delayData, setDelayData] = useState<number[]>()

  const getData = useCallback(async () => {
    // const url = '/data/1734.json'
    const text = await fetch(props.dataUrl).then((response: Response) => response.text())
    const splits = text.split(/(?<=})\n(?={)/g)

    const Jobs: { [key: number]: any } = {}
    const Stages: { [key: number]: any } = {}
    const Tasks: { [key: number]: any } = {}
    let startTime = 0

    splits.forEach((str) => {
      const json = JSON.parse(str)
      switch (json.Event) {
        case 'SparkListenerApplicationStart': {
          startTime = json.Timestamp
          break
        }
        case 'SparkListenerJobStart': {
          Jobs[json['Job ID']] = {
            start: json['Submission Time'],
            batch: json['Properties']['spark.streaming.internal.batchTime']
          }
          break
        }
        case 'SparkListenerJobEnd': {
          Jobs[json['Job ID']].end = json['Completion Time']
          break
        }
        case 'SparkListenerStageCompleted': {
          Stages[json['Stage Info']['Stage ID']] = {
            start: json['Stage Info']['Submission Time'],
            end: json['Stage Info']['Completion Time']
          }
          break
        }
        case 'SparkListenerTaskEnd': {
          Tasks[json['Task Info']['Task ID']] = {
            start: json['Task Info']['Launch Time'],
            end: json['Task Info']['Finish Time']
          }
          break
        }
      }
    })

    const generateData = (obj: any, name: string, index: number) => {
      Object.keys(obj).forEach((key: any) => {
        const { start = 0, end = 0 } = obj[key]
        const typeItem = types[Math.round(Math.random() * (types.length - 1))]
        if (obj[key].batch) {
          delayData[key] = obj[key].end - obj[key].batch
        }
        data.push({
          name: `${name}${key}`,
          value: [index, start, end, end - start],
          itemStyle: {
            normal: {
              color: typeItem.color
            }
          }
        })
      })
    }

    const data: GanttDataProps[] = []
    const delayData: number[] = Array(Object.keys(Jobs).length).fill(0)

    generateData(Jobs, 'Job', 2)
    generateData(Stages, 'Stage', 1)
    generateData(Tasks, 'Task', 0)

    setStartTime(startTime)
    setData(data)
    setDelayData(delayData)
    console.log(delayData)
  }, [props.dataUrl])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div>
      {data && <Gantt data={data} categories={categories} min={startTime} />}
      {delayData && (
        <ReactEcharts
          option={{
            title: {
              text: 'Spark Streaming Total Delay',
              left: 'center'
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: delayData,
                type: 'line'
              }
            ]
          }}
        />
      )}
    </div>
  )
}

export default StreamingLog
