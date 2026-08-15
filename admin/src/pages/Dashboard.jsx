import { useEffect, useState } from 'react'

import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Progress,
  Tag,
  Typography,
  Space,
  Spin,
  Empty,
} from 'antd'

import {
  CodeOutlined,
  ProjectOutlined,
  TrophyOutlined,
  RiseOutlined,
} from '@ant-design/icons'


const SKILLS_API =
  'http://localhost:5000/api/skills'

const PROJECTS_API =
  'http://localhost:5000/api/projects'


const { Title, Text } = Typography


function Dashboard() {

  const [skills, setSkills] = useState([])

  const [projects, setProjects] = useState([])

  const [loading, setLoading] =
    useState(true)


  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        setLoading(true)

        const [
          skillsResponse,
          projectsResponse,
        ] = await Promise.all([
          fetch(SKILLS_API),
          fetch(PROJECTS_API),
        ])


        if (!skillsResponse.ok) {
          throw new Error(
            'Không thể lấy skills'
          )
        }


        if (!projectsResponse.ok) {
          throw new Error(
            'Không thể lấy projects'
          )
        }


        const skillsData =
          await skillsResponse.json()

        const projectsData =
          await projectsResponse.json()


        setSkills(skillsData)

        setProjects(projectsData)

      } catch (error) {

        console.error(
          'Dashboard error:',
          error
        )

      } finally {

        setLoading(false)

      }
    }


    fetchDashboardData()

  }, [])


  // =========================
  // STATISTICS
  // =========================

  const totalSkills =
    skills.length


  const totalProjects =
    projects.length


  const averageSkill =
    totalSkills > 0
      ? Math.round(
          skills.reduce(
            (total, skill) =>
              total + skill.percent,
            0
          ) / totalSkills
        )
      : 0


  const highestSkill =
    totalSkills > 0
      ? Math.max(
          ...skills.map(
            (skill) => skill.percent
          )
        )
      : 0


  // =========================
  // SKILL TABLE
  // =========================

  const skillColumns = [

    {
      title: 'Kỹ năng',

      dataIndex: 'name',

      key: 'name',

      render: (name) => (
        <Space>

          <CodeOutlined />

          <strong>
            {name}
          </strong>

        </Space>
      ),
    },


    {
      title: 'Mức độ',

      dataIndex: 'percent',

      key: 'percent',

      width: 300,

      render: (percent) => (

        <Progress
          percent={percent}
          size="small"
        />

      ),
    },


    {
      title: '%',

      dataIndex: 'percent',

      key: 'percentText',

      width: 70,

      render: (percent) => (
        <Tag color="blue">
          {percent}%
        </Tag>
      ),
    },

  ]


  // =========================
  // PROJECT TABLE
  // =========================

  const projectColumns = [

    {
      title: 'Dự án',

      dataIndex: 'name',

      key: 'name',

      render: (name) => (

        <Space>

          <ProjectOutlined />

          <strong>
            {name}
          </strong>

        </Space>

      ),
    },


    {
      title: 'Công nghệ',

      dataIndex: 'technology',

      key: 'technology',

      render: (technology = []) => (

        <Space
          wrap
          size={[4, 4]}
        >

          {technology.map(
            (tech) => (

              <Tag key={tech}>
                {tech}
              </Tag>

            )
          )}

        </Space>

      ),
    },

  ]


  if (loading) {

    return (

      <div
        style={{
          minHeight: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >

        <Spin size="large" />

      </div>

    )
  }


  return (

    <div className="dashboard-page">

      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          marginBottom: 24,
        }}
      >

        <Title
          level={2}
          style={{
            marginBottom: 4,
          }}
        >
          Dashboard
        </Title>

        <Text type="secondary">
          Tổng quan hệ thống quản trị Portfolio
        </Text>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <Row
        gutter={[
          16,
          16,
        ]}
      >

        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card>

            <Statistic
              title="Tổng dự án"
              value={totalProjects}
              prefix={
                <ProjectOutlined />
              }
              suffix="dự án"
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card>

            <Statistic
              title="Tổng kỹ năng"
              value={totalSkills}
              prefix={
                <CodeOutlined />
              }
              suffix="kỹ năng"
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card>

            <Statistic
              title="Mức kỹ năng trung bình"
              value={averageSkill}
              prefix={
                <RiseOutlined />
              }
              suffix="%"
            />

          </Card>

        </Col>


        <Col
          xs={24}
          sm={12}
          xl={6}
        >

          <Card>

            <Statistic
              title="Kỹ năng cao nhất"
              value={highestSkill}
              prefix={
                <TrophyOutlined />
              }
              suffix="%"
            />

          </Card>

        </Col>

      </Row>


      {/* =========================
          CONTENT
      ========================= */}

      <Row
        gutter={[
          16,
          16,
        ]}
        style={{
          marginTop: 16,
        }}
      >

        {/* SKILLS */}

        <Col
          xs={24}
          xl={14}
        >

          <Card
            title="Kỹ năng"
            extra={
              <Text type="secondary">
                {totalSkills} kỹ năng
              </Text>
            }
          >

            {skills.length > 0 ? (

              <Table
                rowKey="_id"
                columns={skillColumns}
                dataSource={skills}
                pagination={false}
              />

            ) : (

              <Empty
                description="Chưa có kỹ năng"
              />

            )}

          </Card>

        </Col>


        {/* PROJECTS */}

        <Col
          xs={24}
          xl={10}
        >

          <Card
            title="Dự án"
            extra={
              <Text type="secondary">
                {totalProjects} dự án
              </Text>
            }
          >

            {projects.length > 0 ? (

              <Table
                rowKey="_id"
                columns={projectColumns}
                dataSource={projects}
                pagination={false}
              />

            ) : (

              <Empty
                description="Chưa có dự án"
              />

            )}

          </Card>

        </Col>

      </Row>


      {/* =========================
          SKILL OVERVIEW
      ========================= */}

      <Card
        title="Tổng quan kỹ năng"
        style={{
          marginTop: 16,
        }}
      >

        {skills.length > 0 ? (

          <Row
            gutter={[
              24,
              20,
            ]}
          >

            {skills.map((skill) => (

              <Col
                xs={24}
                sm={12}
                lg={8}
                key={skill._id}
              >

                <div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      marginBottom: 6,
                    }}
                  >

                    <Text strong>
                      {skill.name}
                    </Text>

                    <Text>
                      {skill.percent}%
                    </Text>

                  </div>


                  <Progress
                    percent={
                      skill.percent
                    }
                    showInfo={false}
                  />

                </div>

              </Col>

            ))}

          </Row>

        ) : (

          <Empty
            description="Chưa có dữ liệu kỹ năng"
          />

        )}

      </Card>

    </div>

  )
}


export default Dashboard