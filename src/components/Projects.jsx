import { useEffect, useState } from 'react'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/projects'
        )

        if (!response.ok) {
          throw new Error(
            'Không thể lấy danh sách dự án'
          )
        }

        const data = await response.json()

        setProjects(data)
      } catch (error) {
        console.error(error)

        setError(
          'Không thể tải dữ liệu dự án'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  return (
    <section className="projects" id="projects">

      <div className="section-title">
        <p>DỰ ÁN</p>

        <h2>Các dự án của tôi</h2>
      </div>

      {loading && (
        <p className="projects-loading">
          Đang tải dự án...
        </p>
      )}

      {error && (
        <p className="projects-error">
          {error}
        </p>
      )}

      <div className="projects-container">

        {projects.map((project) => (
          <div
            className="project-card"
            key={project.id}
          >

            <div className="project-image">

              <img
                src={project.image}
                alt={project.name}
              />

            </div>


            <div className="project-content">

              <h3>
                {project.name}
              </h3>

              <p>
                {project.description}
              </p>


              <div className="project-technologies">

                {project.technology.map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>


              <div className="project-buttons">

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="project-demo"
                >
                  Xem Demo
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="project-github"
                >
                  GitHub
                </a>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Projects