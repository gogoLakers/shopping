import { reqUserAddressList, reqTradeList } from "@/api";

const actions = {
    // 获取用户地址信息
    async userAddressList({ commit }) {
        let result = await reqUserAddressList();
        if (result.code === 200) {
            commit('USERADDRESSLIST', result.data);
        }
    },

    // 获取用户订单物品信息
    async tradeList({ commit }) {
        let result = await reqTradeList();
        if (result.code === 200) {
            commit('TRADELIST', result.data);
        }
    }
}

const mutations = {
    USERADDRESSLIST(state, userAddressListData) {
        state.userAddressListData = userAddressListData
    },

    TRADELIST(state, tradeListData) {
        state.tradeListData = tradeListData
    }
}

const state = {
    tradeListData: {},
    userAddressListData: []
}

const getters = {
    tradeList(state) {
        return state.tradeListData || {}
    },
    userAddressList(state) {
        return state.userAddressListData || []
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}