import StreamingLog from 'components/StreamingLog'

const Home = () => {
  return (
    <>
      <StreamingLog title="实验一：拥塞模拟" desc="1 executor (1 core), 90000 records/s" dataUrl="/data/single3w.json" />
      <StreamingLog
        title="实验二：同构并行"
        desc="3 executor (1 core, 2.0GHz), 90000 records/s"
        dataUrl="/data/cluster-p3-2GHz.json"
        cores={3}
      />
      <StreamingLog
        title="实验三：异构并行"
        desc="3 executor (1 core, 2.4GHz, 2.0GHz, 1.6GHz), 90000 records/s"
        dataUrl="/data/cluster-p3-d88.json"
        cores={3}
      />
      <StreamingLog
        title="实验四：同构并行，超负荷"
        desc="3 executor (1 core, 2.0GHz), 并行度 2， 200000 records/s"
        dataUrl="/data/cluster-p2-2GHz.json"
        cores={3}
      />
      {/* <StreamingLog
        title="实验四：异构并行，细粒度分区"
        desc="2 executor (1 core, 2.4GHz), 1 executor (1 core, 1.2GHz), 90000 records/s, 30 partitions"
        dataUrl="/data/cluster-p30-042703.json"
        cores={3}
      />
      <StreamingLog
        title="实验五：异构并行，细粒度分区，双核"
        desc="2 executor (1 core, 2.4GHz), 1 executor (1 core, 1.2GHz), 90000 records/s, 30 partitions"
        dataUrl="/data/cluster-p30-core2.json"
        cores={3}
      /> */}
    </>
  )
}

export default Home
