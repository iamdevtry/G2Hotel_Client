import { Tabs, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import G2HotelAPI from '../../../api/G2HotelAPI';

import './detail-payment.css';
const { TabPane } = Tabs;
const DetailPayment = () => {
    const { id } = useParams();
    const [payment, setPayment] = useState({});
    useEffect(() => {
        const getDetailPayment = async () => {
            try {
                const response = await G2HotelAPI.getDetailPaymentById(id);
                setPayment(response);
            } catch {
                console.log('error');
            }
        };
        getDetailPayment();
    }, [id]);
    return (
        <div className="detail_payment">
            <Tabs defaultActiveKey="1" type="card" size="small">
                <TabPane tab="Chi tiết hóa đơn" key="1">
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Mã hóa đơn
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.orderId}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Tổng tiền
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.totalPayment?.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Loại thanh toán
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.paymentType?.name}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Tên khách hàng
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.customer?.fullName}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Số điện thoại
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.customer?.phone}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Email
                                </label>
                                <input
                                    className="detail_payment__info-value"
                                    type="text"
                                    defaultValue={payment.customer?.email}
                                    disabled
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Phòng đã đặt
                                </label>
                                <ul>
                                    {payment.detailRoomPayments &&
                                        payment.detailRoomPayments.map((detailRoomPayment) => (
                                            <li key={detailRoomPayment.roomId}>
                                                {detailRoomPayment.room.name} - Số lượng{' '}
                                                {detailRoomPayment.amount}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </Col>
                        {payment.detailServicePayments?.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                <div className="detail_payment__info">
                                    <label className="detail_payment__info-title" htmlFor="">
                                        Dịch vụ thêm
                                    </label>
                                    <ul>
                                        {payment.detailServicePayments.map(
                                            (detailServicePayment) => (
                                                <li key={detailServicePayment.serviceId}>
                                                    {detailServicePayment.service.name} - Số lượng{' '}
                                                    {detailServicePayment.amount}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </Col>
                        )}
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <div className="detail_payment__info">
                                <label className="detail_payment__info-title" htmlFor="">
                                    Ngày nhận - Trả phòng
                                </label>
                                <ul>
                                    {payment.detailRoomPayments && (
                                        <>
                                            <li>
                                                Nhận phòng:{' '}
                                                {new Date(
                                                    payment.detailRoomPayments[0].checkInDate
                                                ).toUTCString()}
                                            </li>
                                            <li>
                                                Trả phòng:{' '}
                                                {new Date(
                                                    payment.detailRoomPayments[0].checkOutDate
                                                ).toUTCString()}
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Link to="/admin/info-payment" style={{ color: 'blue' }}>
                        Trở về
                    </Link>
                </TabPane>
            </Tabs>
        </div>
    );
};
export default DetailPayment;
