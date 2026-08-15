import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'

function Dashboard() {
  return <h1>Dashboard</h1>
}

function Profile() {
  return <h1>Thông tin cá nhân</h1>
}

function Skills() {
  return <h1>Kỹ năng</h1>
}

function Projects() {
  return <h1>Dự án</h1>
}
function Settings() {
  return <h1>Cài đặt</h1>
}

function App() {
  return (
    <BrowserRouter>

      <AdminLayout>

        <Routes>

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