import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthService = {
    login: async (params) => {
        let data = JSON.stringify(params);
        let config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/user/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };
        return axios(config).then(function (response) {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    },
    logout() {
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },
    getDetailUser: (data) => {
        return jwt_decode(data);
    },
};
export default AuthService;
