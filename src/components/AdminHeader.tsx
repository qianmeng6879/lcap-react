import store from '@/store';
import { useSelector } from 'react-redux'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Breadcrumb } from 'antd'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserinfoApi } from '@/api';
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span>用户中心</span>
        ),
    },
    {
        key: '2',
        label: (
            <span>修改密码</span>
        )
    },
    {
        key: '3',
        danger: true,
        label: (
            <Link to='/logout'>退出账号</Link>
        ),
    },
];

const breadItems = [{
    title: '/'
},
{
    title: '用户中心'
}
]

export default function AdminHeader() {
    const state = store.getState()
    const userData = useSelector(state => state.userinfo)
    useEffect(() => {
        if (userData.id) {
            console.log(userData)
        } else {
            getUserinfoApi().then(
                data => {
                    store.dispatch({ type: "SET_USER", value: data })
                }
            )
        }
    }, [])
    return (
        <div className='header'>
            <Breadcrumb className='bread' separator=">" items={breadItems}></Breadcrumb>
            <Dropdown className="userinfo" menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <span>{state.userinfo.username}</span>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    )
}
