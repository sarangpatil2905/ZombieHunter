import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "@/pages/page"
import LandingLayout from "@/pages/layout"
import './index.css'

import DashboardLayout from './pages/dashboard/layout'
import DashboardPage from './pages/dashboard/page'
import AttackGraphPage from './pages/dashboard/attack-graph/page'


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Layout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="attack-graph" element={<AttackGraphPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;