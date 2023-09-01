import { userListApi } from '@/api'
import { UserProfile } from '@/api/types'
import { Button, Form, Input, Modal, Pagination, Space, Table, notification } from 'antd'
import React, { useEffect, useState } from 'react'



function AddUserFormModal(props: { modelState: boolean, setModelState: Function, confirmAction: Function }) {
    return (
        <Modal
            open={props.modelState} closable={false} maskClosable={false} destroyOnClose
            title="新增用户"
            footer={false}>
            <Form labelCol={{ span: 4 }} labelAlign='left' onFinish={(data: any) => props.confirmAction(data)}>
                <Form.Item name='username' label="用户名">
                    <Input autoComplete='off' />
                </Form.Item>
                <Form.Item name='email' label="邮箱">
                    <Input type='email' autoComplete='off' />
                </Form.Item>
                <Form.Item name='phone' label="手机号码">
                    <Input type='phone' autoComplete='off' />
                </Form.Item>
                <Form.Item name='passwrod' label="密码">
                    <Input.Password autoComplete='off' />
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: "end" }}>
                    <Button onClick={() => { props.setModelState(false) }} style={{ marginRight: "10px" }}>取消</Button>
                    <Button htmlType='submit' type='primary'>确认</Button>
                </div>
            </Form>
        </Modal>
    )
}


type propsType = {
    create?: boolean
    delete?: boolean
}

export default function SysUserList(props: propsType) {
    const [dataSoruce, setDataSource] = useState<Array<UserProfile>>([])
    const [loading, setLoading] = useState(true)
    const [formDialogState, setFormDialogState] = useState(false)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        userListApi().then(
            res => {
                setTotal(res.count)
                setDataSource(res.results)
            }
        ).finally(() => {
            setLoading(false)
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: '操作',
            render: (row: any) => {
                return (
                    <Button>查看 - {row.id}</Button>
                )
            }
        }
    ];

    const searchByKeyword = (value: string) => {
        console.log(value)
    }

    const pageOnChange = (page: number) => {
        console.log(page)
    }

    const addUserAciotn = (data: any) => {
        console.log(data)
        setFormDialogState(false)
        setLoading(true)
        notification.success({ message: "新增用户成功" })
        userListApi().then(
            res => {
                setDataSource(res.results)
            }
        ).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div>
            <h3>用户列表</h3>
            <div className='site-header'>
                {props.create && <Button onClick={() => setFormDialogState(true)} className='site-btn' type='primary'>新增</Button>}
                {props.delete && <Button className='site-btn' type='primary' danger>删除</Button>}
                <div className='site-search'>
                    <Input.Search
                        placeholder="请输入关键词"
                        allowClear
                        enterButton="搜索"
                        onSearch={searchByKeyword}
                    />
                </div>
            </div>
            <Table pagination={false} loading={loading} dataSource={dataSoruce} columns={columns} rowKey='id' />
            <div className='site-footer'>
                <Pagination onChange={pageOnChange} defaultCurrent={1} total={total} />
            </div>
            <AddUserFormModal
                modelState={formDialogState} setModelState={(data: boolean) => { setFormDialogState(data) }}
                confirmAction={addUserAciotn}
            />
        </div>
    )
}