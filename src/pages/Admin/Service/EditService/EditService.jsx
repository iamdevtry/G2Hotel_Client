import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, Input, Tabs, Modal, InputNumber } from 'antd';
import { useParams } from 'react-router';
import axios from 'axios';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';
const { TabPane } = Tabs;
const EditService = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initLoading, setInitLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);

    //logic modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/admin/service-list');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //end modal

    const updateService = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'put',
            url: 'https://g2hotel-api.herokuapp.com/api/service/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log('success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        const getInfoService = async () => {
            try {
                const response = await G2HotelAPI.getServicesById(id);
                form.setFieldsValue(response);
                setInitLoading(false);
            } catch {
                console.log('error');
            }
        };
        getInfoService();
    }, [id]);

    const onFinish = (values) => {
        updateService(values);
        setTimeout(() => {
            showModal();
        }, 2000);
        // console.log(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Modal
                title="Thành công!"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <p>Chỉnh sửa chi tiết thành công</p>
            </Modal>
            <div className="edit-user">
                <Tabs defaultActiveKey="1" type="card" size="small">
                    <TabPane tab="Chỉnh sửa thông tin dịch vụ" key="1">
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
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item label="Id" name="id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tên dịch vụ"
                                name="name"
                                rules={[
                                    {
                                        type: 'text',
                                        required: true,
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

export default EditService;
