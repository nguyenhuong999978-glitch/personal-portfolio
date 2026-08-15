import { useState } from 'react'

import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
} from 'antd'

import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
} from '@ant-design/icons'

import {
  useNavigate,
} from 'react-router-dom'


const { Title, Text } =
  Typography


function Login() {

  const navigate =
    useNavigate()

  const [loading, setLoading] =
    useState(false)


  const handleLogin =
    async (values) => {

      try {

        setLoading(true)


        const response =
          await fetch(
            'http://localhost:5000/api/auth/login',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify(
                values
              ),
            }
          )


        const data =
          await response.json()


        if (!response.ok) {

          throw new Error(
            data.message ||
            'Đăng nhập thất bại'
          )
        }


        localStorage.setItem(
          'adminToken',
          data.token
        )


        localStorage.setItem(
          'adminUser',
          JSON.stringify(
            data.admin
          )
        )


        message.success(
          'Đăng nhập thành công'
        )


        navigate('/admin')

      } catch (error) {

        message.error(
          error.message
        )

      } finally {

        setLoading(false)

      }
    }


  return (

    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, #1677ff, #722ed1)',
        padding: 20,
      }}
    >

      <Card
        style={{
          width: 420,
          maxWidth: '100%',
          borderRadius: 16,
        }}
      >

        <div
          style={{
            textAlign: 'center',
            marginBottom: 30,
          }}
        >

          <div
            style={{
              width: 60,
              height: 60,
              margin: '0 auto 16px',
              borderRadius: 14,
              background: '#1677ff',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            P
          </div>


          <Title
            level={2}
            style={{
              marginBottom: 6,
            }}
          >
            Portfolio Admin
          </Title>


          <Text type="secondary">
            Đăng nhập vào hệ thống quản trị
          </Text>

        </div>


        <Form
          layout="vertical"
          onFinish={handleLogin}
          size="large"
        >

          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập tên đăng nhập',
              },
            ]}
          >

            <Input
              prefix={
                <UserOutlined />
              }
              placeholder="Nhập username"
            />

          </Form.Item>


          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message:
                  'Vui lòng nhập mật khẩu',
              },
            ]}
          >

            <Input.Password
              prefix={
                <LockOutlined />
              }
              placeholder="Nhập mật khẩu"
            />

          </Form.Item>


          <Form.Item
            style={{
              marginBottom: 0,
              marginTop: 30,
            }}
          >

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={
                <LoginOutlined />
              }
            >
              Đăng nhập
            </Button>

          </Form.Item>

        </Form>

      </Card>

    </div>
  )
}


export default Login