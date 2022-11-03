import { Link } from 'react-router-dom';

import Banner from '../../components/Banner/Banner';
import RoomList from '../../components/RoomList/RoomList';
import RoomTypeList from '../../components/RoomTypeList/RoomTypeList';

import abi1 from '../../assets/images/abi1.webp';
import abi2 from '../../assets/images/abi2.webp';
import abi3 from '../../assets/images/abi3.webp';
const Home = () => {
    return (
        <>
            <Banner />
            <section className="tour">
                <div className="grid wide">
                    <div className="tour-content">
                        <h2 className="section-title">Chúng tôi có các loại phòng cao cấp</h2>
                        <p className="tour-text">
                            Các loại phòng có giá tốt nhất và chất lượng tốt nhất. Mang lại cho quý
                            khách những trải nghiệm tuyệt vời nhất. Dịch vụ đầy đủ, chất lượng cao
                            và nhiều đặc điểm tốt nhất.
                        </p>
                    </div>

                    <RoomTypeList />
                </div>
            </section>
            <section className="package">
                <div className="grid wide">
                    <div className="package-container">
                        <div className="package-content">
                            <h4 className="section-title">THIẾT KẾ HIỆN ĐẠI, SANG TRỌNG</h4>
                            <div className="package-rating">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                            </div>
                            <p className="package-desc">
                                Tọa lạc trong một công viên tư nhân, khách sạn thông gió tự nhiên
                                này có nhà hàng, spa và Wi-Fi miễn phí. Các phòng nghỉ có thiết kế
                                mở tại Palace Dalat trang nhã với lối trang trí kiểu thuộc địa Pháp
                                của những năm 1920 và sàn gỗ cứng. Mỗi phòng đều được trang bị
                                minibar, TV và tiện nghi pha cà phê/trà. Khách sạn cũng cung cấp
                                dịch vụ phòng 24 giờ.
                            </p>
                        </div>
                        <div className="btn-wrap">
                            <Link to="booknow" className="btn">
                                Book now...
                            </Link>
                            <div className="btn-bg"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="offers">
                <div className="grid wide">
                    <h4 className="section-title">PHÒNG CAO CẤP VỚI GIÁ TỐT NHẤT</h4>
                    <RoomList />
                </div>
            </section>
            <section className="about">
                <div className="grid wide about-container">
                    <h4 className="section-title">PHẢN HỒI TỪ KHÁCH HÀNG</h4>
                    <div className="about-content">
                        <div className="row">
                            <div className="col l-4 m-6 c-12">
                                <div
                                    className="about-item"
                                    style={{
                                        backgroundImage: `url('http://gogup.tech/images/sang_dev.jpg')`,
                                    }}
                                >
                                    <div className="about-item__icon">
                                        <img className="about-item__icon-img" src={abi1} alt="" />
                                    </div>
                                    <div className="about-item__content">
                                        <div className="about-item__header">
                                            <h6 className="about-item__name">BoizCoder</h6>
                                            <p className="about-item__date">3 Jul, 2022</p>
                                        </div>
                                        <div className="about-item__body">
                                            <span>" Dịch vụ tốt"</span>
                                            <p>
                                                Dịch vụ tốt cùng với giá cả phải chăng, tuyệt vời!
                                                Nhân viên phục vụ tận tình, lịch sự 😂
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col l-4 m-6 c-12">
                                <div
                                    className="about-item"
                                    style={{
                                        backgroundImage: `url('http://gogup.tech/images/avt_anhvu.jpg')`,
                                    }}
                                >
                                    <div className="about-item__icon">
                                        <img className="about-item__icon-img" src={abi2} alt="" />
                                    </div>
                                    <div className="about-item__content">
                                        <div className="about-item__header">
                                            <h6 className="about-item__name">QuangDev69</h6>
                                            <p className="about-item__date">01 Jun , 2022</p>
                                        </div>
                                        <div className="about-item__body">
                                            <span>" Đáng để trả nghiệm "</span>
                                            <p>
                                                Phòng ốc sạch sẽ, thiết bị mới, cao cấp. Nhân viên
                                                phục vụ tận tình, lịch sự 😂
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col l-4 m-6 c-6 hide-on-tb-mb">
                                <div
                                    className="about-item"
                                    style={{
                                        backgroundImage: `url('https://www.refinery29.com/images/10006376.jpg')`,
                                    }}
                                >
                                    <div className="about-item__icon">
                                        <img className="about-item__icon-img" src={abi3} alt="" />
                                    </div>
                                    <div className="about-item__content">
                                        <div className="about-item__header">
                                            <h6 className="about-item__name">THE BOYS</h6>
                                            <p className="about-item__date">May 24, 2020</p>
                                        </div>
                                        <div className="about-item__body">
                                            <span>" GOOD 🎉 "</span>
                                            <p>
                                                We don't speak Vietnamese, but we can still
                                                communicate in English. Everythings is good. We are
                                                the best.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
