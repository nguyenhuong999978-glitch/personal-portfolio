import { useEffect, useState } from "react";

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
  Upload,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const API_URL = "http://localhost:5000/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  // =========================
  // GET PROJECTS
  // =========================

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách dự án");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error(error);

      message.error("Không thể tải danh sách dự án");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // ADD
  // =========================

  const handleAdd = () => {
    setEditingProject(null);

    form.resetFields();

    form.setFieldsValue({
      technology: "",
      demo: "#",
      github: "",
      image: [],
    });

    setModalOpen(true);
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (project) => {
    setEditingProject(project);

    const imageFileList = project.image
      ? [
          {
            uid: "-1",
            name: "Ảnh hiện tại",
            status: "done",
            url: `http://localhost:5000${project.image}`,
          },
        ]
      : [];

    form.setFieldsValue({
      name: project.name || "",

      description: project.description || "",

      technology: project.technology?.join(", ") || "",

      image: imageFileList,

      demo: project.demo || "#",

      github: project.github || "",
    });

    setModalOpen(true);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const technology = values.technology
        ? values.technology
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

      const formData = new FormData();

      formData.append("name", values.name);

      formData.append("description", values.description || "");

      formData.append("technology", JSON.stringify(technology));

      formData.append("demo", values.demo || "#");

      formData.append("github", values.github || "");

      // =========================
      // IMAGE
      // =========================

      const imageFile = values.image?.[0]?.originFileObj;

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // =========================
      // ADD / EDIT
      // =========================

      const isEdit = !!editingProject;

      const url = isEdit ? `${API_URL}/${editingProject._id}` : API_URL;

      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Không thể lưu dự án");
      }

      message.success(
        isEdit ? "Cập nhật dự án thành công" : "Thêm dự án thành công",
      );

      setModalOpen(false);

      setEditingProject(null);

      form.resetFields();

      fetchProjects();
    } catch (error) {
      console.error("Project submit error:", error);

      if (error.errorFields) {
        return;
      }

      message.error(error.message || "Có lỗi xảy ra");
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Không thể xóa dự án");
      }

      message.success("Xóa dự án thành công");

      fetchProjects();
    } catch (error) {
      console.error(error);

      message.error("Không thể xóa dự án");
    }
  };

  // =========================
  // TABLE
  // =========================

  const columns = [
    {
      title: "#",
      width: 60,

      render: (_, __, index) => index + 1,
    },

    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,

      render: (image) => {
        if (!image) {
          return (
            <div
              style={{
                width: 70,
                height: 50,
                background: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
              }}
            >
              —
            </div>
          );
        }

        const imageUrl = image.startsWith("http")
          ? image
          : `http://localhost:5000${image}`;

        return (
          <Image
            src={imageUrl}
            width={70}
            height={50}
            preview
            style={{
              objectFit: "cover",
              borderRadius: 6,
            }}
            fallback=""
          />
        );
      },
    },

    {
      title: "Tên dự án",

      dataIndex: "name",

      render: (name) => <strong>{name}</strong>,
    },

    {
      title: "Công nghệ",

      dataIndex: "technology",

      width: 280,

      render: (technology = []) => (
        <Space size={[4, 4]} wrap>
          {technology.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </Space>
      ),
    },

    {
      title: "Demo",

      dataIndex: "demo",

      width: 100,

      render: (demo) => {
        if (!demo || demo === "#") {
          return "-";
        }

        return (
          <a href={demo} target="_blank" rel="noreferrer">
            Xem
          </a>
        );
      },
    },

    {
      title: "GitHub",

      dataIndex: "github",

      width: 100,

      render: (github) => {
        if (!github || github === "#") {
          return "-";
        }

        return (
          <a href={github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        );
      },
    },

    {
      title: "Thao tác",

      width: 170,

      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>

          <Popconfirm
            title="Xóa dự án?"
            description={`Bạn có chắc muốn xóa "${record.name}"?`}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{
              danger: true,
            }}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const search = searchText.toLowerCase();

    const name = project.name?.toLowerCase() || "";

    const description = project.description?.toLowerCase() || "";

    const technology = project.technology?.join(" ").toLowerCase() || "";

    return (
      name.includes(search) ||
      description.includes(search) ||
      technology.includes(search)
    );
  });

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                margin: "6px 0 0",
                color: "#8c8c8c",
              }}
            >
              Quản lý các dự án trong Portfolio
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <Input
              allowClear
              placeholder="Tìm kiếm dự án..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              style={{
                width: 320,
              }}
            />
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
          dataSource={filteredProjects}
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
        title={editingProject ? "Sửa dự án" : "Thêm dự án"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingProject(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
        okText={editingProject ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên dự án"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên dự án",
              },
            ]}
          >
            <Input placeholder="Nhập tên dự án" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả dự án" />
          </Form.Item>

          <Form.Item label="Công nghệ" name="technology">
            <Input placeholder="ReactJS, NodeJS, MongoDB" />
          </Form.Item>

          <Form.Item
            label="Ảnh dự án"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }

              return e?.fileList || [];
            }}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              listType="picture-card"
              accept="image/png,image/jpeg,image/jpg,image/webp"
            >
              <div>
                <UploadOutlined />

                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Chọn ảnh
                </div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Demo" name="demo">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item label="GitHub" name="github">
            <Input placeholder="https://github.com/..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Projects;
