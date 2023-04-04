import StreamingLog from 'components/StreamingLog'

const Home = () => {
  return (
    <>
      <StreamingLog dataUrl="/data/1734.json" />
      <StreamingLog dataUrl="/data/cluster1728.json" cores={2} />
    </>
  )
}

export default Home
