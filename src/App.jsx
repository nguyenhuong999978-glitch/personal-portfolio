import { useEffect, useState } from 'react'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

import { ProfileProvider } from './context/ProfileContext'

function App() {

  const [darkMode, setDarkMode] = useState(() => {
  const savedMode = localStorage.getItem('darkMode')

  return savedMode === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <ProfileProvider>
      
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Home />

      <About />

      <Skills />

      <Projects />

      <Contact />

      <Footer />

    </div>
    
    </ProfileProvider>
  )
}

export default App