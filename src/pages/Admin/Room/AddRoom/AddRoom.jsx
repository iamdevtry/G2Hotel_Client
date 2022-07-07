import { useEffect, useState } from 'react';
import { Button, Form, Input, Tabs, InputNumber, Select } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;
const AddRoom = () => {
    let navigate = useNavigate();
    const [roomTypes, setRoomTypes] = useState([]);

    useEffect(() => {
        const getRoomType = async () => {
            try {
                const response = await G2HotelAPI.getAllRoomTypes();
                setRoomTypes(response);
            } catch {
                console.log('error');
            }
        };
        getRoomType();
    }, []);

    const handleClickUpload = () => {
        if (file.length > 0) {
            var formData = new FormData();

            for (var i = 0; i !== file.length; i++) {
                formData.append('files', file[i]);
            }
            var config = {
                method: 'post',
                url: 'https://g2hotel-api.herokuapp.com/api/room/add-multi-photo',
                data: formData,
                headers: authHeader(),
            };

            axios(config)
                .then(function (response) {
                    toast('Thêm mới thành công');
                    setTimeout(() => {
                        navigate('/admin/room-list');
                    }, 2000);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const addRoom = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/room/add-room',
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
        addRoom(values);
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
        <div className="add-room">
            <ToastContainer />
            <h2>Thêm phòng</h2>
            <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="Thông tin phòng" key="1">
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
                            label="Tên phòng"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên phòng!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã phòng"
                            name="Code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mã phòng!',
                                },
                                {
                                    max: 10,
                                    message: 'Mã phòng không được quá 10 ký tự!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="RoomTypeId"
                            label="Loại phòng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chưa chọn loại phòng',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn loại phòng" name="RoomTypeId">
                                {roomTypes.map((roomType, i) => (
                                    <Option key={i} value={roomType.id}>
                                        {roomType.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Mô tả ngắn"
                            name="ShortDescription"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả ngắn!',
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả chi tiết"
                            name="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mô tả chi tiết!',
                                },
                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng phòng"
                            name="Amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số lượng phòng!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>
                        <Form.Item
                            label="Giá phòng"
                            name="DefaultPrice"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá phòng!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>

                        <Form.Item
                            label="Giá khuyến mãi"
                            name="PromotionPrice"
                            rules={[
                                {
                                    required: false,
                                    message: 'Vui lòng nhập giá khuyến mãi!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>
                        <Form.Item
                            label="Số giường"
                            name="NumBeds"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số giường!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>
                        <Form.Item
                            label="Số người lớn"
                            name="NumAdults"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số người lớn!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>
                        <Form.Item
                            label="Số trẻ em"
                            name="NumChilds"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số trẻ em!',
                                },
                            ]}
                        >
                            <InputNumber style={{ width: '100%' }} min="0" />
                        </Form.Item>
                        <div className="buttons">
                            <div className="upload-button">
                                <Form.Item label="Hình ảnh chi tiết">
                                    <input
                                        id="files"
                                        name="files"
                                        type="file"
                                        size="1"
                                        multiple
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
                                Lưu phòng
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default AddRoom;
