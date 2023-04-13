import StreamingLog from 'components/StreamingLog'

const Home = () => {
  return (
    <>
      <StreamingLog title="实验一：拥塞模拟" desc="1 executor (1 core), 90000 records/s" dataUrl="/data/single3w.json" />
      <StreamingLog title="实验二：同构并行" desc="3 executor (1 core), 90000 records/s" dataUrl="/data/cluster0412.json" cores={3} />
      <StreamingLog
        title="实验三：异构并行"
        desc="2 executor (1 core, 2.4GHz), 1 executor (1 core, 1.2GHz), 90000 records/s"
        dataUrl="/data/cluster242412.json"
        cores={3}
      />
    </>
  )
}

export default Home
