import Home from './routes/Home'
import Create from './routes/Create'
import Top from './utils/Top'
import Campaign from './routes/Campaign'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Loading from 'utils/Loading'
import { useWallet } from 'eth'
import { Toaster } from 'react-hot-toast'

function App() {
  const { loading } = useWallet()

  if (loading) return <Loading it />

  return (
    <div className="font-syne">
      <Toaster />
      <Top />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/campaigns/:address" element={<Campaign />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
