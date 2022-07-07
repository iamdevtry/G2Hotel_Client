import { PieChartOutlined, TeamOutlined, DownOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Col, Button, Modal, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import G2HotelAPI from '../../api/G2HotelAPI';
import AuthService from '../../Services/Auth/auth-service';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link to="/admin">Trang chính</Link>, '1', <PieChartOutlined />),
    getItem(
        <Link to="info-payment">Thông tin đặt phòng</Link>,
        '2',
        <i className="fas fa-tasks"></i>
    ),
    getItem('Quản lý phòng', 'sub1', <i className="fas fa-bed"></i>, [
        getItem(<Link to="room-list">Danh sách phòng</Link>, '3'),
        getItem(<Link to="add-room">Thêm phòng mới</Link>, '4'),
    ]),
    getItem('Quản lý dịch vụ', 'sub2', <i className="fas fa-concierge-bell"></i>, [
        getItem(<Link to="service-list">Danh sách dịch vụ</Link>, '5'),
        getItem(<Link to="add-service">Thêm dịch vụ</Link>, '6'),
    ]),
    getItem('Quản lý loại phòng', 'sub3', <i className="fas fa-door-open"></i>, [
        getItem(<Link to="room-types-list">Danh sách loại phòng</Link>, '7'),
        getItem(<Link to="add-room-type">Thêm loại phòng</Link>, '8'),
    ]),
];

const fullItems = [
    getItem(<Link to="/admin">Trang chính</Link>, '1', <PieChartOutlined />),
    getItem(
        <Link to="info-payment">Thông tin đặt phòng</Link>,
        '2',
        <i className="fas fa-tasks"></i>
    ),
    getItem('Quản lý phòng', 'sub1', <i className="fas fa-bed"></i>, [
        getItem(<Link to="room-list">Danh sách phòng</Link>, '3'),
        getItem(<Link to="add-room">Thêm phòng mới</Link>, '4'),
    ]),
    getItem('Quản lý dịch vụ', 'sub2', <i className="fas fa-concierge-bell"></i>, [
        getItem(<Link to="service-list">Danh sách dịch vụ</Link>, '5'),
        getItem(<Link to="add-service">Thêm dịch vụ</Link>, '6'),
    ]),
    getItem('Quản lý loại phòng', 'sub3', <i className="fas fa-door-open"></i>, [
        getItem(<Link to="room-types-list">Danh sách loại phòng</Link>, '7'),
        getItem(<Link to="add-room-type">Thêm loại phòng</Link>, '8'),
    ]),
    getItem('Quản lý người dùng', 'sub4', <TeamOutlined />, [
        getItem(<Link to="user-list">Danh sách người dùng</Link>, '9'),
        getItem(<Link to="add-user">Thêm người dùng</Link>, '10'),
    ]),
];

//Get detail user in localStorage
const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

const getDetailUser = () => {
    const user = getUser();
    if (user) {
        return AuthService.getDetailUser(user.token);
    }
    return null;
};

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
};

const Admin = () => {
    const [user, setUser] = useState(getUser());
    const [roles, setRoles] = useState(getDetailUser()?.role);
    const [collapsed, setCollapsed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    //form change password
    const onFinishChangePassword = (values) => {
        setErrorMessage([]);
        values.username = user.username;
        G2HotelAPI.changePassword(values)
            .then((res) => {
                if (res.status === 204) {
                    toast.success('Đổi mật khẩu thành công');
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setVisible(false);
                    }, 2000);
                } else {
                    toast.error('Đổi mật khẩu thất bại');
                }
            })
            .catch((err) => {
                setErrorMessage(err.response.data[0].description);
                toast.error('Đổi mật khẩu thất bại');
            });
    };

    const onFinishFailedChangePassword = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //modal change password
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setVisible(false);
        }, 3000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //menu user
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <Link to={`/admin/personal-information/${getDetailUser()?.unique_name}`}>
                            Chỉnh sửa thông tin
                        </Link>
                    ),
                    key: '0',
                },
                {
                    label: (
                        <a href="#" onClick={showModal}>
                            Đổi mật khẩu
                        </a>
                    ),
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: (
                        <a href="#" onClick={logout}>
                            Đăng xuất
                        </a>
                    ),
                    key: '3',
                },
            ]}
        />
    );

    //check role of user, return true if user has admin role in roles
    const isAdmin = () => {
        if (roles) {
            return roles.includes('Admin') || roles.includes('Moderator');
        }
        return false;
    };

    return (
        <>
            {!user ? (
                <Navigate to="/login" replace={true} />
            ) : (
                <Layout
                    style={{
                        minHeight: '100vh',
                    }}
                >
                    <Sider
                        width={250}
                        breakpoint="lg"
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            items={isAdmin() ? fullItems : items}
                        />
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                            style={{
                                padding: 0,
                                backgroundColor: '#fff',
                            }}
                        >
                            <Col span={6} offset={20}>
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a
                                        onClick={(e) => e.preventDefault()}
                                        style={{ color: 'Highlight' }}
                                    >
                                        <span style={{ color: '#000' }}>Xin chào...</span> &nbsp;
                                        <Space>
                                            {user.username}
                                            <DownOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Col>
                        </Header>
                        <Content
                            style={{
                                margin: '0 16px',
                            }}
                        >
                            <div
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    minHeight: 360,
                                }}
                            >
                                <Outlet />
                            </div>
                        </Content>
                        <Footer
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <a href="https://devtry.net" style={{ color: 'blue' }}>
                                Devtry
                            </a>{' '}
                            ©2022 Created by Devtry
                        </Footer>
                        <Modal
                            visible={visible}
                            title="Đổi mật khẩu"
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                                <Button key="back" onClick={handleCancel}>
                                    Hủy
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    onSubmit={onFinishChangePassword}
                                    form="change-password"
                                >
                                    Xác nhận
                                </Button>,
                            ]}
                        >
                            <Form
                                name="change-password"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                onFinish={onFinishChangePassword}
                                onFinishFailed={onFinishFailedChangePassword}
                            >
                                <Form.Item
                                    label="Mật khẩu hiện tại"
                                    name="CurrentPassword"
                                    rules={[
                                        { required: true, message: 'Please input your password!' },
                                    ]}
                                    labelCol={{
                                        span: 8,
                                    }}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="NewPassword"
                                    rules={[
                                        { required: true, message: 'Please input your password!' },
                                    ]}
                                    labelCol={{
                                        span: 8,
                                    }}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="ConfirmNewPassword"
                                    label="Xác nhận mật khẩu"
                                    dependencies={['NewPassword']}
                                    hasFeedback
                                    labelCol={{
                                        span: 8,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue('NewPassword') === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'The two passwords that you entered do not match!'
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                {errorMessage && <Text type="danger">{errorMessage}</Text>}
                            </Form>
                        </Modal>
                        <ToastContainer />
                    </Layout>
                </Layout>
            )}
        </>
    );
};
export default Admin;
