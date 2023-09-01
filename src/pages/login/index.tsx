import { Button, Checkbox, Divider, Form, Input, Space, message } from 'antd'
import { LockOutlined, SecurityScanOutlined, UserOutlined } from '@ant-design/icons'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTokenApi, verifyTokenApi } from '@/api'
import { v4 } from 'uuid'
import { remoteUrl } from '@/utils/request'
export default function Login() {



  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState('')
  const currentRoute = useLocation()
  const navigate = useNavigate()



  const access_token = sessionStorage.getItem("access_token") || localStorage.getItem("access_token") || null
  if (access_token) {
    verifyTokenApi(access_token).then(
      () => {
        navigate(new URLSearchParams(currentRoute.search).get("next") || '/')
      }
    )
  }

  // return <Navigate to='/' />

  const loginAction = (values: { username: string, password: string, remember: boolean, code: string }) => {
    setLoading(true)
    getTokenApi({
      username: values.username,
      password: values.password,
      flag: flag,
      code: values.code
    }).then(
      response => {
        let accessToken = response.access_token
        let refreshToken = response.refresh_token
        sessionStorage.setItem("access_token", accessToken)
        sessionStorage.setItem("refresh_token", refreshToken)
        if (values.remember) {
          localStorage.setItem("access_token", accessToken)
          localStorage.setItem("refresh_token", refreshToken)
        }

        message.success("登录成功，正在跳转...")
        setTimeout(() => {
          // 重定向
          const msg = new URLSearchParams(currentRoute.search)
          navigate(msg.get("next") || "/")
        }, 500);
      }
    ).catch(error => {
      setFlag(v4())
    }).finally(() => setLoading(false))
  }

  const changeCodeAction = () => {
    const currnetFlag = v4()
    setFlag(currnetFlag)
  }

  useEffect(() => {
    changeCodeAction()
  }, [])
  return (
    <div className='login'>

      <Form
        name="normal_login"
        className="form"
        initialValues={{ remember: false }}
        onFinish={loginAction}
      >
        <h3 className='title'>用户登录</h3>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input autoComplete='off' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input autoComplete='off'
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item name="code" rules={[{ required: true, message: '请输入验证码！' }]}>
          <div style={{ display: "flex" }} >
            <Input autoComplete='off' prefix={<SecurityScanOutlined />} placeholder='验证码' />
            {
              flag && <img onClick={changeCodeAction} className='image_code' src={`${remoteUrl}/code/image/?flag=${flag}`} />
            }
          </div>

        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Link to={'/forgot_password'} className="login-form-forgot">忘记密码</Link>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="">现在去注册</a>
        </Form.Item>
        <Divider />
        <Space>
          <a href="">
            QQ
          </a>
          <a href="">
            QQ
          </a>
          <a href="">
            QQ
          </a>
        </Space>
      </Form>
    </div >
  )
}
