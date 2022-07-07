import { Button, Form, Input, Row, Col } from 'antd';
import { useState } from 'react';
import G2HotelAPI from '../../api/G2HotelAPI';

import './check_detail_payment.css';
const CheckDetailPayment = () => {
    const [payment, setPayment] = useState(null);

    const getDetailPayment = async (id) => {
        try {
            const response = await G2HotelAPI.getDetailPaymentById(id);
            setPayment(response);
        } catch {
            console.log('error');
        }
    };

    const onFinish = (values) => {
        // console.log('Success:', values);
        getDetailPayment(values.orderId);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="check-detail-payment">
            <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Mã hóa đơn"
                    name="orderId"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mã hóa đơn!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã hóa đơn" />
                </Form.Item>
                <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Kiểm tra
                    </Button>
                </Form.Item>
            </Form>
            <div className="check-detail-payment-result">
                {payment && (
                    <Row>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                        {payment.detailServicePayments?.length > 0 && (
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                    </Row>
                )}
            </div>
        </div>
    );
};

export default CheckDetailPayment;
