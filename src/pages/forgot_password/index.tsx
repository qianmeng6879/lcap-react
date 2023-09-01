import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { forgetPasswrodApi } from '@/api';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (values) => {
        setLoading(true)
        forgetPasswrodApi(values.email).then(
            data => {
                console.log(data)
                message.success("重置密码链接已发送至邮箱~")
            }
        ).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={24} md={12} lg={9} xl={5}>
                <h3>请输入邮箱</h3>
                <Form name="forgotPasswordForm" onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱！' },
                            { type: 'email', message: '邮箱格式错误！' }
                        ]}
                    >
                        <Input autoComplete='off' placeholder="邮箱" value={email} onChange={handleEmailChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} type="primary" htmlType="submit" block>发送链接</Button>
                    </Form.Item>
                </Form>
                <Link to='/login'>返回登录</Link>
            </Col>
        </Row>
    );
}

export default ForgotPassword;
