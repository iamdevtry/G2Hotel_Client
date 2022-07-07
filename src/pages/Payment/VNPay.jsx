import {
    Row,
    Card,
    Typography,
    Col,
    Select,
    Tooltip,
    Divider,
    Form,
    Input,
    Button,
    Collapse,
} from 'antd';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import G2HotelAPI from '../../api/G2HotelAPI';
import _ from 'lodash';
import './vnpay.css';
import validator from 'validator';
const { Panel } = Collapse;
const { Text, Title } = Typography;
const { Option } = Select;

const policy = () => {
    return (
        <div>
            <strong>Hủy:</strong> Nếu hủy hoặc thay đổi, 100% trên giá trị booking phải thu. Trong
            trường hợp không đến, tổng tiền phòng phải thu. <br />
            <strong>Thanh toán:</strong> Toàn bộ tiền phòng sẽ được thu.
            <br />
            <strong>Bữa ăn bao gồm:</strong> Bữa sáng đã bao gồm
            <br />
            <strong>Nhận phòng:</strong> 14:00
            <br />
            <strong>Trả phòng:</strong> 12:00
            <br />
            <strong>Chính sách khác:</strong> Free check-in early after 12:00 PM - welcome drink -
            free late check out 1 hours ( subject in available) . just approved for booked direct
            with hotel
        </div>
    );
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24,
        },
        md: {
            span: 24,
        },
        lg: {
            span: 24,
        },
        xl: {
            span: 24,
        },
    },
};

