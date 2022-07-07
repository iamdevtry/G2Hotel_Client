import {
    Row,
    Col,
    Image,
    Typography,
    Divider,
    List,
    Tooltip,
    Select,
    Button,
    Card,
    Space,
    Spin,
} from 'antd';
import { Link } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import _ from 'lodash';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

import './booknow.css';
import G2HotelAPI from '../../api/G2HotelAPI';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;
const cancelPolicy = () => {
    return (
        <div className="cancelPolicy">
            <strong>Hủy:</strong> Nếu hủy, thay đổi hoặc không đến, khách sẽ trả toàn bộ tiền phòng.
            <br />
            <strong>Thanh toán:</strong> Toàn bộ tiền phòng sẽ được thu. <br />
            <strong>Bữa ăn bao gồm:</strong> Bữa sáng đã bao gồm. <br />
            <strong>Nhận phòng:</strong> 14:00 <br />
            <strong>Trả phòng:</strong> 12:00
        </div>
    );
};
const numAdultsPolicy = (numAdults) => {
    return (
        <div className="numAdultsPolicy">
            Tối đa {numAdults} người lớn, cộng 1 phụ thu người lớn ở ghép. <br />
            Khách 0 - 6 tuổi được ở miễn phí nếu sử dụng chung giường có sẵn
        </div>
    );
};
function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}
const Booknow = () => {
    const [date, onDateChange] = useState([new Date(), addDays(1)]);
    const [items, setItems] = useState([]);
    const [isSelectRoom, setIsSelectRoom] = useState(false);
    const [roomSelected, setRoomSelected] = useState([]);
    const [totalPriceMustPay, setTotalPriceMustPay] = useState(0);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        setIsLoader(true);
        const getRoomTypes = async () => {
            try {
                const response = await G2HotelAPI.getAllRoomTypesWithCheckInOutDate(
                    date[0].toDateString(),
                    date[1].toDateString()
                );
                setItems(response);
            } catch {
                console.log('error');
            }
        };
        getRoomTypes();

        //after get room types 3s, set isLoader to false
        setTimeout(() => {
            setIsLoader(false);
        }, 3000);
    }, [date]);

    //Handle check out button
    const handleCheckOut = (e) => {
        if (roomSelected.length > 0) {
            setIsSelectRoom(false);
            //add room to local storage
            localStorage.setItem('roomSelected', JSON.stringify(roomSelected));
            //add date to local storage
            localStorage.setItem('dateSelected', JSON.stringify(date));
            //reset room selected
            setRoomSelected([]);
            //redirect to checkout page
            window.location.href = '/checkout';
        } else {
            setIsSelectRoom(true);
        }
    };

    //Handle select room
    const onChangeRoom = (
        room_id,
        room_code,
        default_price,
        promotion_price,
        name,
        num_adults,
        amount
    ) => {
        setIsSelectRoom(false);
        //update amount of room if room is exist in roomSelected array else add new room to roomSelected array
        const index = _.findIndex(roomSelected, { room_code: room_code });
        if (index === -1) {
            setRoomSelected([
                ...roomSelected,
                {
                    id: room_id,
                    room_code: room_code,
                    default_price: default_price,
                    promotion_price: promotion_price,
                    name: name,
                    num_adults: num_adults,
                    amount: amount,
                },
            ]);
        } else {
            //remove room from roomSelected array if amount is 0
            if (amount === '0') {
                roomSelected.splice(index, 1);
            } else {
                roomSelected[index].amount = amount;
            }
            setRoomSelected([...roomSelected]);
        }
    };

    //Total number of days between 2 dates (date[0] - date[1])
    const totalDays = (date) => {
        const diff = date[1].getTime() - date[0].getTime();
        if (diff <= 86400000) {
            return diff / (1000 * 60 * 60 * 24);
        }
        return diff / (1000 * 60 * 60 * 24) - 1;
    };

    //call total price function when roomSelected change to update total price of room selected
    useEffect(() => {
        //total price of room selected
        const totalPrice = () => {
            let total = 0;
            roomSelected.forEach((room) => {
                room.promotion_price && (total += room.promotion_price * room.amount);
                !room.promotion_price && (total += room.default_price * room.amount);
            });
            return total * totalDays(date);
        };
        setTotalPriceMustPay(totalPrice());
    }, [roomSelected]);

    useEffect(() => {
        //total price of room selected
        const totalPrice = () => {
            let total = 0;
            roomSelected.forEach((room) => {
                room.promotion_price && (total += room.promotion_price * room.amount);
                !room.promotion_price && (total += room.default_price * room.amount);
            });
            return total * totalDays(date);
        };
        setTotalPriceMustPay(totalPrice());
    }, [date]);

    return (
        <div className="booknow">
            <div className="hero_slide" style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className="swiper__item">
                        <div
                            className="swiper__item-image"
                            style={{
                                width: '100%',
                                height: '100vh',
                                background:
                                    'linear-gradient(rgba(64, 6, 97, 0.4), rgba(64, 6, 97, 0.4)), url(https://r4.wallpaperflare.com/wallpaper/787/399/647/life-resort-travel-vacation-wallpaper-f9d0e8cdb1eaed3bf607584f8031f6ed.jpg) top center / cover no-repeat',
                            }}
                        ></div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper__item">
                        <div
                            className="swiper__item-image"
                            style={{
                                width: '100%',
                                height: '100vh',
                                background:
                                    'linear-gradient(rgba(64, 6, 97, 0.4), rgba(64, 6, 97, 0.4)), url(https://r4.wallpaperflare.com/wallpaper/74/457/102/life-room-interior-home-wallpaper-9930186db10a8d7b660738afe011f6fd.jpg) top center / cover no-repeat',
                            }}
                        ></div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper__item">
                        <div
                            className="swiper__item-image"
                            style={{
                                width: '100%',
                                height: '100vh',
                                background:
                                    'linear-gradient(rgba(64, 6, 97, 0.4), rgba(64, 6, 97, 0.4)), url(https://r4.wallpaperflare.com/wallpaper/756/599/630/man-made-udaipur-hotel-hotel-india-wallpaper-334a332a58e51c4dd8128e5351380201.jpg) top center / cover no-repeat',
                            }}
                        ></div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="booknow_listroom">
                <Row>
                    <Col span={24}>
                        <Card>
                            <Divider orientation="left">
                                <div className="date-picker_form-control">
                                    <Text style={{ marginRight: '2rem' }}>Chọn ngày đến và đi</Text>
                                    <DateRangePicker
                                        clearIcon={false}
                                        minDate={new Date()}
                                        onChange={onDateChange}
                                        value={date}
                                        className="date-picker"
                                    />
                                </div>
                            </Divider>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                        {isLoader ? (
                            <div className="loader">
                                <Space size="middle">
                                    <Spin size="large" />
                                </Space>
                            </div>
                        ) : (
                            <div className="booknow_listroom_item">
                                {items.map((item, index) => (
                                    <List
                                        key={index}
                                        size="large"
                                        style={{
                                            marginBottom: '20px',
                                            backgroundColor: 'rgba(54, 19, 84, 0.1) ',
                                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                        }}
                                        header={
                                            <div style={{ height: 'fit-content' }}>
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                        <Image
                                                            src={`${item.photos[0].url}`}
                                                            alt=""
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                                                        <div className="booknow_listroom_item_roomtype">
                                                            <Divider
                                                                orientation="left"
                                                                style={{ fontWeight: 'bold' }}
                                                            >
                                                                {item.name}
                                                            </Divider>
                                                            <Text style={{ paddingLeft: '12px' }}>
                                                                {item.description}
                                                            </Text>
                                                            <Divider
                                                                orientation="left"
                                                                style={{ fontWeight: 'bold' }}
                                                            >
                                                                Tiện nghi
                                                            </Divider>
                                                            <ul
                                                                style={{
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                }}
                                                            >
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="far fa-snowflake"></i>
                                                                    Điều hòa
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-clock"></i>
                                                                    Đồng hồ báo thức/radio
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-bath"></i>
                                                                    Phòng có bồn tắm
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-coffee"></i>
                                                                    Máy pha cafe
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-wifi"></i>
                                                                    Truy cập Internet qua WiFi
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-glass-cheers"></i>
                                                                    Quầy bar mini
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-smoking-ban"></i>
                                                                    Phòng không hút thuốc
                                                                </li>
                                                                <li style={{ marginLeft: '12px' }}>
                                                                    <i className="fas fa-smoking"></i>
                                                                    Phòng hút thuốc
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        }
                                        bordered
                                        dataSource={item.rooms}
                                        renderItem={(room) => (
                                            <div className="booknow_listroom_item_room">
                                                <Row>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                paddingLeft: '24px',
                                                            }}
                                                        >
                                                            <Title level={5}>{room.name}</Title>
                                                            <Text italic>
                                                                Không hoàn trả phí khi hủy phòng{' '}
                                                                <Tooltip
                                                                    title={cancelPolicy}
                                                                    placement="right"
                                                                    color="gold"
                                                                >
                                                                    <i className="fas fa-info-circle"></i>
                                                                </Tooltip>
                                                            </Text>
                                                            <Text italic>
                                                                Bữa sáng đã bao gồm{' '}
                                                                <Tooltip
                                                                    placement="right"
                                                                    color="gold"
                                                                >
                                                                    <i className="fas fa-utensils"></i>
                                                                </Tooltip>
                                                            </Text>
                                                            <Link
                                                                to={`/detail/${room.id}`}
                                                                style={{ color: 'blue' }}
                                                            >
                                                                Xem chi tiết phòng
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <div className="num-adults">
                                                                {_.times(room.numAdults, (i) => (
                                                                    <i
                                                                        key={i}
                                                                        className="fas fa-user"
                                                                    ></i>
                                                                ))}{' '}
                                                                +
                                                            </div>
                                                            <Text>{room.numAdults} Người lớn</Text>
                                                            <Text italic>
                                                                Thêm người{' '}
                                                                <Tooltip
                                                                    title={numAdultsPolicy(
                                                                        room.numAdults
                                                                    )}
                                                                    placement="right"
                                                                    color="gold"
                                                                >
                                                                    <i className="fas fa-info-circle"></i>
                                                                </Tooltip>
                                                            </Text>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            <Text type="danger">
                                                                {room.amount} phòng còn lại
                                                            </Text>
                                                            {room.promotionPrice &&
                                                            room.promotionPrice !== 0 ? (
                                                                <>
                                                                    <Text
                                                                        type="danger"
                                                                        style={{
                                                                            fontSize: '1.2rem',
                                                                        }}
                                                                    >
                                                                        {room.promotionPrice.toLocaleString(
                                                                            'it-IT',
                                                                            {
                                                                                style: 'currency',
                                                                                currency: 'VND',
                                                                            }
                                                                        )}
                                                                    </Text>
                                                                    <Text
                                                                        delete
                                                                        style={{ fontSize: '1rem' }}
                                                                    >
                                                                        {room.defaultPrice.toLocaleString(
                                                                            'it-IT',
                                                                            {
                                                                                style: 'currency',
                                                                                currency: 'VND',
                                                                            }
                                                                        )}
                                                                    </Text>
                                                                </>
                                                            ) : (
                                                                <Text
                                                                    style={{ fontSize: '1.2rem' }}
                                                                >
                                                                    {room.defaultPrice.toLocaleString(
                                                                        'it-IT',
                                                                        {
                                                                            style: 'currency',
                                                                            currency: 'VND',
                                                                        }
                                                                    )}
                                                                </Text>
                                                            )}
                                                            <Text italic>
                                                                / Đêm{' '}
                                                                <Tooltip
                                                                    title={`Giá bao gồm thuế. Giá đã bao gồm bữa sáng.`}
                                                                    placement="right"
                                                                    color="gold"
                                                                >
                                                                    <i className="fas fa-info-circle"></i>
                                                                </Tooltip>
                                                            </Text>
                                                        </div>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                                        <div
                                                            className="selected-room"
                                                            style={{
                                                                padding: '0px 12px',
                                                            }}
                                                        >
                                                            <Select
                                                                name="select-room"
                                                                placeholder="0 phòng"
                                                                style={{ width: '100%' }}
                                                                onChange={(value) => {
                                                                    onChangeRoom(
                                                                        room.id,
                                                                        room.code,
                                                                        room.defaultPrice,
                                                                        room.promotionPrice,
                                                                        room.name,
                                                                        room.numAdults,
                                                                        value
                                                                    );
                                                                }}
                                                            >
                                                                <Option value="0" key="0">
                                                                    0 phòng
                                                                </Option>
                                                                {_.times(room.amount, (i) => (
                                                                    <Option
                                                                        value={i + 1}
                                                                        key={i + 1}
                                                                    >
                                                                        {i + 1} phòng
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Divider />
                                            </div>
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        <div className="booknow_checkout">
                            <div
                                className="booknow_checkout_item"
                                style={{
                                    padding: '36px 12px',
                                    backgroundColor: 'rgba(54, 19, 84, 0.8)',
                                    borderRadius: '5px',
                                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                }}
                            >
                                <Text style={{ color: '#fff' }}>
                                    Cam kết giá tốt nhất <i class="fas fa-check-circle"></i>
                                </Text>
                                <br />
                                {roomSelected.length > 0 && (
                                    <>
                                        <Divider></Divider>
                                        <Text style={{ color: 'wheat' }}>
                                            {/* total amount in roomSeleted */}
                                            {_.sumBy(roomSelected, (room) => room.amount)} phòng đã
                                            chọn
                                        </Text>
                                        <br />
                                        <Text
                                            type="danger"
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                color: 'gold',
                                            }}
                                        >
                                            {totalPriceMustPay.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                        <br />
                                        <Text style={{ color: '#fff' }}>
                                            Số tiền phải trả cho {Math.round(totalDays(date))} Đêm
                                        </Text>
                                    </>
                                )}
                                <Button
                                    type="primary"
                                    className="booknow_checkout_item_button"
                                    style={{ background: '#fa9e1b', border: 'none', width: '100%' }}
                                    onClick={(e) => handleCheckOut(e)}
                                >
                                    Đặt phòng
                                </Button>
                                {isSelectRoom && (
                                    <Text type="danger">
                                        Vui lòng chọn phòng trước khi thực hiện thao tác trên
                                    </Text>
                                )}
                            </div>
                        </div>
                        {roomSelected.length > 0 && (
                            <>
                                <div className="booknow_checkout--mobile">
                                    <div className="booknow_cart__mobile">
                                        <Text style={{ color: 'wheat' }}>
                                            {/* total amount in roomSeleted */}
                                            {_.sumBy(roomSelected, (room) => room.amount)} phòng đã
                                            chọn
                                        </Text>
                                        <br />
                                        <Text
                                            type="danger"
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                color: 'gold',
                                            }}
                                        >
                                            {totalPriceMustPay.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </Text>
                                        <br />
                                        <Text style={{ color: '#fff' }}>
                                            Số tiền phải trả cho {Math.round(totalDays(date))} Đêm
                                        </Text>
                                    </div>
                                    <div className="booknow_checkout_item">
                                        <Text style={{ color: '#fff' }}>
                                            Cam kết giá tốt nhất <i class="fas fa-check-circle"></i>
                                        </Text>
                                        <br />
                                        <Button
                                            type="primary"
                                            className="booknow_checkout_item_button"
                                            style={{
                                                background: '#fa9e1b',
                                                border: 'none',
                                                width: '100%',
                                            }}
                                            onClick={(e) => handleCheckOut(e)}
                                        >
                                            Đặt phòng
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default Booknow;
