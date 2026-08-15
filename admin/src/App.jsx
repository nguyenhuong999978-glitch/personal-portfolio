import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'

import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

function Profile() {
  return <h1>Thông tin cá nhân</h1>
}

function Settings() {
  return <h1>Cài đặt</h1>
}

function App() {
  return (
    <BrowserRouter>

      <AdminLayout>

        <Routes>

          {/* LOGIN */}

          <Route
            path="/admin/login"
            element={<Login />}
          />

          <Route
            path="/admin"
            element={<Dashboard />}
          />

          <Route
            path="/admin/profile"
            element={<Profile />}
          />

          <Route
            path="/admin/skills"
            element={<Skills />}
          />

          <Route
            path="/admin/projects"
            element={<Projects />}
          />

          <Route
            path="/admin/settings"
            element={<Settings />}
          />

        </Routes>

      </AdminLayout>

    </BrowserRouter>
  )
}

export default App