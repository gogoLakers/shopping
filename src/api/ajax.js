// 引入axios
import axios from 'axios';

// 引入进度条
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入store获取uuid
import store from '@/store'


// 创建实例,对axios进行二次封装
let requests = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// 设置拦截器
requests.interceptors.request.use(function (config) {
    // 如过有uuid就把uuid给请求头，发送请求时带给服务器是识别，以返回对应的用户购物车数据
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    };
    // 有token就带给请求头
    if (store.state.users.token) {
        config.headers.token = store.state.users.token
    }
    // 进度条开始
    nprogress.start();
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
requests.interceptors.response.use(function (response) {
    // 进度条结束
    nprogress.done();
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default requests;