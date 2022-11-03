import fb1 from '../../assets/images/fb1.webp';
import fb2 from '../../assets/images/fb2.webp';
import fb3 from '../../assets/images/fb3.webp';
import fi1 from '../../assets/images/fi1.svg';
import fi2 from '../../assets/images/fi2.svg';
import fi3 from '../../assets/images/fi3.svg';
import fi4 from '../../assets/images/fi4.svg';

import logo_transparent from '../../assets/logo_transparent.png';
const Footer = () => {
    return (
        <footer className="footer" style={{ marginTop: '100px' }}>
            <div className="grid wide footer-container">
                <div className="row">
                    <div className="col l-3 m-6 c-12">
                        <div className="footer-item">
                            <div className="footer-item__name">
                                <div className="footer-logo">
                                    <div className="col l-3 m-6 c-6">
                                        <a href="#" className="header-nav__logo">
                                            <img src={logo_transparent} alt="" />
                                        </a>
                                    </div>
                                    <span className="footer-logo__name">G2Hotel</span>
                                </div>
                            </div>
                            <div className="footer-item__content">
                                <p>
                                    G2 Hotel Luxury tọa lạc tại trung tâm thành phố Đà Lạt, cách
                                    Dinh Bảo Đại chưa đến 300 m. Các phòng nghỉ có thiết kế mở tại
                                    Palace Dalat trang nhã với lối trang trí kiểu thuộc địa Pháp của
                                    những năm 1920...
                                </p>
                                <div className="footer__about-social-list">
                                    <a
                                        className="footer__about-social-link"
                                        href="https://www.facebook.com/phongtrollisdabest/"
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a
                                        className="footer__about-social-link"
                                        href="https://github.com/iamdevtry"
                                    >
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a
                                        className="footer__about-social-link"
                                        href="www.linkedin.com/in/phongtrollx2"
                                    >
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col l-3 m-6 c-12">
                        <div className="footer-item">
                            <div className="footer-item__name">
                                <h4 style={{ color: '#fff' }}>Thông tin liên hệ</h4>
                            </div>
                            <div className="footer-item__content">
                                <div className="footer-info-item">
                                    <img src={fi1} className="footer-info-item__img"></img>
                                    <a href="" className="footer-info-item__content">
                                        475A Điện Biên Phủ, Q.Bình Thạnh, TPHCM
                                    </a>
                                </div>
                                <div className="footer-info-item">
                                    <img src={fi3} className="footer-info-item__img"></img>
                                    <a href="" className="footer-info-item__content">
                                        me@devtry.net
                                    </a>
                                </div>
                                <div className="footer-info-item">
                                    <img src={fi4} className="footer-info-item__img"></img>
                                    <a href="http://gogup.tech/" className="footer-info-item__content">
                                        www.gogup.tech
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    Copyright © 2022 By{' '}
                    <a href="https://devtry.net" className="footer-copyright__link">
                        Devtry
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
