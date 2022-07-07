import { Space, Table, Modal, Spin, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';
const ListRoomType = () => {
    const [items, setItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const getRoomTypes = async () => {
        try {
            const response = await G2HotelAPI.getAllRoomTypes();
            setItems(response);
        } catch {
            console.log('error');
        }
    };

    const deleteItems = (id) => {
        var config = {
            method: 'delete',
            url: `https://g2hotel-api.herokuapp.com/api/roomtype/delete-roomType/${id}`,
            headers: authHeader(),
        };

        axios(config)
            .then(function (response) {
                console.log('delete success');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //spin
    const setIsSpinVisible = () => {
        document.querySelector('.spin-custom').setAttribute('style', 'display: block');
    };
    const setIsSpinHidden = () => {
        document.querySelector('.spin-custom').setAttribute('style', 'display: none');
    };

    //logic modal
    const showModal = (value) => {
        setIsModalVisible(true);
        setSelectedItem(value);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        deleteItems(selectedItem);
        setLoading(true);
        setIsSpinVisible();
        setTimeout(() => {
            setLoading(false);
            setIsSpinHidden();
            getRoomTypes();
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //end modal

    useEffect(() => {
        const getRoomTypes = async () => {
            try {
                const response = await G2HotelAPI.getAllRoomTypes();
                setItems(response);
            } catch {
                console.log('error');
            }
        };
        getRoomTypes();
    }, []);

    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Mô tả ngắn',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/admin/edit-room-type/${text}`}>Chỉnh sửa</Link>
                    <Button type="link" danger onClick={() => showModal(text)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];
    const data = items;
    return (
        <>
            <div className="spin-custom" style={{ display: 'none' }}>
                <Spin
                    spinning={loading}
                    size="large"
                    className="spin-custom"
                    style={{
                        position: 'fixed',
                        backgroundColor: 'rgba(33, 37, 41,0.5)',
                        top: '0',
                        left: '0',
                        bottom: '0',
                        right: '0',
                        zIndex: '999',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                ></Spin>
            </div>
            <Modal
                title="Xóa bản ghi"
                onCancel={handleCancel}
                visible={isModalVisible}
                onOk={handleOk}
            >
                <p>Bạn có chắc muốn xóa bản ghi này?</p>
            </Modal>
            <div className="list-room">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Danh sách phòng</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    );
};
export default ListRoomType;
