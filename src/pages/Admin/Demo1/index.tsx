import { Button } from 'antd'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Demo = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('send api')
  }, [])

  return (
    <div>
      Demo Page
      <Button onClick={() => setCount((c) => c + 1)}>{count}</Button>
      <Outlet />
    </div>
  )
}

export default Demo
