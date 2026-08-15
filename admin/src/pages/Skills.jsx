import { useEffect, useState } from 'react'

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Progress,
  Space,
  Popconfirm,
  message,
  Card,
  Tag,
} from 'antd'

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'


const API_URL = 'http://localhost:5000/api/skills'


function Skills() {

  const [skills, setSkills] = useState([])

  const [loading, setLoading] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)

  const [editingSkill, setEditingSkill] = useState(null)

  const [form] = Form.useForm()


  // =========================
  // GET SKILLS
  // =========================

  const fetchSkills = async () => {

    try {

      setLoading(true)

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error(
          'Không thể lấy danh sách kỹ năng'
        )
      }

      const data = await response.json()

      setSkills(data)

    } catch (error) {

      console.error(error)

      message.error(
        'Không thể tải danh sách kỹ năng'
      )

    } finally {

      setLoading(false)

    }
  }


  useEffect(() => {

    fetchSkills()

  }, [])


  // =========================
  // OPEN ADD
  // =========================

  const handleAdd = () => {

    setEditingSkill(null)

    form.resetFields()

    form.setFieldsValue({
      percent: 0,
    })

    setModalOpen(true)
  }


  // =========================
  // OPEN EDIT
  // =========================

  const handleEdit = (skill) => {

    setEditingSkill(skill)

    form.setFieldsValue({
      name: skill.name,
      percent: skill.percent,
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


      const isEdit = !!editingSkill


      const url = isEdit
        ? `${API_URL}/${editingSkill._id}`
        : API_URL


      const method = isEdit
        ? 'PUT'
        : 'POST'


      const response = await fetch(
        url,
        {
          method,

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            name: values.name,
            percent: values.percent,
          }),
        }
      )


      if (!response.ok) {
        throw new Error(
          'Không thể lưu kỹ năng'
        )
      }


      message.success(
        isEdit
          ? 'Cập nhật kỹ năng thành công'
          : 'Thêm kỹ năng thành công'
      )


      setModalOpen(false)

      form.resetFields()

      setEditingSkill(null)

      fetchSkills()

    } catch (error) {

      console.error(error)

      if (error.errorFields) {
        return
      }

      message.error(
        'Có lỗi xảy ra khi lưu kỹ năng'
      )

    }
  }


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE',
        }
      )


      if (!response.ok) {
        throw new Error(
          'Không thể xóa kỹ năng'
        )
      }


      message.success(
        'Xóa kỹ năng thành công'
      )


      fetchSkills()

    } catch (error) {

      console.error(error)

      message.error(
        'Không thể xóa kỹ năng'
      )

    }
  }


  // =========================
  // TABLE
  // =========================

  const columns = [

    {
      title: '#',

      key: 'index',

      width: 70,

      render: (_, __, index) =>
        index + 1,
    },


    {
      title: 'Tên kỹ năng',

      dataIndex: 'name',

      key: 'name',

      render: (name) => (
        <strong>
          {name}
        </strong>
      ),
    },


    {
      title: 'Mức độ',

      dataIndex: 'percent',

      key: 'percent',

      width: 300,

      render: (percent) => (

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >

          <Progress
            percent={percent}
            style={{
              flex: 1,
              margin: 0,
            }}
          />

          <Tag>
            {percent}%
          </Tag>

        </div>

      ),
    },


    {
      title: 'Thao tác',

      key: 'action',

      width: 180,

      render: (_, record) => (

        <Space>

          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() =>
              handleEdit(record)
            }
          >
            Sửa
          </Button>


          <Popconfirm
            title="Xóa kỹ năng?"
            description={`Bạn có chắc muốn xóa "${record.name}"?`}
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

      {/* =========================
          HEADER
      ========================= */}

      <Card
        bordered={false}
        style={{
          marginBottom: 24,
        }}
      >

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >

          <div>

            <h1
              style={{
                margin: 0,
                fontSize: 24,
              }}
            >
              Quản lý kỹ năng
            </h1>

            <p
              style={{
                margin: '6px 0 0',
                color: '#8c8c8c',
              }}
            >
              Quản lý các kỹ năng và mức độ thành thạo
            </p>

          </div>


          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAdd}
          >
            Thêm kỹ năng
          </Button>

        </div>

      </Card>


      {/* =========================
          TABLE
      ========================= */}

      <Card
        bordered={false}
      >

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={skills}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          scroll={{
            x: 700,
          }}
        />

      </Card>


      {/* =========================
          MODAL
      ========================= */}

      <Modal
        title={
          editingSkill
            ? 'Chỉnh sửa kỹ năng'
            : 'Thêm kỹ năng'
        }
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
          setEditingSkill(null)
          form.resetFields()
        }}
        onOk={handleSubmit}
        okText={
          editingSkill
            ? 'Cập nhật'
            : 'Thêm'
        }
        cancelText="Hủy"
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
            label="Tên kỹ năng"
            name="name"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập tên kỹ năng',
              },
            ]}
          >

            <Input
              placeholder="Ví dụ: ReactJS"
              size="large"
            />

          </Form.Item>


          <Form.Item
            label="Mức độ thành thạo"
            name="percent"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập phần trăm',
              },
            ]}
          >

            <InputNumber
              min={0}
              max={100}
              addonAfter="%"
              size="large"
              style={{
                width: '100%',
              }}
              placeholder="0 - 100"
            />

          </Form.Item>

        </Form>

      </Modal>

    </div>

  )
}

export default Skills