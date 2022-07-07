import { Outlet } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="main">
                <div className="main__content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Layout;
