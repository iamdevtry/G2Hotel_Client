import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../pages/_layout/Layout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Admin from '../pages/Admin/Admin';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import AddRoom from '../pages/Admin/Room/AddRoom/AddRoom';
import ListRoom from '../pages/Admin/Room/ListRoom/ListRoom';
import EditRoom from '../pages/Admin/Room/EditRoom/EditRoom';
import AddUser from '../pages/Admin/User/AddUser/AddUser';
import ListUser from '../pages/Admin/User/ListUser/ListUser';
import EditUser from '../pages/Admin/User/EditUser/EditUser';
import ListService from '../pages/Admin/Service/ListService/ListService';
import EditService from '../pages/Admin/Service/EditService/EditService';
import AddService from '../pages/Admin/Service/AddService/AddService';
import ListRoomType from '../pages/Admin/RoomType/ListRoomType/ListRoomType';
import AddRoomType from '../pages/Admin/RoomType/AddRoomType/AddRoomType';
import EditRoomType from '../pages/Admin/RoomType/EditRoomType/EditRoomType';
import VNPay from '../pages/Payment/VNPay';
import VNPayReturn from '../pages/Payment/VNPayReturn';
import Detail from '../pages/Detail/Detail';
import Booknow from '../pages/Booknow/Booknow';
import Info from '../pages/Admin/Info/Info';
import DetailPayment from '../pages/Admin/DetailPayment/DetailPayment';
import CheckDetailPayment from '../pages/CheckDetailPayment/CheckDetailPayment';
import Login from '../pages/Account/Login/Login';
import PersonalInfomation from '../pages/Admin/PersonalInfomation/PersonalInfomation';
import ForgotPassword from '../pages/Account/ForgotPassword/ForgotPassword';
import Policy from '../pages/Policy/Policy';

const RouteConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="policy" element={<Policy />} />
                    <Route path="login" element={<Login />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="booknow" element={<Booknow />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path="check-payment" element={<CheckDetailPayment />} />
                </Route>
                <Route path="/checkout" element={<MainLayout />}>
                    <Route index element={<VNPay />} />
                    <Route path="vnpay_return" element={<VNPayReturn />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="info-payment" element={<Info />} />
                    <Route path="info-payment/:id" element={<DetailPayment />} />
                    <Route path="room-list" element={<ListRoom />} />
                    <Route path="add-room" element={<AddRoom />} />
                    <Route path="edit-room/:id" element={<EditRoom />} />
                    <Route path="add-user" element={<AddUser />} />
                    <Route path="user-list" element={<ListUser />} />
                    <Route path="edit-user/:username" element={<EditUser />} />
                    <Route path="service-list" element={<ListService />} />
                    <Route path="add-service" element={<AddService />} />
                    <Route path="edit-service/:id" element={<EditService />} />
                    <Route path="room-types-list" element={<ListRoomType />} />
                    <Route path="add-room-type" element={<AddRoomType />} />
                    <Route path="edit-room-type/:id" element={<EditRoomType />} />
                    <Route path="personal-information/:username" element={<PersonalInfomation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RouteConfig;
