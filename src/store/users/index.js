import { reqPhoneCode, reqRegister, usersLogin, usersLoginInfo, usersLogout } from "@/api";
import { setToken, getToken, delToken } from "@/utils/setToken";

// 将登陆和注册和为一个仓库
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result = await reqPhoneCode(phone);
        if (result.code === 200) {
            commit('GETCODE', result.data);
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 注册
    async getRegister({ commit }, register) {
        let result = await reqRegister(register);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 登录
    async login({ commit }, data) {
        let result = await usersLogin(data);
        if (result.code === 200) {
            commit('LOGIN', result.data.token)
            setToken(result.data.token)
        } else {
            return Promise.reject(new Error('登陆失败'))
        }
    },
    // 登陆后获取用户信息（home组件）
    async loginInfo({ commit }) {
        let result = await usersLoginInfo();
        if (result.code === 200) {
            commit('LOGININFO', result.data);
            return 'ok'
        }
        else {
            return Promise.reject(new Error('登陆失败'))
        }
    },
    // 退出登录
    async logout({ commit }) {
        let result = await usersLogout();
        if (result.code === 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return new Promise(new Error('退出失败'))
        }
    }
}
const mutations = {
    // 获取验证码
    GETCODE(state, code) {
        state.code = code
    },

    LOGIN(state, token) {
        state.token = token
    },
    // 用户登录获取页面信息
    LOGININFO(state, loginInfoData) {
        state.loginInfoData = loginInfoData
    },
    //  清空state里面的token和loginInfoData
    CLEAR(state) {
        state.token = '',
            state.loginInfoData = {},
            delToken()
    }
}
const state = {
    // 仓库里面也要存一份验证码，可以和用户的输入码进行对比验证
    code: '',
    token: getToken(),
    loginInfoData: {}
}
const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}