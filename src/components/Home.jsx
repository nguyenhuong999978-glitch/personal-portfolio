import avatar from '../assets/avatar.png'

import { useProfile } from '../context/ProfileContext'

function Home() {
  const { 
    profile, 
    loading,
    error, 
  } = useProfile()

  if (loading) {
    return (
      <section className="home" id="home">
        <p>Đang tải thông tin...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="home" id="home">
        <p>{error}</p>
      </section>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <section className="home" id="home">

      <div className="home-content">

        <p className="home-greeting">
          XIN CHÀO 👋
        </p>

        <h1>
          Tôi là <span>{profile.name}</span>
        </h1>

        <h2>
          {profile.job}
        </h2>

        <p className="home-description">
          {profile.description}
        </p>

        <div className="home-buttons">

          <a
            href="#projects"
            className="btn btn-primary"
          >
            Xem dự án
          </a>

          <a
            href="#contact"
            className="btn btn-secondary"
          >
            Liên hệ
          </a>

        </div>

      </div>


      <div className="home-image">

        <div className="home-image-circle">

          <img
            src={avatar}
            alt={`Ảnh đại diện của ${profile.name}`}
            className="home-avatar"
          />

        </div>

      </div>

    </section>
  )
}

export default Home