const VNPay = () => {
    const [services, setServices] = useState([]);
    const [servicesSelected, setServicesSelected] = useState([]);
    const [totalPriceServiceMustPay, setTotalPriceServiceMustPay] = useState(0);
    const [numberPhoneIsValid, setNumberPhoneIsValid] = useState(false);
    //get room selected from localStorage
    const getRoomSelected = () => {
        const roomSelected = localStorage.getItem('roomSelected');
        if (roomSelected) {
            return JSON.parse(roomSelected);
        }
        return null;
    };
    //get all services
    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await G2HotelAPI.getServices();
                setServices(response);
            } catch {
                console.log('error');
            }
        };

        getServices();
    }, []);
    //get date selected from localStorage
    const getDateSelected = () => {
        const dateSelected = localStorage.getItem('dateSelected');
        if (dateSelected) {
            return JSON.parse(dateSelected);
        }
        return null;
    };
    const roomSelected = getRoomSelected();
    const dateSelected = getDateSelected();
    //form
    const [form] = Form.useForm();

    const checkNumberPhoneIsValid = (e) => {
        const phone = e.target.value;
        setNumberPhoneIsValid(false);
        if (!validator.isMobilePhone(phone, 'vi-VN')) {
            setNumberPhoneIsValid(true);
        }
    };

    //API: handle payment
    const handlePayment = (value) => {
        var data = JSON.stringify(value);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/vnpay/vnpay',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(response);
                //navigate to response.data
                window.location.href = response.data;
                // localStorage.removeItem('roomSelected');
                // localStorage.removeItem('dateSelected');
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const onFinish = (values) => {
        if (numberPhoneIsValid) {
            return;
        }

        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 10);
        values.vnp_ExpireDate = dateNow.toISOString();
        values.vnp_Bill_CheckIn = dateSelected[0];
        values.vnp_Bill_CheckOut = dateSelected[1];
        values.vnp_Bill_RoomSelecteds = roomSelected;
        values.vnp_Bill_ServiceSelecteds = servicesSelected;
        values.vnp_Bill_TotalPrice = totalPriceMustPay();
        // console.log('Received values of form: ', values);
        handlePayment(values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed: ', errorInfo);
    };
    const totalPricePerRoom = (room) => {
        if (room.promotion_price) {
            return room.promotion_price * room.amount;
        } else {
            return room.default_price * room.amount;
        }
    };
    //handle services
    const onChangeServices = (service_id, default_price, promotion_price, name, amount) => {
        //update amount of room if room is exist in roomSelected array else add new room to roomSelected array
        const index = _.findIndex(servicesSelected, { id: service_id });
        if (index === -1) {
            setServicesSelected([
                ...servicesSelected,
                {
                    id: service_id,
                    default_price: default_price,
                    promotion_price: promotion_price,
                    name: name,
                    amount: amount,
                },
            ]);
        } else {
            if (amount === 0) {
                servicesSelected.splice(index, 1);
            } else {
                servicesSelected[index].amount = amount;
            }
            setServicesSelected([...servicesSelected]);
        }
        console.log(servicesSelected);
    };
    useEffect(() => {
        //total price of room selected
        const totalPriceServices = () => {
            let total = 0;
            servicesSelected.forEach((ser) => {
                ser.promotion_price && (total += ser.promotion_price * ser.amount);
                !ser.promotion_price && (total += ser.default_price * ser.amount);
            });
            return total;
        };
        setTotalPriceServiceMustPay(totalPriceServices());
    }, [servicesSelected]);
    //Total number of days between 2 dates (date[0] - date[1])
    const totalDays = (date) => {
        const start = new Date(date[0]);
        const end = new Date(date[1]);
        const diff = end.getTime() - start.getTime();
        if (diff <= 86400000) {
            return diff / (1000 * 60 * 60 * 24);
        }
        return diff / (1000 * 60 * 60 * 24) - 1;
    };
    const totalPrice = () => {
        if (roomSelected) {
            let total = 0;
            roomSelected.forEach((room) => {
                room.promotion_price && (total += room.promotion_price * room.amount);
                !room.promotion_price && (total += room.default_price * room.amount);
            });
            return total;
        }
    };
    const totalPriceMustPay = () => {
        if (roomSelected) {
            return totalPrice() * totalDays(dateSelected) + totalPriceServiceMustPay;
        }
    };

    return (
        <>
            {!roomSelected && (
                <div className="checkout_page">
                    <Row>
                        <Title level={4}>G2 Luxury Hotel | Thanh toán đặt phòng</Title>
                        <Card
                            style={{
                                width: '100%',
                            }}
                        >
                            Bạn chưa chọn phòng để có thể thanh toán!! Hãy chọn phòng ngay...
                        </Card>
                    </Row>
                </div>
            )}
            {roomSelected && (
                <div className="checkout_page">
                    <Row className="checkout_form_control">
                        <Title level={4}>G2 Luxury Hotel | Thanh toán đặt phòng</Title>
                        <Card
                            style={{
                                width: '100%',
                            }}
                        >
                            <Text>
                                <strong>Nhận phòng:</strong>{' '}
                                {new Date(dateSelected[0]).toLocaleDateString('vn-VN', {
                                    weekday: 'long',
                                })}
                                , ngày {new Date(dateSelected[0]).getDate()} tháng{' '}
                                {new Date(dateSelected[0]).getMonth() + 1}, năm{' '}
                                {new Date(dateSelected[0]).getFullYear()} từ 14:00
                            </Text>
                            <br />
                            <Text>
                                <strong>Trả phòng:</strong>{' '}
                                {new Date(dateSelected[1]).toLocaleDateString('vn-VN', {
                                    weekday: 'long',
                                })}
                                , ngày {new Date(dateSelected[1]).getDate()} tháng{' '}
                                {new Date(dateSelected[1]).getMonth() + 1}, năm{' '}
                                {new Date(dateSelected[1]).getFullYear()} cho đến 12:00
                            </Text>
                            <p>Bạn có muốn chuyển ngày đặt phòng?</p>
                        </Card>
                    </Row>
                    <Row className="checkout_form_control">
                        <Title level={4}>Chi tiết đặt phòng</Title>
                        <Card
                            style={{
                                width: '100%',
                            }}
                        >
                            {roomSelected.map((room, index) => (
                                <div className="room_selected--item" key={index}>
                                    <Title level={4}>{room.name}</Title>
                                    <Row>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <div className="detail_room_selected">
                                                <Text>Không hoàn trả phí khi hủy phòng</Text>
                                                <br />
                                                <Text>Bữa sáng đã bao gồm</Text>
                                                <br />
                                                <Text>
                                                    <strong>Chi tiết:</strong> {room.amount} phòng,
                                                    1 đêm, {room.num_adults}&nbsp; người lớn mỗi
                                                    phòng đã bao gồm trong giá
                                                </Text>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <div
                                                className="detail_room_selected"
                                                style={{ textAlign: 'center' }}
                                            >
                                                <Text>Số lượng phòng</Text>
                                                <br />
                                                <Select
                                                    name="select-room"
                                                    placeholder={`${room.amount} phòng`}
                                                    disabled
                                                >
                                                    <Option value={`${room.amount} phòng`} key="0">
                                                        {room.amount}
                                                    </Option>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <div
                                                className="detail_room_selected"
                                                style={{ float: 'right' }}
                                            >
                                                <Text
                                                    style={{ fontSize: '1rem', fontWeight: 'bold' }}
                                                >
                                                    {totalPricePerRoom(room).toLocaleString(
                                                        'it-IT',
                                                        {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }
                                                    )}
                                                </Text>
                                                <br />
                                                <Text italic>
                                                    Chính sách đặt phòng{' '}
                                                    <Tooltip
                                                        title={policy}
                                                        placement="right"
                                                        color="gold"
                                                    >
                                                        <i className="fas fa-info-circle"></i>
                                                    </Tooltip>
                                                </Text>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </Card>
                    </Row>
                    <div className="checkout_form_control">
                        <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                            <Panel header={<Title level={4}>Dịch vụ thêm</Title>} key="1">
                                <Row>
                                    {services.map((ser, index) => (
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} key={index}>
                                            <div className="services_selected--item">
                                                <Title level={5}>{ser.name}</Title>
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <div className="detail_room_selected">
                                                            <Text>
                                                                <strong>Giá: </strong>
                                                                {ser.promotionPrice &&
                                                                    ser.promotionPrice?.toLocaleString(
                                                                        'it-IT',
                                                                        {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        }
                                                                    )}
                                                                {!ser.promotionPrice &&
                                                                    ser.defaultPrice?.toLocaleString(
                                                                        'it-IT',
                                                                        {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        }
                                                                    )}
                                                            </Text>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <div
                                                            className="detail_room_selected"
                                                            style={{ textAlign: 'center' }}
                                                        >
                                                            <Text>Số lượng</Text>&nbsp;
                                                            <Select
                                                                name="amount-service"
                                                                defaultValue={`0`}
                                                                onChange={(value) => {
                                                                    onChangeServices(
                                                                        ser.id,
                                                                        ser.defaultPrice,
                                                                        ser.promotionPrice,
                                                                        ser.name,
                                                                        value
                                                                    );
                                                                }}
                                                            >
                                                                {/* loop 10 times */}
                                                                {[...Array(11)].map((_, index) => (
                                                                    <Option
                                                                        value={index}
                                                                        key={index}
                                                                    >
                                                                        {index}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Panel>
                        </Collapse>
                    </div>
                    <Row className="checkout_form_control">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="detail_payment checkout_form_control__sub">
                                <Title level={4}>Chi tiết thanh toán</Title>
                                <Card
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Text>
                                        <strong>Giá phòng:</strong>{' '}
                                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {totalPrice().toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                    </Text>
                                    <br />
                                    <Text>
                                        <strong>Số đêm:</strong>{' '}
                                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {Math.round(totalDays(dateSelected))} Đêm
                                        </Text>
                                    </Text>
                                    <br />
                                    <Text>
                                        <strong>Dịch vụ thêm:</strong>{' '}
                                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {totalPriceServiceMustPay.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                        <br />
                                        {servicesSelected.map((ser, index) => (
                                            <div className="service-selected-item" key={index}>
                                                <Text>
                                                    <i className="fas fa-plus"></i> {ser.name}
                                                    <br />
                                                    Đơn giá:{' '}
                                                    {ser.promotion_price &&
                                                        ser.promotion_price?.toLocaleString(
                                                            'it-IT',
                                                            {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }
                                                        )}
                                                    {!ser.promotion_price &&
                                                        ser.default_price?.toLocaleString('it-IT', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}
                                                    &nbsp; -&nbsp;&nbsp;SL: {ser.amount}
                                                    <br />
                                                </Text>
                                            </div>
                                        ))}
                                    </Text>
                                    <Divider orientation="left">
                                        <strong>Tổng giá</strong>
                                    </Divider>
                                    <Text style={{ float: 'right' }}>
                                        <Text style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                            {totalPriceMustPay().toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                        <Tooltip
                                            title={`Số tiền đã bao gồm thuế`}
                                            placement="right"
                                            color="gold"
                                        >
                                            <i className="fas fa-info-circle"></i>
                                        </Tooltip>
                                    </Text>
                                </Card>
                            </div>
                            <div className="payment_policy checkout_form_control__sub">
                                <Title level={4}>Chính sách đặt phòng</Title>
                                <Card
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Text>
                                        <strong>Hủy:</strong> Nếu hủy hoặc thay đổi, 100% trên giá
                                        trị booking phải thu. Trong trường hợp không đến, tổng tiền
                                        phòng phải thu.
                                    </Text>
                                    <br />
                                    <Text>
                                        <strong>Thanh toán:</strong> Toàn bộ tiền phòng sẽ được thu.
                                    </Text>
                                    <br />
                                    <Text>
                                        <strong>Bữa ăn bao gồm:</strong> Bữa sáng đã bao gồm
                                    </Text>
                                    <br />
                                    <Text>
                                        <strong>Chính sách khác:</strong> Free check-in early after
                                        12:00 PM - welcome drink - free late check out 1 hours (
                                        subject in available) . just approved for booked direct with
                                        hotel
                                    </Text>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <div className="info_customer checkout_form_control__sub">
                                <Title level={4}>Thông tin khách</Title>
                                <Card
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Form
                                        {...formItemLayout}
                                        form={form}
                                        name="register"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        scrollToFirstError
                                    >
                                        <Form.Item
                                            name="vnp_Bill_FirstName"
                                            label="Tên"
                                            rules={[
                                                {
                                                    type: 'text',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên của bạn!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="vnp_Bill_LastName"
                                            label="Họ"
                                            rules={[
                                                {
                                                    type: 'text',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập họ của bạn!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="vnp_Bill_Email"
                                            label="Email"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'Vui lòng nhập email hợp lệ!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập email của bạn!',
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            name="ConfirmEmail"
                                            label="Xác nhận"
                                            dependencies={['vnp_Bill_Email']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng xác nhận Email của bạn!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (
                                                            !value ||
                                                            getFieldValue('vnp_Bill_Email') ===
                                                                value
                                                        ) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(
                                                            new Error('Email không trùng khớp!')
                                                        );
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        {numberPhoneIsValid ? (
                                            <div className="warning_phone_isvalid">
                                                <Text type="danger"> Số điện thoại không đúng</Text>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <Form.Item
                                            name="vnp_Bill_Mobile"
                                            label="Số điện thoại"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số điện thoại của bạn!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={(e) => checkNumberPhoneIsValid(e)}
                                            />
                                        </Form.Item>

                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            style={{ width: '100%' }}
                                        >
                                            Xác nhận đặt phòng và thanh toán
                                        </Button>
                                    </Form>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};
export default VNPay;
