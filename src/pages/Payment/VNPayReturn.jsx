import { Row, Typography, Card, Alert } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import qs from 'qs';
import axios from 'axios';

import './vnpay_return.css';

const { Title, Text } = Typography;

const VNPayReturn = () => {
    const query = useLocation().search;
    const queryString = qs.parse(query, { ignoreQueryPrefix: true });

    const updateStatusPay = (params) => {
        if (params.vnp_ResponseCode === '00') {
            var data = JSON.stringify({
                vnp_ResponseCode: params.vnp_ResponseCode,
                vnp_TxnRef: params.vnp_TxnRef,
            });

            var config = {
                method: 'put',
                url: 'https://g2hotel-api.herokuapp.com/api/vnpay/paid',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log('success');
                    //remove roomSelected from localStorage
                    localStorage.removeItem('roomSelected');
                    //remove dateSelected from localStorage
                    localStorage.removeItem('dateSelected');
                    //redirect to home page after 5s
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 10000);
                })
                .catch(function (error) {
                    console.log('error');
                });
        }
    };
    updateStatusPay(queryString);

    const cancelPayment = (params) => {
        if (params.vnp_ResponseCode !== '00') {
            var data = JSON.stringify({
                OrderId: params.vnp_TxnRef,
                StatusInvoice: params.vnp_TxnRef,
            });

            var config = {
                method: 'delete',
                url: 'https://g2hotel-api.herokuapp.com/api/vnpay/cancel',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            };

            axios(config)
                .then(function (response) {
                    console.log('success');
                })
                .catch(function (error) {
                    console.log('error');
                });
        }
    };
    cancelPayment(queryString);
    return (
        <div className="info_payment_page">
            <Row>
                <Title level={4}>G2 Luxury Hotel | Trạng thái thanh toán</Title>
            </Row>
            <Row>
                {queryString.vnp_ResponseCode === '00' ? (
                    <>
                        <Alert
                            style={{
                                width: '100%',
                            }}
                            message="Thanh toán thành công"
                            type="success"
                            showIcon
                        />
                        <Card
                            style={{
                                width: '100%',
                            }}
                        >
                            <div className="payment_success">
                                <Text>
                                    <strong>Số tiền đã thanh toán:</strong>{' '}
                                    {(queryString.vnp_Amount / 100).toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Text>
                                <br />
                                <Text>
                                    <strong>Thông tin đơn hàng:</strong>
                                    <br />
                                    <Text style={{ fontSize: '1.2rem' }} code>
                                        {queryString.vnp_OrderInfo}
                                    </Text>
                                </Text>
                                <br />
                                <Text>
                                    <strong>Mã đơn hàng:</strong> {queryString.vnp_TxnRef}
                                </Text>
                                <br />
                                <Text>
                                    <strong>Ngày thanh toán:</strong>{' '}
                                    {new Date(
                                        moment('20220702122738', 'YYYYMMDDHHmmss').format()
                                    ).toUTCString()}
                                </Text>
                                <br />
                                <Text>
                                    Một thư đã được gửi tới email của quý khách! Vui lòng kiểm tra
                                    hòm thư để kiểm tra thông tin đơn hàng. Trang web sẽ tự động
                                    chuyển hướng sau 10s
                                </Text>
                            </div>
                        </Card>
                    </>
                ) : (
                    <>
                        <Alert
                            style={{
                                width: '100%',
                            }}
                            message="Thanh toán thất bại"
                            type="error"
                            showIcon
                        />
                        <Card
                            style={{
                                width: '100%',
                            }}
                        >
                            <div className="payment_fail">
                                <Text>
                                    Thanh toán thất bại. Quý khách vui lòng kiểm tra lại. Chúng tôi
                                    thành thật xin lỗi vì sự bất tiền này!
                                </Text>
                            </div>
                        </Card>
                    </>
                )}
            </Row>
        </div>
    );
};
export default VNPayReturn;
