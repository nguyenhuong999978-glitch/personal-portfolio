const API_URL = 'http://localhost:5000/api'

export const api = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`)

    if (!response.ok) {
      throw new Error('Không thể lấy thông tin profile')
    }

    return response.json()
  },

  getProjects: async () => {
    const response = await fetch(`${API_URL}/projects`)

    if (!response.ok) {
      throw new Error('Không thể lấy danh sách dự án')
    }

    return response.json()
  },
}