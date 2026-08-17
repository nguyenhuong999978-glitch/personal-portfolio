import { createContext, useContext, useEffect, useState } from 'react'

const ProfileContext = createContext()

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/profile'
        )

        if (!response.ok) {
          throw new Error('Không thể lấy thông tin profile')
        }

        const data = await response.json()

        setProfile(data)
      } catch (error) {
        console.error(error)

        setError('Không thể tải thông tin cá nhân')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}