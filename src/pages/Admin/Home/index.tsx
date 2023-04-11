import StreamingLog from 'components/StreamingLog'

const Home = () => {
  return (
    <>
      <StreamingLog dataUrl="/data/single3w.json" />
      <StreamingLog dataUrl="/data/cluster04101712.json" cores={3} />
      <StreamingLog dataUrl="/data/cluster04111559-h.json" cores={3} />
    </>
  )
}

export default Home
