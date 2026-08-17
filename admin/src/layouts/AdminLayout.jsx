import {
  DashboardOutlined,
  UserOutlined,
  CodeOutlined,
  ProjectOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Avatar,
  Breadcrumb,
  Button,
  Badge,
  Divider,
  Dropdown,
} from "antd";

import { useNavigate, useLocation } from "react-router-dom";

import { useState } from "react";

import "./AdminLayout.css";

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      type: "group",
      label: "TỔNG QUAN",
      children: [
        {
          key: "/admin",
          icon: <DashboardOutlined />,
          label: "Dashboard",
        },
      ],
    },

    {
      type: "group",
      label: "QUẢN LÝ NỘI DUNG",
      children: [
        {
          key: "/admin/profile",
          icon: <UserOutlined />,
          label: "Thông tin cá nhân",
        },
        {
          key: "/admin/skills",
          icon: <CodeOutlined />,
          label: "Kỹ năng",
        },
        {
          key: "/admin/projects",
          icon: <ProjectOutlined />,
          label: "Dự án",
        },
      ],
    },

    {
      type: "group",
      label: "HỆ THỐNG",
      children: [
        {
          key: "/admin/settings",
          icon: <SettingOutlined />,
          label: "Cài đặt",
        },
      ],
    },
  ];

  const getBreadcrumbItems = () => {
    const path = location.pathname;

    const items = [
      {
        title: "Trang chủ",
      },
    ];

    if (path === "/admin") {
      items.push({
        title: "Dashboard",
      });
    }

    if (path === "/admin/profile") {
      items.push({
        title: "Quản lý nội dung",
      });

      items.push({
        title: "Thông tin cá nhân",
      });
    }

    if (path === "/admin/skills") {
      items.push({
        title: "Quản lý nội dung",
      });

      items.push({
        title: "Kỹ năng",
      });
    }

    if (path === "/admin/projects") {
      items.push({
        title: "Quản lý nội dung",
      });

      items.push({
        title: "Dự án",
      });
    }

    if (path === "/admin/settings") {
      items.push({
        title: "Hệ thống",
      });

      items.push({
        title: "Cài đặt",
      });
    }

    return items;
  };

  const notifications = [
    {
      key: "1",
      title: "Dự án mới",
      description: "Bạn vừa thêm một dự án mới.",
      time: "Vừa xong",
    },

    {
      key: "2",
      title: "Cập nhật kỹ năng",
      description: "Danh sách kỹ năng đã được cập nhật.",
      time: "5 phút trước",
    },

    {
      key: "3",
      title: "Thông tin cá nhân",
      description: "Thông tin cá nhân đã được cập nhật.",
      time: "10 phút trước",
    },
  ];

  const notificationMenu = {
    items: notifications.map((item) => ({
      key: item.key,

      label: (
        <div
          style={{
            width: 320,
            padding: "8px 4px",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {item.title}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            {item.description}
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: 12,
            }}
          >
            {item.time}
          </div>
        </div>
      ),
    })),
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  return (
    <Layout className="admin-layout">
      {/* SIDEBAR */}

      <Sider
        width={250}
        collapsedWidth={72}
        collapsed={collapsed}
        className="admin-sider"
      >
        <div className="admin-logo">
          <div className="admin-logo-icon">P</div>

          {!collapsed && (
            <div className="admin-logo-text">
              PORTFOLIO
              <span>ADMIN</span>
            </div>
          )}
        </div>

        <Divider />

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />

        <div className="admin-sidebar-bottom">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="logout-button"
            onClick={handleLogout}
          >
            {!collapsed && "Đăng xuất"}
          </Button>
        </div>
      </Sider>

      {/* MAIN */}

      <Layout>
        {/* HEADER */}

        <Header className="admin-header">
          <div className="header-left">
            <Button
              type="text"
              className="collapse-button"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />

            <div className="header-title">Hệ thống quản trị Portfolio</div>
          </div>

          <div className="header-right">
            <Dropdown
              menu={notificationMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Badge count={notifications.length} size="small" offset={[-2, 2]}>
                <Button type="text" shape="circle" icon={<BellOutlined />} />
              </Badge>
            </Dropdown>

            <Divider type="vertical" />

            <div className="admin-user">
              <Avatar size={38} icon={<UserOutlined />} />

              <div className="admin-user-info">
                <strong>Admin</strong>

                <span>Quản trị viên</span>
              </div>
            </div>
          </div>
        </Header>

        {/* CONTENT */}

        <Content className="admin-content">
          <div className="content-wrapper">
            <Breadcrumb
              items={getBreadcrumbItems()}
              className="admin-breadcrumb"
            />

            <div className="page-content">{children}</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
