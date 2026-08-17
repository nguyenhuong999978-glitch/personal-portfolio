import skills from '../data/skills'

function Skills() {
  return (
    <section className="skills" id="skills">

      <div className="section-title">
        <p>KỸ NĂNG</p>

        <h2>Công nghệ tôi sử dụng</h2>
      </div>

      <div className="skills-container">

        {skills.map((skill) => (
          <div
            className="skill"
            key={skill.id}
          >

            <div className="skill-header">
              <span>
                {skill.name}
              </span>

              <span>
                {skill.percent}%
              </span>
            </div>

            <div className="skill-bar">

              <div
                className="skill-progress"
                style={{
                  '--skill-width': `${skill.percent}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Skills