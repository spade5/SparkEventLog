import StreamingLog from 'components/StreamingLog'
import { useState } from 'react'
import type { UploadProps } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'

const Home = () => {
  // 上传文件并获取文本内容
  // 获取文件内容
  const [datas, setDatas] = useState<{ title: string; data: string }[]>([])

  const props: UploadProps = {
    onRemove: (file) => {
      console.log(file)
    },
    beforeUpload: (file) => {
      // 获取文件内容
      const reader = new FileReader()
      reader.readAsText(file, 'utf-8')
      reader.onload = (e) => {
        console.log(e)
        setDatas([...datas, { data: e.target?.result as string, title: file.name }])
      }

      return false
    }
  }

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
      {datas.map((data, index) => {
        return <StreamingLog key={index} title={data.title} data={data.data} />
      })}
    </>
  )
}

export default Home
