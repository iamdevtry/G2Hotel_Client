import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Row, Carousel, Image, Typography, Divider, Button } from 'antd';
import { CheckCircleFilled, GiftOutlined } from '@ant-design/icons';
import './detail.css';
import { useEffect, useState } from 'react';
import G2HotelAPI from '../../api/G2HotelAPI';
const { Title } = Typography;
const { Paragraph } = Typography;
const Detail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    useEffect(() => {
        const getDetail = async () => {
            const response = await G2HotelAPI.getRoomById(id);
            console.log(response);
            setItem(response);
        };
        getDetail();
    }, [id]);
    return (
        <section className="detail_room">
            <Row>
                <Col span={24}>
                    <div className="detail_room_title">
                        <Title>{item?.name}</Title>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={{ span: '15' }} md={{ span: '12' }} sm={{ span: '24' }}>
                    <div className="detail_room_content">
                        <Divider orientation="left">
                            <Title level={4}>{item?.name}</Title>
                        </Divider>
                        <Paragraph>{item?.shortDescription}</Paragraph>
                    </div>
                    <div className="detail_room_info">
                        <Divider orientation="left">
                            <Title level={4}>Chi tiết phòng</Title>
                        </Divider>
                        <Paragraph>{item?.description}</Paragraph>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Số giường: {item?.numBeds}{' '}
                                            giường
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Người lớn:{' '}
                                            {item?.numAdults} người
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Trẻ em: {item?.numChilds}{' '}
                                            người
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Giá mặc định:{' '}
                                            {item?.defaultPrice.toLocaleString('it-IT', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}{' '}
                                            /đêm
                                        </Paragraph>
                                    </div>
                                    {item?.promotionPrice && (
                                        <div className="switch-wrap">
                                            <Paragraph>
                                                <CheckCircleFilled /> &nbsp; Giá khuyến mãi:{' '}
                                                {item?.promotionPrice.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}{' '}
                                                /đêm
                                            </Paragraph>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="detail_room_service">
                        <Divider orientation="left">
                            <Title level={4}>Tiện Nghi - Dịch Vụ Khách Sạn</Title>
                        </Divider>
                        <Paragraph>
                            Phòng Deluxe được thiết kế với diện tích rộng, ở tầng cao, có hướng nhìn
                            đẹp và được trang bị những vật dụng, trang thiết bị cao cấp. Có diện
                            tích từ 30 – 50m vuông. Không gian rộng rãi, sang trọng của phòng Deluxe
                            thích hợp với nhiều đối tượng khách hàng khác nhau: Du lịch nghỉ dưỡng,
                            công tác, cặp vợ chồng có con nhỏ…
                        </Paragraph>

                        <Divider></Divider>
                        <Row>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Internet miễn phí
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Nhà hàng
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Mở cửa 24h
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Khu vực gởi đồ đạc hành lí
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Dịch vụ hội họp
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Bãi đậu xe ôtô tại khách
                                            sạn
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Cho thuê xe
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Đặt tour, vé máy bay, dịch
                                            vụ du lịch
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Vệ sinh phòng sạch sẽ mỗi
                                            ngày
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
                                <div className="single-element-widget">
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Giặt ủi
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Thiết bị cao cấp trong
                                            phòng
                                        </Paragraph>
                                    </div>
                                    <div className="switch-wrap">
                                        <Paragraph>
                                            <CheckCircleFilled /> &nbsp; Không gian xanh, thoáng mát
                                        </Paragraph>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Divider></Divider>
                    </div>
                    <div className="detail_room_action">
                        <Row>
                            <Col
                                lg={{ span: '15' }}
                                md={{ span: '12' }}
                                sm={{ span: '24' }}
                                style={{ margin: 'auto' }}
                            >
                                <Button
                                    type="primary"
                                    icon={<GiftOutlined />}
                                    size={'middle'}
                                    style={{ background: '#fa9e1b', border: 'none', width: '100%' }}
                                >
                                    <Link to="/booknow" style={{ color: '#fff' }}>
                                        ĐẶT PHÒNG
                                    </Link>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={9} xl={9}>
                    <div className="detail_room_image">
                        <Carousel autoplay>
                            {item?.photos &&
                                item.photos.map((photo, index) => (
                                    <Image key={index} src={photo?.url} />
                                ))}
                        </Carousel>
                    </div>
                    <Paragraph
                        level={5}
                        italic
                        style={{
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                            marginTop: '1rem',
                        }}
                    >
                        Hình ảnh chi tiết
                    </Paragraph>
                </Col>
            </Row>
        </section>
    );
};

export default Detail;
