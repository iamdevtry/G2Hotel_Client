import { useState } from 'react';
import validator from 'validator';
import { Row } from 'antd';
import AuthService from '../../../Services/Auth/auth-service';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const [errorUsername, setErrorUsername] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);

    function handleChange(evt) {
        const value = evt.target.value;
        setValues({
            ...values,
            [evt.target.name]: value,
        });
    }

    const handleLogin = async (e) => {
        if (validator.isEmpty(values.username)) {
            setErrorUsername('Vui lòng nhập tài khoản');
        } else {
            setErrorUsername(null);
        }
        if (validator.isEmpty(values.password)) {
            setErrorPassword('Vui lòng nhập mật khẩu');
        } else {
            setErrorPassword(null);
        }
        if (!validator.isEmpty(values.password) && !validator.isEmpty(values.username)) {
            setErrorLogin(null);
            await AuthService.login(values)
                .then((res) => {
                    //navigate to /admin
                    window.location.href = '/admin';
                })
                .catch((err) => {
                    setErrorLogin('Tài khoản hoặc mật khẩu không đúng');
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
                    <h3 className="title_color">Đăng Nhập</h3>
                    {errorLogin && <p className="error-text">{errorLogin}</p>}
                    <div>
                        <div className="form_login_input">
                            <input
                                onChange={handleChange}
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
                                required
                                className="single-input"
                            />
                            {errorUsername && <p className="error-text">{errorUsername}</p>}
                        </div>
                        <div className="form_login_input">
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                required
                                className="single-input"
                            />
                            {errorPassword && <p className="error-text">{errorPassword}</p>}
                        </div>
                        <div className="form_login_btn">
                            <Link to="/forgot-password">Quên mật khẩu</Link>
                        </div>
                        <br />
                        <div className="form_login_btn">
                            <button onClick={handleLogin} className="form_login_btn--login">
                                Đăng Nhập<span className="lnr lnr-arrow-right"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Row>
    );
};
export default Login;
