import { reqCartList, deleteCart, reqCheckCart } from '@/api'

const actions = {
    // 获取购物车信息
    async cartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit('CARTLIST', result.data);
        }
    },
    // 删除购物车商品
    async delCart({ commit }, skuId) {
        let result = await deleteCart(skuId);
        console.log(result);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 商品勾选状态
    async checkCart({ commit }, { skuID, isChecked }) {
        let result = await reqCheckCart(skuID, isChecked);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除已选商品
    delCartChecked({ dispatch, getters }) {
        let promiseAll = []
        getters.cartInfoListData.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('delCart', item.skuId) : '';
            promiseAll.push(promise)
        });
        // 用promise.all方法（传入一个数组，只有全部为成功，才为成功）
        return Promise.all(promiseAll);
    },
    // 全部勾选
    checkAll({ dispatch, getters }, isChecked) {
        let promiseAll = []
        getters.cartInfoListData.cartInfoList.forEach(item => {
            let promise = dispatch('checkCart', { skuID: item.skuId, isChecked });
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
};
const mutations = {
    // 购物车信息
    CARTLIST(state, cartList) {
        state.cartList = cartList
    },
};
const state = {
    cartList: [],
};
const getters = {
    cartInfoListData(state) {
        return state.cartList[0] || {}
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}