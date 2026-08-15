import {
  Card,
  Col,
  Row,
  Statistic,
  Table,
  Tag,
  Empty,
  Spin,
  Alert,
} from 'antd'

import {
  ProjectOutlined,
  CodeOutlined,
  UserOutlined,
} from '@ant-design/icons'

import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5000/api'

function Dashboard() {

  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true)
        setError('')

        const [
          profileResponse,
          projectsResponse,
          skillsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/profile`),
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/skills`),
        ])

        if (
          !profileResponse.ok ||
          !projectsResponse.ok ||
          !skillsResponse.ok
        ) {
          throw new Error(
            'Không thể lấy dữ liệu từ Backend'
          )
        }

        const profileData =
          await profileResponse.json()

        const projectsData =
          await projectsResponse.json()

        const skillsData =
          await skillsResponse.json()

        setProfile(profileData)
        setProjects(
          Array.isArray(projectsData)
            ? projectsData
            : []
        )

        setSkills(
          Array.isArray(skillsData)
            ? skillsData
            : []
        )

      } catch (error) {

        console.error(error)

        setError(
          error.message ||
          'Có lỗi xảy ra khi tải Dashboard'
        )

      } finally {

        setLoading(false)

      }
    }

    loadDashboard()

  }, [])

  const columns = [
    {
      title: '#',
      key: 'index',
      width: 60,
      render: (_, __, index) =>
        index + 1,
    },

    {
      title: 'Tên dự án',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Công nghệ',
      dataIndex: 'technology',
      key: 'technology',

      render: (technology) => {

        if (!Array.isArray(technology)) {
          return '-'
        }

        return (
          <>
            {technology.map((item) => (
              <Tag key={item}>
                {item}
              </Tag>
            ))}
          </>
        )
      },
    },

    {
      title: 'Demo',
      dataIndex: 'demo',
      key: 'demo',

      render: (demo) => {

        if (!demo || demo === '#') {
          return '-'
        }

        return (
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
          >
            Xem
          </a>
        )
      },
    },
  ]

  if (loading) {
    return (
      <div
        style={{
          minHeight: 300,
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

      {error && (
        <Alert
          type="error"
          showIcon
          message="Không thể tải dữ liệu"
          description={error}
          style={{
            marginBottom: 24,
          }}
        />
      )}

      {/* =========================
          TITLE
      ========================= */}

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <h1
          style={{
            marginBottom: 6,
            fontSize: 24,
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            margin: 0,
            color: '#8c8c8c',
          }}
        >
          Tổng quan hệ thống Portfolio
        </p>
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
          lg={8}
        >
          <Card>

            <Statistic
              title="Thông tin cá nhân"
              value={profile ? 1 : 0}
              prefix={<UserOutlined />}
              suffix="hồ sơ"
            />

          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>

            <Statistic
              title="Dự án"
              value={projects.length}
              prefix={<ProjectOutlined />}
              suffix="dự án"
            />

          </Card>
        </Col>


        <Col
          xs={24}
          sm={12}
          lg={8}
        >
          <Card>

            <Statistic
              title="Kỹ năng"
              value={skills.length}
              prefix={<CodeOutlined />}
              suffix="kỹ năng"
            />

          </Card>
        </Col>

      </Row>


      {/* =========================
          PROJECTS
      ========================= */}

      <Card
        title="Danh sách dự án"
        style={{
          marginTop: 24,
        }}
      >

        {projects.length > 0 ? (

          <Table
            rowKey={(record) =>
              record._id || record.id
            }
            columns={columns}
            dataSource={projects}
            pagination={{
              pageSize: 5,
            }}
            scroll={{
              x: 600,
            }}
          />

        ) : (

          <Empty
            description="Chưa có dự án"
          />

        )}

      </Card>

    </div>
  )
}

export default Dashboard