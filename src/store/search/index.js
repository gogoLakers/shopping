import { reqSearchList } from '@/api/index';

const actions = {
    // params = {}----如果有参数就用params，否则就用空对象，即默认传参
    async getSearchList({ commit }, params = {}) {
        const result = await reqSearchList(params);
        // console.log(result);
        if (result.code === 200) commit('GETSEARCHLIST', result.data)
    }
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};

const state = {
    searchList: {},
};

// getters主要用来简化数据
const getters = {
    goodsList(state) {
        // 假如网络较慢，返回空数组，没数据时至少是个数组，就不会是undefined
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    }
};

export default {
    // 开启命名空间
    // namespaced: true,
    actions,
    mutations,
    state,
    getters
}