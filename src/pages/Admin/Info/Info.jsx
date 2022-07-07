import { Space, Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import G2HotelAPI from '../../../api/G2HotelAPI';

const { Text } = Typography;
const columns = [
    {
        title: 'Mã hóa đơn',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (text) => <Text>{text}</Text>,
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalPayment',
        key: 'orderId',
        render: (totalPayment) => (
            <Text>
                {totalPayment.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                })}
            </Text>
        ),
    },
    {
        title: 'Ngày thanh toán',
        dataIndex: 'createdDate',
        key: 'orderId',
        render: (createdDate) => <Text>{new Date(createdDate).toUTCString()}</Text>,
    },
    {
        title: 'Trạng thái',
        key: 'orderId',
        dataIndex: 'payStatus',
        render: (payStatus) => (
            <>
                {payStatus === '1' ? (
                    <Tag color="green">Đã thanh toán</Tag>
                ) : (
                    <Tag color="yellow">Chưa thanh toán</Tag>
                )}
            </>
        ),
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                <Link to={`${record.orderId}`} style={{ color: 'blue' }}>
                    Chi tiết
                </Link>
            </Space>
        ),
    },
];

const Info = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const getPayments = async () => {
            try {
                const response = await G2HotelAPI.getAllPayments();
                setPayments(response);
            } catch {
                console.log('error');
            }
        };
        getPayments();
    }, []);

    return (
        <>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Danh sách hóa đơn đặt phòng</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={payments} />
        </>
    );
};
export default Info;
