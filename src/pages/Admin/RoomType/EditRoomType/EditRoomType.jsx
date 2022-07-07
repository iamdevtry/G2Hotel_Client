import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form, Input, Tabs, Modal, List, Skeleton, Avatar } from 'antd';
import { useParams } from 'react-router';

import axios from 'axios';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';
const { TabPane } = Tabs;
const { TextArea } = Input;
const EditRoomType = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initLoading, setInitLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageDeleted, setImageDeleted] = useState([]);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [file, setFile] = useState(null);

    //logic modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/admin/room-types-list');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //end modal

    const uploadImage = () => {
        var formData = new FormData();

        for (var i = 0; i !== file.length; i++) {
            formData.append('files', file[i]);
        }
        var config = {
            method: 'post',
            url: `https://g2hotel-api.herokuapp.com/api/roomtype/add-multi-photo/${id}`,
            data: formData,
            headers: authHeader(),
        };

        axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const updateRoomType = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'put',
            url: 'https://g2hotel-api.herokuapp.com/api/roomtype/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log('update success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        const getRoomType = async () => {
            try {
                const response = await G2HotelAPI.getRoomTypeById(id);
                setFile(response.photos[0]);
                form.setFieldsValue(response);
                setInitLoading(false);
                setData(response.photos);
                setList(response.photos);
            } catch {
                console.log('error');
            }
        };
        getRoomType();
    }, [id]);

    const onFinish = (values) => {
        updateRoomType(values);
        if (file && file.length > 0) {
            uploadImage();
            setFile(null);
        }
        if (imageDeleted.length > 0) {
            G2HotelAPI.deleteSingleImageOfRoomType(id, imageDeleted[0].id)
                .then((res) => {
                    console.log(res);
                    setImageDeleted([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        setTimeout(() => {
            showModal();
        }, 3000);
    };

    //delete image
    const deleteImage = (item) => {
        setImageDeleted([...imageDeleted, item]);

        var array = [...list];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            setInitLoading(false);
            setData(array);
            setList(array);
        }

        console.log(imageDeleted);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleFileOnChange = (e) => {
        deleteImage(file);
        let files = e.target.files;
        setFile(files);
    };

    return (
        <>
            <Modal
                title="Thành công!"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Chỉnh sửa chi tiết thành công</p>
            </Modal>
            <div className="add-room">
                <Tabs defaultActiveKey="1" type="card" size="small">
                    <TabPane tab="Chỉnh sửa thông tin phòng loại phòng" key="1">
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
                                label="Tên loại phòng"
                                name="name"
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
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô!',
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>
                            <div className="buttons">
                                <div className="upload-button">
                                    <Form.Item label="Hình ảnh chi tiết">
                                        {list.length > 0 ? (
                                            <List
                                                className="demo-loadmore-list"
                                                loading={initLoading}
                                                itemLayout="horizontal"
                                                grid={{
                                                    gutter: 16,
                                                    column: 4,
                                                }}
                                                dataSource={list}
                                                renderItem={(item) => (
                                                    <List.Item
                                                        style={{
                                                            width: '100%',
                                                            display: 'flex',
                                                        }}
                                                    >
                                                        <Skeleton
                                                            avatar
                                                            title={false}
                                                            loading={item.loading}
                                                            active
                                                        >
                                                            <List.Item.Meta
                                                                avatar={<Avatar src={item.url} />}
                                                                title={
                                                                    <a href="https://ant.design">
                                                                        {item.name?.last}
                                                                    </a>
                                                                }
                                                            />
                                                        </Skeleton>
                                                        {/* <a
                                                        key="list-loadmore-edit"
                                                        onClick={() => deleteImage(item)}
                                                    >
                                                        Xóa
                                                    </a> */}
                                                    </List.Item>
                                                )}
                                            />
                                        ) : (
                                            ''
                                        )}

                                        <input
                                            id="files"
                                            name="files"
                                            type="file"
                                            size="1"
                                            onChange={handleFileOnChange}
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
        </>
    );
};

export default EditRoomType;
