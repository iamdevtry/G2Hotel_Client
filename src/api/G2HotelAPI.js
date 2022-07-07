import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import axiosClient from './axiosClient';
import authHeader from '../Services/Auth/auth-header';

const G2HotelAPI = {
    uploadImage: async (images) => {
        var data = new FormData();
        data.append('file', fs.createReadStream(images.target[0].value));

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/room/add-multi-photo',
            headers: {
                ...data.getHeaders(),
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    addRoom: (params) => {
        var data = JSON.stringify(params);

        var config = {
            method: 'post',
            url: 'https://g2hotel-api.herokuapp.com/api/room/add-room',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    getRooms: async () => {
        const url = '/api/room/get-rooms';
        return await axiosClient.get(url);
    },
    getRoomById: async (id) => {
        const url = `/api/room/${id}`;
        return await axiosClient.get(url);
    },
    deleteMultiImage: async (roomId, listPhotos) => {
        var data = JSON.stringify({
            roomId: roomId,
            photos: listPhotos,
        });
        var config = {
            method: 'delete',
            url: 'https://g2hotel-api.herokuapp.com/api/room/delete-multi-photo',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    deleteSingleImageOfRoomType: async (roomTypeId, photo) => {
        var data = JSON.stringify({
            roomTypeId: roomTypeId,
            photoId: photo,
        });
        console.log(data);
        var config = {
            method: 'delete',
            url: 'https://g2hotel-api.herokuapp.com/api/roomtype/delete-photo',
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader().Authorization,
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
    },
    getAllUsers: async () => {
        const url = '/api/user/all';
        let config = {
            headers: authHeader(),
        };
        return await axiosClient.get(url, config);
    },
    getUserByUsername: async (username) => {
        const url = `/api/user/${username}`;
        let config = {
            headers: authHeader(),
        };
        return await axiosClient.get(url, config);
    },
    getServices: async () => {
        const url = '/api/service/get-services';
        return await axiosClient.get(url);
    },
    getServicesById: async (id) => {
        const url = `/api/service/${id}`;
        return await axiosClient.get(url);
    },
    getAllRoomTypes: async () => {
        const url = '/api/roomtype/get-roomTypes';
        return await axiosClient.get(url);
    },
    getRoomTypeById: async (id) => {
        const url = `/api/roomtype/${id}`;
        return await axiosClient.get(url);
    },
    getAllRoomTypesWithCheckInOutDate: async (checkIn, checkOut) => {
        const url = `/api/roomtype/${checkIn}/${checkOut}`;
        return await axiosClient.get(url);
    },
    getAllPayments: async () => {
        const url = '/api/payment';
        return await axiosClient.get(url);
    },
    getDetailPaymentById: async (id) => {
        const url = `/api/payment/detail/${id}`;
        return await axiosClient.get(url);
    },
    getRoles: async () => {
        const url = '/api/role';
        let config = {
            headers: authHeader(),
        };
        return await axiosClient.get(url, config);
    },
    getInfoOfUser: async (username) => {
        const url = `/api/account/${username}`;
        let config = {
            headers: authHeader(),
        };
        return await axiosClient.get(url, config);
    },
    changePassword: async (params) => {
        const url = '/api/account/change-password';
        let config = {
            headers: authHeader(),
        };
        return await axiosClient.put(url, params, config);
    },
    resetPassword: async (params) => {
        const url = '/api/account/reset-password';
        let config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return await axiosClient.post(url, params, config);
    },
};

export default G2HotelAPI;
