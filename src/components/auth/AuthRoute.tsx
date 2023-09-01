import { refreshTokenApi, verifyTokenApi } from '@/api';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AuthRoute(props: { children: React.ReactElement }) {
    const navigate = useNavigate();
    const currentRoute = useLocation();
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    useEffect(() => {
        let accessToken = sessionStorage.getItem("access_token") || localStorage.getItem("access_token")
        let refreshToken = sessionStorage.getItem("refresh_token") || localStorage.getItem("refresh_token")

        if (accessToken) {
            verifyTokenApi(accessToken).then(
                response => {
                    setVerificationSuccess(response.success)
                }
            ).catch(() => navigate('/login?next=' + currentRoute.pathname))
        } else if (refreshToken) {
            refreshTokenApi(refreshToken).then(
                response => {
                    accessToken = response.access_token
                    refreshToken = response.refresh_token
                    sessionStorage.setItem("access_token", accessToken)
                    sessionStorage.setItem("refresh_token", refreshToken)
                }
            )
        } else {
            navigate("/login?next=" + currentRoute.pathname)
        }


    }, []);

    if (verificationSuccess) {
        return (
            <>
                {
                    verificationSuccess ? props.children : <div></div>
                }
            </>
        );
    }

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </div>
    )
}
