import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

function Navbar({ darkMode, setDarkMode }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const {
    profile,
    loading,
    error,
  } = useProfile()

  if (loading) {
  return (
      <section className="navbar" id="navbar">
        <p>Đang tải thông tin...</p>
      </section>
    )
  }

  if (error || !profile) {
    return null
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <a
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
        >
          {profile.name}
        </a>


        <div className="navbar-actions">

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Đổi giao diện"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>


          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>


        <ul
          className={`navbar-menu ${
            menuOpen ? 'active' : ''
          }`}
        >

          <li>
            <a href="#home" onClick={closeMenu}>
              Trang chủ
            </a>
          </li>

          <li>
            <a href="#about" onClick={closeMenu}>
              Giới thiệu
            </a>
          </li>

          <li>
            <a href="#skills" onClick={closeMenu}>
              Kỹ năng
            </a>
          </li>

          <li>
            <a href="#projects" onClick={closeMenu}>
              Dự án
            </a>
          </li>

          <li>
            <a href="#contact" onClick={closeMenu}>
              Liên hệ
            </a>
          </li>

        </ul>

      </div>

    </nav>
  )
}

export default Navbar