import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

function Contact() {
   const {
    profile,
    loading,
    error,
  } = useProfile()

  if (loading) {
  return (
    <section className="contact" id="contact">
      <p>Đang tải thông tin...</p>
    </section>
  )
}

if (error) {
  return (
    <section className="contact" id="contact">
      <p>{error}</p>
    </section>
  )
}

if (!profile) {
  return null
}

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(form)

    alert('Cảm ơn bạn đã liên hệ!')
  }

  return (
    <section className="contact" id="contact">

      <div className="section-title">
        <p>LIÊN HỆ</p>
        <h2>Hãy liên hệ với tôi</h2>
      </div>

      <div className="contact-container">

        <div className="contact-info">

          <h3>Thông tin liên hệ</h3>

          <p>
            Nếu bạn muốn trao đổi về công việc hoặc một dự án,
            hãy liên hệ với tôi.
          </p>

          <div className="contact-item">
            <strong>Email</strong>
            <span>{profile.email}</span>
          </div>

          <div className="contact-item">
            <strong>Điện thoại</strong>
            <span>{profile.phone}</span>
          </div>

          <div className="contact-item">
            <strong>Địa chỉ</strong>
            <span>{profile.location}</span>
          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Họ tên</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nhập họ tên"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Nhập email"
            />
          </div>

          <div className="form-group">
            <label>Nội dung</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Nhập nội dung"
              rows="5"
            ></textarea>
          </div>

          <button type="submit">
            Gửi tin nhắn
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact