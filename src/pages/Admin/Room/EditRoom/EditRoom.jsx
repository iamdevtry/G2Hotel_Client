import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Tabs,
    InputNumber,
    Upload,
    Avatar,
    List,
    Skeleton,
    Modal,
} from 'antd';
import axios from 'axios';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';
const { TabPane } = Tabs;
const { TextArea } = Input;
const EditRoom = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [initLoading, setInitLoading] = useState(true);
    const [room, setRoom] = useState({});
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [file, setFile] = useState(null);
    const [imageDeleted, setImageDeleted] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    //logic modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/admin/room-list');
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
            url: `https://g2hotel-api.herokuapp.com/api/room/add-multi-photo/${id}`,
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

    const updateRoom = (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'put',
            url: 'https://g2hotel-api.herokuapp.com/api/room/',
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
        const getRoom = async () => {
            try {
                const response = await G2HotelAPI.getRoomById(id);
                form.setFieldsValue(response);
                setRoom(response);
                setInitLoading(false);
                setData(response.photos);
                setList(response.photos);
            } catch {
                console.log('error');
            }
        };
        getRoom();
    }, [id]);

    const onFinishInfoRoom = (values) => {
        updateRoom(values);
        if (imageDeleted.length > 0) {
            console.log('deleted');
            G2HotelAPI.deleteMultiImage(id, imageDeleted)
                .then((res) => {
                    console.log(res);
                    setImageDeleted([]);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (file && file.length > 0) {
            console.log('add new image');
            uploadImage();
            setFile(null);
        }

        setTimeout(() => {
            showModal();
        }, 2000);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleFileOnChange = (e) => {
        let files = e.target.files;
        setFile(files);
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

    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Thành công!" visible={isModalVisible} onOk={handleOk}>
                <p>Chỉnh sửa chi tiết thành công</p>
            </Modal>
            <div className="add-room">
                <Tabs defaultActiveKey="1" type="card" size="small">
                    <TabPane tab="Chỉnh sửa thông tin phòng" key="1">
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
                            <Form.Item label="Mã phòng" hidden name="id">
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Tên phòng"
                                name="name"
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
                                name="code"
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
                                label="Mô tả ngắn"
                                name="shortDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả ngắn!',
                                    },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả chi tiết"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả chi tiết!',
                                    },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Số lượng phòng"
                                name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số lượng phòng!',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Giá phòng"
                                name="defaultPrice"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá phòng!',
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} min="0" />
                            </Form.Item>

                            <Form.Item label="Giá khuyến mãi" name="promotionPrice">
                                <InputNumber style={{ width: '100%' }} min="0" />
                            </Form.Item>
                            <Form.Item
                                label="Số giường"
                                name="numBeds"
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
                                name="numAdults"
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
                                name="numChilds"
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
                                                        width: '50%',
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
                                                    <a
                                                        key="list-loadmore-edit"
                                                        onClick={() => deleteImage(item)}
                                                    >
                                                        Xóa
                                                    </a>
                                                </List.Item>
                                            )}
                                        />
                                        <input
                                            id="files"
                                            name="files"
                                            type="file"
                                            size="1"
                                            multiple
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

export default EditRoom;
