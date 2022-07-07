import { Button, Form, Input, Tabs } from 'antd';

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import authHeader from '../../../../Services/Auth/auth-header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { TabPane } = Tabs;
const { TextArea } = Input;
const AddRoomType = () => {
    let navigate = useNavigate();

    const handleClickUpload = () => {
        var formData = new FormData();

        for (var i = 0; i !== file.length; i++) {
            formData.append('file', file[i]);
        }
        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/roomtype/add-photo',
            data: formData,
            headers: authHeader(),
        };

        axios(config)
            .then(function (response) {
                toast.success('Thêm thành công');
                setTimeout(() => {
                    navigate('/admin/room-types-list');
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const addRoomType = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/roomtype/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                handleClickUpload();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onFinishInfoRoom = (values) => {
        addRoomType(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [file, setFile] = useState(null);
    const handleFileOnChange = (e) => {
        let files = e.target.files;
        setFile(files);
    };

    return (
        <div className="add-room-type">
            <ToastContainer />
            <h2>Thêm loại phòng</h2>
            <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="Thông tin loại phòng" key="1">
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
                        onFinish={onFinishInfoRoom}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên loại phòng"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên loại phòng!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Mô tả loại phòng"
                            name="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả!',
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <div className="buttons">
                            <div className="upload-button">
                                <Form.Item label="Hình ảnh chi tiết">
                                    <input
                                        id="file"
                                        name="file"
                                        type="file"
                                        size="1"
                                        onChange={handleFileOnChange}
                                        required
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu loại phòng
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AddRoomType;
