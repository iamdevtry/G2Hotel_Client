import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiftOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import './header.css';

import logo_transparent from '../../assets/logo_transparent.png';
const menuMobile = (
    <Menu
        items={[
            {
                label: <Link to="/">Trang chủ</Link>,
                key: '0',
            },
            {
                label: <Link to="/about">Giới thiệu</Link>,
                key: '1',
            },
            {
                label: <Link to="/policy">Chính sách</Link>,
                key: '2',
            },
            {
                label: <Link to="/check-payment">Tra cứu</Link>,
                key: '3',
            },
            {
                label: <Link to="/contact">Liên hệ</Link>,
                key: '4',
            },
            {
                type: 'divider',
            },
            {
                label: (
                    <Link to="/booknow" style={{ color: '#fa9e1b' }}>
                        ĐẶT PHÒNG
                    </Link>
                ),
                key: '5',
            },
        ]}
    />
);
const headerNav = [
    {
        display: 'Trang chủ',
        path: '/',
    },
    {
        display: 'Giới thiệu',
        path: '/about',
    },
    {
        display: 'Chính sách',
        path: '/policy',
    },
    {
        display: 'Tra cứu',
        path: '/check-payment',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
];
const Header = () => {
    const { pathname } = useLocation();

    const headerRef = useRef(null);

    const active = headerNav.findIndex((e) => e.path === pathname);
    return (
        <div className="header_component">
            <header className="header">
                <div className="header-topbar hide-on-mb">
                    <div className="grid wide header-topbar-container">
                        <div className="header-topbar__contact">
                            <ul style={{ paddingTop: '12px' }}>
                                <li>
                                    <a href="https://www.facebook.com/phongtrollisdabest/">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://github.com/iamdevtry">
                                        <i className="fab fa-github"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="www.linkedin.com/in/phongtrollx2">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="http://gogup.tech/">
                                        <i class="fas fa-globe"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header-nav">
                    <div className="grid wide">
                        <div className="row">
                            <div className="header-nav-container">
                                <div className="col l-3 m-6 c-6">
                                    <Link to="/" className="header-nav__logo">
                                        <img src={logo_transparent} alt="" /> G2Hotel
                                    </Link>
                                </div>
                                <div className="col l-6 m-0 c-0">
                                    <div className="header-nav__list">
                                        <ul>
                                            {headerNav.map((e, i) => (
                                                <li
                                                    key={i}
                                                    className={`header-nav__item ${
                                                        i === active
                                                            ? 'header-nav__item--active'
                                                            : ''
                                                    }`}
                                                >
                                                    <Link to={e.path}>{e.display}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col l-3 m-6 c-6">
                                    <div className="header-nav__control-mb">
                                        <div className="header-nav__search ">
                                            <Button
                                                className="hide-on-tb-mb"
                                                type="primary"
                                                icon={<GiftOutlined />}
                                                size={'middle'}
                                                style={{ background: '#fa9e1b', border: 'none' }}
                                            >
                                                <Link to="/booknow" style={{ color: '#fff' }}>
                                                    ĐẶT PHÒNG
                                                </Link>
                                            </Button>
                                            <div className="hide-on-pc">
                                                <Dropdown overlay={menuMobile} trigger={['click']}>
                                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                                        <MenuOutlined
                                                            style={{
                                                                fontSize: '28px',
                                                                color: 'white',
                                                            }}
                                                        />
                                                    </a>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};
export default Header;
