import { Space, Table, Modal, Spin, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import G2HotelAPI from '../../../../api/G2HotelAPI';
import authHeader from '../../../../Services/Auth/auth-header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListService = () => {
    const [items, setItems] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);

    const getServices = async () => {
        try {
            const response = await G2HotelAPI.getServices();
            setItems(response);
        } catch {
            console.log('error');
        }
    };

    const deleteItems = (id) => {
        var config = {
            method: 'delete',
            url: `https://g2hotel-api.herokuapp.com/api/service/delete-service/${id}`,
            headers: authHeader(),
        };

        axios(config)
            .then(function (response) {
                setTimeout(() => {
                    toast.success('Xóa thành công');
                }, 1000);
                getServices();
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
            getServices();
        }, 2000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //end modal

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await G2HotelAPI.getServices();
                setItems(response);
            } catch {
                console.log('error');
            }
        };
        getServices();
    }, []);

    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Giá mặc định',
            dataIndex: 'defaultPrice',
            key: 'defaultPrice',
            render: (text) => (
                <span>
                    {text.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </span>
            ),
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'promotionPrice',
            key: 'promotionPrice',
            render: (text) => (
                <span>
                    {text?.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </span>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/admin/edit-service/${text}`}>Chỉnh sửa</Link>
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
            <ToastContainer />
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
                                <h2>Danh sách dịch vụ</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    );
};
export default ListService;
