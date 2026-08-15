import { useProfile } from '../context/ProfileContext'

function Footer() {
  const {
    profile,
    loading,
    error,
  } = useProfile()

  if (loading) {
    return null
  }

  if (error || !profile) {
    return null
  }

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-info">

          <h3>
            {profile.name}
          </h3>

          <p>
            {profile.job}
          </p>

          {profile.social && (
            <div className="footer-social">

              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              )}

              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

            </div>
          )}

        </div>

        <div className="footer-links">

          <a href="#home">
            Trang chủ
          </a>

          <a href="#about">
            Giới thiệu
          </a>

          <a href="#skills">
            Kỹ năng
          </a>

          <a href="#projects">
            Dự án
          </a>

          <a href="#contact">
            Liên hệ
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} {profile.name}.
          All rights reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer