import { useEffect, useState } from 'react'

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Card,
  Tag,
  Image,
} from 'antd'

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'


const API_URL =
  'http://localhost:5000/api/projects'


function Projects() {

  const [projects, setProjects] = useState([])

  const [loading, setLoading] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const [editingProject, setEditingProject] =
    useState(null)

  const [form] = Form.useForm()


  // =========================
  // GET PROJECTS
  // =========================

  const fetchProjects = async () => {

    try {

      setLoading(true)

      const response =
        await fetch(API_URL)

      if (!response.ok) {
        throw new Error(
          'Không thể lấy danh sách dự án'
        )
      }

      const data =
        await response.json()

      setProjects(data)

    } catch (error) {

      console.error(error)

      message.error(
        'Không thể tải danh sách dự án'
      )

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {
    fetchProjects()
  }, [])


  // =========================
  // ADD
  // =========================

  const handleAdd = () => {

    setEditingProject(null)

    form.resetFields()

    form.setFieldsValue({
      technology: '',
      demo: '#',
      github: '#',
    })

    setModalOpen(true)
  }


  // =========================
  // EDIT
  // =========================

  const handleEdit = (project) => {

    setEditingProject(project)

    form.setFieldsValue({
      name: project.name,
      description: project.description,
      technology:
        project.technology?.join(', ') || '',
      image: project.image,
      demo: project.demo,
      github: project.github,
    })

    setModalOpen(true)
  }


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {

    try {

      const values =
        await form.validateFields()


      const technology =
        values.technology
          ? values.technology
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean)
          : []


      const data = {
        name: values.name,
        description: values.description,
        technology,
        image: values.image || '',
        demo: values.demo || '#',
        github: values.github || '#',
      }


      const isEdit =
        !!editingProject


      const url = isEdit
        ? `${API_URL}/${editingProject._id}`
        : API_URL


      const method = isEdit
        ? 'PUT'
        : 'POST'


      const response =
        await fetch(url, {
          method,

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(data),
        })


      if (!response.ok) {
        throw new Error(
          'Không thể lưu dự án'
        )
      }


      message.success(
        isEdit
          ? 'Cập nhật dự án thành công'
          : 'Thêm dự án thành công'
      )


      setModalOpen(false)

      setEditingProject(null)

      form.resetFields()

      fetchProjects()

    } catch (error) {

      console.error(error)

      if (error.errorFields) {
        return
      }

      message.error(
        'Có lỗi xảy ra'
      )
    }
  }


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    try {

      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: 'DELETE',
          }
        )


      if (!response.ok) {
        throw new Error(
          'Không thể xóa dự án'
        )
      }


      message.success(
        'Xóa dự án thành công'
      )

      fetchProjects()

    } catch (error) {

      console.error(error)

      message.error(
        'Không thể xóa dự án'
      )
    }
  }


  // =========================
  // TABLE
  // =========================

  const columns = [

    {
      title: '#',
      width: 60,

      render: (_, __, index) =>
        index + 1,
    },


    {
      title: 'Ảnh',

      dataIndex: 'image',

      width: 100,

      render: (image) => {

        if (!image) {
          return (
            <div
              style={{
                width: 70,
                height: 50,
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              —
            </div>
          )
        }

        return (
          <Image
            src={image}
            width={70}
            height={50}
            style={{
              objectFit: 'cover',
              borderRadius: 6,
            }}
          />
        )
      },
    },


    {
      title: 'Tên dự án',

      dataIndex: 'name',

      render: (name) => (
        <strong>
          {name}
        </strong>
      ),
    },


    {
      title: 'Công nghệ',

      dataIndex: 'technology',

      width: 280,

      render: (technology = []) => (

        <Space
          size={[4, 4]}
          wrap
        >

          {technology.map((tech) => (
            <Tag key={tech}>
              {tech}
            </Tag>
          ))}

        </Space>
      ),
    },


    {
      title: 'Demo',

      dataIndex: 'demo',

      width: 100,

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


    {
      title: 'GitHub',

      dataIndex: 'github',

      width: 100,

      render: (github) => {

        if (!github || github === '#') {
          return '-'
        }

        return (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )
      },
    },


    {
      title: 'Thao tác',

      width: 170,

      render: (_, record) => (

        <Space>

          <Button
            icon={<EditOutlined />}
            onClick={() =>
              handleEdit(record)
            }
          >
            Sửa
          </Button>


          <Popconfirm
            title="Xóa dự án?"
            description={
              `Bạn có chắc muốn xóa "${record.name}"?`
            }
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{
              danger: true,
            }}
            onConfirm={() =>
              handleDelete(record._id)
            }
          >

            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Xóa
            </Button>

          </Popconfirm>

        </Space>
      ),
    },
  ]


  return (

    <div
      style={{
        padding: 24,
      }}
    >

      {/* HEADER */}

      <Card
        bordered={false}
        style={{
          marginBottom: 24,
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: 24,
              }}
            >
              Quản lý dự án
            </h1>

            <p
              style={{
                margin:
                  '6px 0 0',
                color: '#8c8c8c',
              }}
            >
              Quản lý các dự án
              trong Portfolio
            </p>

          </div>


          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm dự án
          </Button>

        </div>

      </Card>


      {/* TABLE */}

      <Card bordered={false}>

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={projects}
          loading={loading}
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            x: 1100,
          }}
        />

      </Card>


      {/* MODAL */}

      <Modal
        title={
          editingProject
            ? 'Chỉnh sửa dự án'
            : 'Thêm dự án'
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setEditingProject(null)
          form.resetFields()
        }}
        onOk={handleSubmit}
        okText={
          editingProject
            ? 'Cập nhật'
            : 'Thêm'
        }
        cancelText="Hủy"
        width={650}
        destroyOnClose
      >

        <Form
          form={form}
          layout="vertical"
          style={{
            marginTop: 20,
          }}
        >

          <Form.Item
            label="Tên dự án"
            name="name"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập tên dự án',
              },
            ]}
          >

            <Input
              size="large"
              placeholder="Ví dụ: Website bán hàng"
            />

          </Form.Item>


          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập mô tả',
              },
            ]}
          >

            <Input.TextArea
              rows={4}
              placeholder="Mô tả dự án..."
            />

          </Form.Item>


          <Form.Item
            label="Công nghệ"
            name="technology"
            extra="Nhập các công nghệ, cách nhau bằng dấu phẩy"
          >

            <Input
              placeholder="ReactJS, NodeJS, MongoDB"
            />

          </Form.Item>


          <Form.Item
            label="Ảnh dự án"
            name="image"
          >

            <Input
              placeholder="/projects/project-1.png"
            />

          </Form.Item>


          <Form.Item
            label="Link Demo"
            name="demo"
          >

            <Input
              placeholder="https://example.com"
            />

          </Form.Item>


          <Form.Item
            label="Link GitHub"
            name="github"
          >

            <Input
              placeholder="https://github.com/..."
            />

          </Form.Item>

        </Form>

      </Modal>

    </div>
  )
}


export default Projects