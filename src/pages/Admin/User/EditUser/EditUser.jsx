import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, Input, Tabs, Modal, Select } from 'antd';
import { useParams } from 'react-router';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditUser.css';
const { TabPane } = Tabs;
const { Option } = Select;
const EditUser = () => {
    const { username } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initLoading, setInitLoading] = useState(true);
    const [infoUser, setUserInfo] = useState({});
    const [dob, setDob] = useState(new Date());
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

    const updateUser = (params) => {
        let data = JSON.stringify(params);
        let config = {
            method: 'put',
            url: 'https://g2hotel-api.herokuapp.com/api/user/',
            headers: {
                Authorization: authHeader().Authorization,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then((response) => {
                toast('Chỉnh sửa người dùng thành công');
                setTimeout(() => {
                    navigate('/admin/user-list');
                }, 2000);
            })
            .catch((error) => {
                // console.log(error);
                toast.error('Chỉnh sửa người dùng thất bại. Lỗi: ' + error.response.data.title);
            });
    };

    useEffect(() => {
        const getInfoUser = async () => {
            try {
                const response = await G2HotelAPI.getUserByUsername(username);
                form.setFieldsValue(response);
                setDob(new Date(response.dateOfBirth));
                setUserInfo(response);
                setInitLoading(false);
            } catch {
                console.log('error');
            }
        };
        getInfoUser();
    }, [username]);

    const onFinishInfoRoom = (values) => {
        values.dateOfBirth = dob.toISOString();
        updateUser(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="edit-user">
                <ToastContainer />
                <Tabs defaultActiveKey="1" type="card" size="small">
                    <TabPane tab="Chỉnh sửa thông tin người dùng" key="1">
                        <Form
                            form={form}
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
                            onFinish={onFinishInfoRoom}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Tên tài khoản" name="username">
                                <Input disabled style={{ backgroundColor: 'white' }} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                        message: 'Vui lòng nhập email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Ngày sinh">
                                <DatePicker
                                    className="dob-user__date-picker"
                                    name="dateOfBirth"
                                    onChange={setDob}
                                    value={dob}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                        type: 'phone',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="male">Nam</Option>
                                    <Option value="female">Nữ</Option>
                                    <Option value="other">Khác</Option>
                                </Select>
                            </Form.Item>
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
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn loại quyền hạn"
                                    name="Roles"
                                >
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
                                    Lưu chỉnh sửa
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
};

export default EditUser;
