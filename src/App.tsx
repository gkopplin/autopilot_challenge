import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/autopilot_challenge" element={<Onboarding />} />
        <Route path="/autopilot_challenge/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}
