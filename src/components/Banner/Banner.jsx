import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    return (
        <section className="banner_area">
            <div className="header-slider">
                <div className="header-slider__content">
                    <h1 className="header-slider__heading">G2HOTEL</h1>
                    <span className="header-slider__heading">the best hotel</span>
                </div>
                <div className="btn-wrap">
                    <div className="btn-bg"></div>
                    <span className="btn">
                        <Link to="/booknow" style={{ color: '#fff' }}>
                            Đặt phòng ngay ....
                        </Link>
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Banner;
