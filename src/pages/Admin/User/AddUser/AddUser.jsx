import { Button, Form, Input, Tabs, Typography, Space, Select } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import authHeader from '../../../../Services/Auth/auth-header';
//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import G2HotelAPI from '../../../../api/G2HotelAPI';
//
const { TabPane } = Tabs;
const { Text, Link } = Typography;
const { Option } = Select;
const AddUser = () => {
    let navigate = useNavigate();
    const [validateErrorMessage, setValidateErrorMessage] = useState(null);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await G2HotelAPI.getRoles();
                setRoles(response);
            } catch {
                console.log('error');
            }
        };
        getRoles();
    }, []);

    const addNewUser = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/user/register',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                toast('Thêm mới thành công');

                // call navigate to redirect to admin/user-list after 3s
                setTimeout(() => {
                    navigate('/admin/user-list');
                }, 2000);
            })
            .catch(function (error) {
                toast.error('Thêm mới thất bại. Lỗi: ' + error.response.data);
            });
    };
    const onFinish = (values) => {
        if (!validator.isStrongPassword(values.password)) {
            setValidateErrorMessage(
                'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt và ít nhất 8 ký tự'
            );
            return;
        }
        addNewUser(values);
        setValidateErrorMessage(null);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="add-user">
            <h2>Thêm người dùng</h2>
            <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="Thông tin người dùng" key="1">
                    <Form
                        name="basic"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        {validateErrorMessage && (
                            <Space direction="vertical">
                                <Text type="danger">{validateErrorMessage}</Text>
                            </Space>
                        )}

                        <Form.Item
                            name="roles"
                            label="Quyền hạn"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa chọn quyền hạn',
                                },
                            ]}
                        >
                            <Select mode="multiple" placeholder="Chọn loại quyền hạn" name="Roles">
                                {roles.map((role, i) => (
                                    <Option key={i} value={role.name}>
                                        {role.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Thêm mới
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
            <ToastContainer />
        </div>
    );
};

export default AddUser;
