import StreamingLog from 'components/StreamingLog'

const Home = () => {
  return (
    <>
      <StreamingLog dataUrl="/data/single3w.json" />
      <StreamingLog dataUrl="/data/cluster3w.json" cores={3} />
    </>
  )
}

export default Home
