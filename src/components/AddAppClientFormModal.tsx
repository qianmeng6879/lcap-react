import { Button, Form, Input, Modal, Select, Switch, message, notification } from 'antd';
import { useState } from 'react'
import FileUpload from './FileUpload';
import { remoteUrl } from '@/utils/request';
import { addAppClientApi } from '@/api';

export default function AddAppClientFormModal(props: { addAction: Function }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filename, setFilename] = useState("")
    const [form] = Form.useForm();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const formFinish = (data: any) => {
        addAppClientApi({
            ...data,
            picture: filename
        }).then(
            data => {
                notification.success({
                    message: "创建应用成功"
                })
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 50);
                props.addAction(data)
            }
        )
    }

    const fileUploadSuccess = (data: any) => {
        console.log(data)
        setFilename(data.filename)
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>创建应用</Button>
            <div>
                <Modal closable={false} maskClosable={false} destroyOnClose title="创建应用" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Form initialValues={{
                        app_type: 'common',
                        is_public: true
                    }} onFinish={formFinish} form={form}>
                        <Form.Item label='应用名称' name="name">
                            <Input autoComplete='off' />
                        </Form.Item>
                        <Form.Item label='应用编号' name='code'>
                            <Input autoComplete='off' />
                        </Form.Item>
                        <Form.Item label='公共应用' name='is_public' valuePropName='checked'>
                            <Switch />
                        </Form.Item>
                        <Form.Item label='应用类型' name='app_type'>
                            <Select>
                                <Select.Option value='common'>普通应用</Select.Option>
                                <Select.Option value='request'>请求处理</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='应用简介' name="notes">
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item label='Logo图片'>
                            <FileUpload successHandle={fileUploadSuccess} accessToken={sessionStorage.getItem("access_token") || localStorage.getItem("access_token") || ""} isUpload={true} uploadUrl={remoteUrl + '/file/upload/image/'} prefix='app' />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>确认</Button>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}