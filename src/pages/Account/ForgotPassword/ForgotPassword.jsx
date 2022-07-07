import { useState } from 'react';
import validator from 'validator';
import { Row, Spin } from 'antd';
import AuthService from '../../../Services/Auth/auth-service';
import G2HotelAPI from '../../../api/G2HotelAPI';
const ForgotPassword = () => {
    const [values, setValues] = useState({
        Email: '',
    });

    const [errorEmail, setErrorEmail] = useState(null);
    const [isEmptyEmail, setIsEmptyEmail] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [messageResetPassword, setMessageResetPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    function handleChange(evt) {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    }

    const handleLogin = async (e) => {
        if (validator.isEmpty(values.Email)) {
            setIsEmptyEmail('Vui lòng nhập email');
        } else {
            setIsEmptyEmail(null);
            if (!validator.isEmail(values.Email)) {
                setErrorEmail('Email không hợp lệ');
            } else {
                setErrorEmail(null);
            }
        }

        if (!validator.isEmpty(values.Email) && validator.isEmail(values.Email)) {
            setErrorLogin(null);
            setErrorMessage(null);
            setMessageResetPassword(null);
            setIsEmptyEmail(null);
            setIsLoading(true);
            await G2HotelAPI.resetPassword(values)
                .then((res) => {
                    setMessageResetPassword(
                        'Một email đã được gửi đến email của bạn. Vui lòng kiểm tra email. Trang web sẽ chuyển đến trang đăng nhập trong 3s nữa'
                    );
                    setTimeout(() => {
                        setIsLoading(false);
                        window.location.href = '/login';
                    }, 3000);
                })
                .catch((err) => {
                    setIsLoading(false);
                    setErrorMessage(err.response.data);
                });
        }
    };
    return (
        <Row>
            <div className="login_page">
                <div
                    className="form_login_control"
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                        padding: '20px',
                        borderRadius: '10px',
                    }}
                >
                    <h3 className="title_color">Lấy lại mật khẩu</h3>
                    {errorLogin && <p className="error-text">{errorLogin}</p>}
                    <div>
                        <div className="form_login_input">
                            <input
                                onChange={handleChange}
                                type="email"
                                name="Email"
                                placeholder="Nhập email"
                                required
                                className="single-input"
                            />
                            {errorEmail && <p className="error-text">{errorEmail}</p>}
                            {isEmptyEmail && <p className="error-text">{isEmptyEmail}</p>}
                        </div>
                        {messageResetPassword && (
                            <p className="success-text">{messageResetPassword}</p>
                        )}
                        {errorMessage && <p className="error-text">{errorMessage}</p>}
                        <br />
                        <div className="form_login_btn">
                            <button
                                disabled={isLoading}
                                onClick={handleLogin}
                                className="form_login_btn--login"
                            >
                                {isLoading ? <Spin /> : ''}
                                Xác nhận<span className="lnr lnr-arrow-right"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Row>
    );
};
export default ForgotPassword;
