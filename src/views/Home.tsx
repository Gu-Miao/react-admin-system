import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <Link to="dashboard">dashboard</Link>
      <br />
      <Link to="about">about</Link>
    </div>
  )
}
export default Home
