// 引入二次封装的axios
//requests相当于axios，就是增加了一些配置，对axios二次封装得到的，发送请求也是返回一个promis
import requests from './ajax.js';
// 引入mock模拟数据请求（实际向服务器发请求会被拦截---用于前端）
import mockRequests from './mockAjax.js';

// 定义一些发请求的函数给组件发请求时候调用

// Home组件

// 三级联动接口   /api/product/getBaseCategoryList   get  无参数
export const reqgetBaseCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
});
// 大轮播图
export const reqBannerList = () => mockRequests.get('/banner');
// floor部分
export const reqFloorList = () => mockRequests.get('/floor')


// Search组件
//  /api/list   post请求，有参数
// 当前这个接口给服务器发请求时，必须传递一个参数params，至少是一个空对象(可将默认参数设置为空对象)
export const reqSearchList = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

// 获取商品的详情信息 /api/item/{ skuId }  GET
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

// 将商品添加到购物车   /api/cart/addToCart/{ skuId }/{ skuNum }      post
export const reqAddToCart = (skuId, skuNum) => requests({ url: `cart/addToCart/${skuId}/${skuNum}`, method: 'post' })


// 购物车数据 / api / cart / cartList    get
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除商品   /api/cart/deleteCart/{skuId}    delete
export const deleteCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

// /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqCheckCart = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

// 获取验证码   /api/user/passport/sendCode/{phone}  get
export const reqPhoneCode = (phone) => requests({ url: `/user/passport/sendCode/${phone} `, method: 'get' })

// 新用户注册     /api/user/passport/register    post       data{phone,password,code }
export const reqRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

// 用户登录    /api/user/passport/login   post      data{phone password}
export const usersLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

// 用户登陆后获取页面信息   /api/user/passport/auth/getUserInfo   get
export const usersLoginInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登录     /api/user/passport/logout   get
export const usersLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取订单页详情   /api/order/auth/trade   get
export const reqTradeList = () => requests({ url: '/order/auth/trade', method: 'get' })

// 获取用户地址   /api/user/userAddress/auth/findUserAddressList    method:get
export const reqUserAddressList = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 提交订单     /api/order/auth/submitOrder?tradeNo={tradeNo}   POST
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })


// 获取订单支付信息    /api/payment/weixin/createNative/{orderId}   GET
export const createNative = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付状态    /api/payment/weixin/queryPayStatus/{orderId}   GET
export const payStatus = (orderId) => requests({ url: `payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取订单列表     /api/order/auth/{page}/{limit}   get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
