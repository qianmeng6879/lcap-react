import { getUserinfoApi } from '@/api'
import routes from '@/router'
import { message } from 'antd'
import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'


const ToLogin = () => {
    const currentRoute = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        message.warning("请先登录！！")
        navigate("/login?next=" + currentRoute.pathname)
    }, [])

    return <div></div>
}

export default function BeforeRouterEnter(props: any) {
    const currentRoute = useLocation()
    const navigate = useNavigate()
    const nextUrl = new URLSearchParams(currentRoute.search).get("next") || '/'
    const token = sessionStorage.getItem("access_token") || localStorage.getItem("access_token")

    if (token) {
        // token可以正常使用
    }

    if (!token) {
        return (
            <ToLogin />
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}
