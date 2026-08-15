import aboutImage from '../assets/avatar.png'
import { useEffect, useState } from 'react'
import { useProfile } from '../context/ProfileContext'

function About() {
  const {
    profile,
    loading,
    error,
  } = useProfile()

  if (loading) {
    return (
      <section className="about" id="about">
        <p className="about-loading">
          Đang tải thông tin...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="about" id="about">
        <p className="about-error">
          {error}
        </p>
      </section>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <section className="about" id="about">

      <div className="section-title">
        <p>GIỚI THIỆU</p>
        <h2>Về tôi</h2>
      </div>

      <div className="about-content">

        <div className="about-image">
          <img
            src={aboutImage}
            alt={`Ảnh của ${profile.name}`}
            className="about-image-real"
        />
        </div>

        <div className="about-info">

          <h3>Xin chào, tôi là {profile.name}</h3>

          <p>
            {profile.description}
          </p>
            
          <p>
            {profile.about}
          </p>

          <div className="about-details">

            <div>
              <strong>Họ tên:</strong>
              <span>{profile.name}</span>
            </div>

            <div>
              <strong>Email:</strong>
              <span>{profile.email}</span>
            </div>

            <div>
              <strong>Địa chỉ:</strong>
              <span>{profile.location}</span>
            </div>

            <div>
              <strong>Kinh nghiệm:</strong>
              <span>{profile.experience}</span>
            </div>

          </div>

          <button className="cv-button">
            Tải CV
          </button>

        </div>

      </div>

    </section>
  )
}

export default About