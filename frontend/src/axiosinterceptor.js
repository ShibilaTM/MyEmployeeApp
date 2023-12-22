import axios from 'axios'

const axiosInstance= axios.create({
    baseURL:'http://localhost:4000'
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = sessionStorage.getItem('userToken');
    const adminToken = sessionStorage.getItem('adminToken');

    // Check if the request is for an admin
    const isAdminRequest = config.headers.isAdminRequest;

    if (isAdminRequest && adminToken) {
        config.headers.token = adminToken;
    } else if (accessToken) {
        config.headers.token = accessToken;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
export default axiosInstance