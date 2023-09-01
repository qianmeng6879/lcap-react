import React, { useState } from 'react'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    SettingFilled,
    DashboardOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


const menus = [
    {
        title: "仪表盘",
        path: '/admin/dashborad',
        icon: <DashboardOutlined />,

    },
    {
        title: "系统配置",
        path: '/admin/setting/*',
        icon: <SettingFilled />,
        sub: [
            {
                title: "用户信息",
                path: '/admin/setting/user',
            },
            {
                title: "角色信息",
                path: '/admin/setting/role',
            },
            {
                title: "权限信息",
                path: '/admin/setting/permission',
            }
        ]
    },
    {
        title: "应用",
        path: '/admin/app/*',
        icon: null,
        sub: [
            {
                title: "应用列表",
                path: '/admin/app/app',
            },
            {
                title: "数据模型",
                path: '/admin/app/model',
            }
        ]
    },
    {
        title: "人事管理",
        path: '/admin/hr/*',
        icon: null,
        sub: [
            {
                title: "部门信息",
                path: '/admin/hr/department',
            },
            {
                title: "雇员信息",
                path: '/admin/hr/employee',
            }
        ]
    },
]

const items: MenuItem[] = menus.map(item => {
    // 存在子节点
    if (item.sub && item.sub.length > 0) {
        // 先获取父节点
        return getItem(item.title, item.path, item.icon, item.sub.map(subItem => getItem(subItem.title, subItem.path)))
    }
    return getItem(item.title, item.path, item.icon)
})

console.log('Menus', items)


// const items: MenuItem[] = [
//     getItem('仪表盘', '/admin/dashborad', <DashboardOutlined />),
//     getItem('系统配置', '/admin/setting/*', <SettingFilled />, [
//         getItem('用户信息', '/admin/setting/user'),
//         getItem('角色信息', '/admin/setting/role'),
//         getItem('权限信息', '/admin/setting/permission'),
//     ]),
//     getItem('应用', '/admin/app/*', null, [
//         getItem('应用列表', '/admin/app/app'),
//         getItem('数据模型', '/admin/app/model'),
//     ]),
// ]



export default function AdminMenu() {
    const navigateTo = useNavigate()
    const currentRoute = useLocation()

    const menuClickAction = (e: { key: string }) => {
        navigateTo(e.key)
    }

    let firstOpenMenu = items.filter(item => {
        if (item.children) {
            let data = item.children.find((i) => {
                return i.key === currentRoute.pathname
            })
            if (data) {
                return data.key
            } else {
                return null
            }
        }
    })
    const rootSubmenuKeys = ['/admin/setting/*', '/admin/app/*', '/admin/hr/*'];
    const [openKeys, setOpenKeys] = useState([firstOpenMenu.length > 0 ? firstOpenMenu[0].key : '']);

    const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <Menu openKeys={openKeys} onOpenChange={handleOpenChange} onClick={menuClickAction} theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} />

    )
}
