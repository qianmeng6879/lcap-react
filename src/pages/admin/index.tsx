import { Layout, theme } from 'antd';

import { Outlet } from 'react-router-dom'
import AdminMenu from '@/components/AdminMenu';
import AdminHeader from '@/components/AdminHeader';
import AuthRoute from '@/components/auth/AuthRoute';
const { Header, Content, Footer, Sider } = Layout;

const AdminHome: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <AuthRoute >
            <Layout className='admin' style={{ minHeight: '100vh' }}>
                <Sider breakpoint="lg"
                    collapsible >
                    <div className="demo-logo-vertical" />
                    <AdminMenu />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <AdminHeader />
                    </Header>
                    <Content style={{ margin: '12px 16px' }} className='main'>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </AuthRoute>
    );
};

export default AdminHome