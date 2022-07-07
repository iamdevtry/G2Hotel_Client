import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';
import './about.css';
import { Image, Col, Row, Typography, Card } from 'antd';

const { Title } = Typography;

const About = () => {
    return (
        <>
            <div className="hero_slide">
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
                                    'linear-gradient(rgba(64, 6, 97, 0.4), rgba(64, 6, 97, 0.4)), url(https://c0.wallpaperflare.com/path/764/602/552/business-professional-sign-fcb3508a26d98d13bcc2a99991dec6b7.jpg) top center / cover no-repeat',
                            }}
                        ></div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="about_page">
                <Row className="about-us">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="about-us__left">
                        <Title>Về Khách Sạn Của Chúng Tôi</Title>
                        <Title level={5} type="secondary">
                            G2 Hotel Luxury tọa lạc tại trung tâm thành phố Đà Lạt, cách Dinh Bảo
                            Đại chưa đến 300 m. Tọa lạc trong một công viên tư nhân, khách sạn thông
                            gió tự nhiên này có nhà hàng, spa và Wi-Fi miễn phí. Các phòng nghỉ có
                            thiết kế mở tại Palace Dalat trang nhã với lối trang trí kiểu thuộc địa
                            Pháp của những năm 1920 và sàn gỗ cứng. Mỗi phòng đều được trang bị
                            minibar, TV và tiện nghi pha cà phê/trà. Khách sạn cũng cung cấp dịch vụ
                            phòng 24 giờ.
                        </Title>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Image
                            width={'100%'}
                            src="https://s3-ap-southeast-1.amazonaws.com/blog-ph/wp-content/uploads/2016/08/12091211/hotel-room-marina-bay-sands.jpg"
                        />
                    </Col>
                </Row>
                <div className="about-us__service">
                    <Row className="about-us__service-title">
                        <Col span={24}>
                            <Title style={{ color: '#fff' }}>Dịch Vụ Của Chúng Tôi</Title>
                        </Col>
                    </Row>
                    <Row className="about-us__service-list" gutter={16}>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                            <Card className="about-us__service-item">
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                                    Bữa Sáng Sang Trọng
                                </p>
                                <p>
                                    Bữa sáng cao cấp, đầy đủ dinh dưỡng với thực đơn đa dạng hân
                                    hạnh được phục vụ quý khách.
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                            <Card className="about-us__service-item">
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                                    Bãi Xe An Ninh
                                </p>
                                <p>
                                    Bãi giữ xe an ninh, có bảo vệ 24/7. Hỗ trợ đỗ xe và trả xe khi
                                    khách hàng cần
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                            <Card className="about-us__service-item">
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                                    Thiết Bị Phục Vụ
                                </p>
                                <p>
                                    Tận hưởng sự thoải mái từ các thiết bị phục vụ cao cấp và sang
                                    trọng.
                                </p>
                            </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                            <Card className="about-us__service-item">
                                <p style={{ fontSize: '18px', fontWeight: '600' }}>
                                    Nhân viên tận tình
                                </p>
                                <p>
                                    Phục vụ khác hàng bằng niềm tin tốt đẹp với thái độ khẩn trương
                                    nhất, cấp bách nhất.
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};
export default About;
