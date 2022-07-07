import { Button, Form, Input, Tabs, InputNumber } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../../../Services/Auth/auth-header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TabPane } = Tabs;
const AddService = () => {
    let navigate = useNavigate();
    const addNewService = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/service',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                toast.success('Thêm thành công');
                setTimeout(() => {
                    navigate('/admin/service-list');
                }, 2000);
            })
            .catch(function (error) {
                toast.error('Thêm thất bại');
            });
    };
    const onFinish = (values) => {
        addNewService(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="add-user">
            <ToastContainer />
            <h2>Thêm dịch vụ</h2>
            <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="Thông tin dịch vụ" key="1">
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
                            label="Tên dịch vụ"
                            name="name"
                            rules={[
                                {
                                    type: 'text',
                                    required: true,
                                    message: 'Please input name of service!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Giá mặc định"
                            name="defaultPrice"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>

                        <Form.Item label="Giá khuyến mãi" name="promotionPrice">
                            <InputNumber style={{ width: '100%' }} min="0" />
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
        </div>
    );
};

export default AddService;
