import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './Layout/Layout'

function App() {

  return (

    <div className='min-h-screen'>
      <Router >
      <Layout/>
      </Router>
    </div>
  )
}

export default App
