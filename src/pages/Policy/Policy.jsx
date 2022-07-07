import { Col, Row, Typography } from 'antd';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper';

import './policy.css';

const { Title } = Typography;
const Policy = () => {
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
            <section className="policy_page">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="policy_title">
                            <Title>Chính sách đặt phòng</Title>
                        </div>
                        <div className="policy_detail">
                            <strong>Quy định: </strong>
                            <br />
                            Số người tối đa tùy thuộc vào mỗi phòng, cộng phụ thu người lớn ở ghép
                            (số người ở ghép tối đa tùy thuộc mỗi phòng). <br />
                            Khách 0 - 12 tuổi được ở miễn phí nếu sử dụng chung giường có sẵn. Khách
                            trên 12 tuổi tính phí hoặc phụ thu như người lớn.
                            <br />
                            <strong>Hủy:</strong>
                            <br /> Nếu hủy hoặc thay đổi, 100% trên giá trị booking phải thu. Trong
                            trường hợp không đến, tổng tiền phòng phải thu. <br />
                            <strong>Thanh toán:</strong>
                            <br /> Toàn bộ tiền phòng sẽ được thu.
                            <br />
                            <strong>Bữa ăn bao gồm:</strong>
                            <br /> Bữa sáng đã bao gồm
                            <br />
                            <strong>Nhận phòng:</strong> 14:00
                            <br />
                            <strong>Trả phòng:</strong> 12:00
                            <br />
                            <strong>Chính sách khác:</strong>
                            <br /> Free check-in early after 12:00 PM - welcome drink - free late
                            check out 1 hours ( subject in available) . just approved for booked
                            direct with hotel
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    );
};
export default Policy;
