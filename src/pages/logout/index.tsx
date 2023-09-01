import { message } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        sessionStorage.removeItem("access_token")
        sessionStorage.removeItem("refresh_token")
        message.info("退出成功，欢迎下次光临~~")
        navigate('/login')
    }, [])
    return (
        <div>Logout</div>
    )
}
