import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Gantt, { GanttDataProps } from 'components/Charts/Gantt'
import ReactEcharts from 'echarts-for-react'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const Styles: { [key: string]: { [key: string]: any } } = {
  Batch: {
    color: '#faea91',
    borderColor: '#ccae04'
    // borderType: 'solid'
  },
  Job: {
    color: '#f2960c',
    borderColor: '#ba6214'
  },
  Stage: {
    color: '#87dade',
    borderColor: '#078082'
  },
  Task: {
    color: '#0ca9f2',
    borderColor: '#060b63'
  }
}

const getCaterories = (cores: number) => {
  const tasks =
    cores === 1
      ? ['Tasks']
      : Array(cores)
          .fill('Tasks-E')
          .map((str, i) => `${str}${i}`)
  return [...tasks, 'Stages', 'Jobs', 'Batches']
}

const StreamingLog = (props: { dataUrl: string; cores?: number; title?: string; desc?: string }) => {
  const [data, setData] = useState<GanttDataProps[]>()
  const [startTime, setStartTime] = useState<number>(0)
  const [delayData, setDelayData] = useState<number[]>()
  const [processingData, setProcessingData] = useState<number[]>()
  const [deserializeData, setDeserializeData] = useState<number[]>()
  const { title, desc } = props

  const cores = useMemo(() => props.cores || 1, [props.cores])
  const categories = useMemo(() => {
    const cats = getCaterories(cores)
    console.log(cats)
    return cats
  }, [cores])

  const getData = useCallback(async () => {
    // const url = '/data/1734.json'
    const text = await fetch(props.dataUrl).then((response: Response) => response.text())
    const splits = text.split(/(?<=})\r?\n(?={)/g)

    const Jobs: { [key: number]: any } = {}
    const Stages: { [key: number]: any } = {}
    const Tasks: { [key: number]: any } = {}
    let startTime = 0
    const BATCH_INTERVAL = 1000
    const StageToJob: any = {}

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
            batch: +json['Properties']['spark.streaming.internal.batchTime']
          }
          json['Stage IDs'].forEach((id: number) => (StageToJob[id] = json['Job ID']))
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
            end: json['Task Info']['Finish Time'],
            executorId: json['Task Info']['Executor ID'],
            stage: json['Stage ID'],
            ds_time: json['Task Metrics']['Executor Deserialize Time']
          }

          break
        }
      }
    })

    const generateData = (obj: any, name: string, index: number) => {
      Object.keys(obj).forEach((key: any) => {
        const { start = 0, end = 0, executorId } = obj[key]
        const idx: number = +executorId || index

        if (obj[key].ds_time) {
          deserializeData[StageToJob[obj[key].stage]] += obj[key].ds_time
        }

        if (obj[key].batch) {
          delayData[key] = obj[key].end - obj[key].batch + BATCH_INTERVAL
          processingData[key] = obj[key].end - obj[key].start
          data.push({
            name: `Batch${key}`,
            value: [idx + 1, obj[key].batch - BATCH_INTERVAL, obj[key].batch, BATCH_INTERVAL],
            itemStyle: {
              normal: Styles.Batch
            }
          })
        }
        data.push({
          name: `${name}${key}`,
          value: [idx, start, end, end - start],
          desc: obj[key].stage || obj[key].stage === 0 ? `Stage:${obj[key].stage}` : '',
          itemStyle: {
            normal: Styles[name]
          }
        })
      })
    }

    const data: GanttDataProps[] = []
    const delayData: number[] = Array(Object.keys(Jobs).length).fill(0)
    const processingData: number[] = Array(Object.keys(Jobs).length).fill(0)
    const deserializeData: number[] = Array(Object.keys(Jobs).length).fill(0)

    generateData(Jobs, 'Job', cores + 1)
    generateData(Stages, 'Stage', cores)
    generateData(Tasks, 'Task', 0)

    setStartTime(startTime)
    setData(data)
    setDelayData(delayData)
    setProcessingData(processingData)
    setDeserializeData(deserializeData)
  }, [props.dataUrl])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Typography>
      {title && <Title>{title}</Title>}
      {desc && <Paragraph>{desc}</Paragraph>}
      {data && <Gantt data={data} categories={categories} min={startTime} />}
      {processingData && (
        <ReactEcharts
          option={{
            title: {
              text: 'Spark Streaming Processing Time',
              left: 'center'
            },
            tooltip: {
              show: true
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: processingData,
                type: 'line'
              },
              {
                data: deserializeData,
                type: 'line'
              }
            ]
          }}
        />
      )}
      {delayData && (
        <ReactEcharts
          option={{
            title: {
              text: 'Spark Streaming Total Delay',
              left: 'center'
            },
            tooltip: {
              show: true
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
    </Typography>
  )
}

export default StreamingLog
