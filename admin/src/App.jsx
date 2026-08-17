import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import AdminLayout from './layouts/AdminLayout'

import Dashboard from './pages/Dashboard'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Login from './pages/Login'

import ProtectedRoute from './components/ProtectedRoute'


function Profile() {
  return (
    <h1>
      Thông tin cá nhân
    </h1>
  )
}


function Settings() {
  return (
    <h1>
      Cài đặt
    </h1>
  )
}


function AdminPages() {

  return (
    <AdminLayout>

      <Routes>

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

        <Route
          path="skills"
          element={<Skills />}
        />

        <Route
          path="projects"
          element={<Projects />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

      </Routes>

    </AdminLayout>
  )
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================
            LOGIN
        ====================== */}

        <Route
          path="/admin/login"
          element={<Login />}
        />


        {/* =====================
            ADMIN
        ====================== */}

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPages />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}


export default App