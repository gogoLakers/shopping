import { reqGoodsInfo, reqAddToCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'

const actions = {
    // 请求商品详情数据
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) commit('GETGOODSINFO', result.data)
    },
    // 将商品添加到购物车
    //async 会返回一个promise
    async addToCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddToCart(skuId, skuNum);
        // result.data是一个空对象，即请求不返回数据，只返回请求是否成功
        //成功即返回一个成功的promise给detail组件，失败则返回一个失败的promise给detail
        if (result.code === 200) {
            return 'OK';
        } else {
            return Promise.reject(new Error('错误'));
        }
    }
};
const mutations = {
    GETGOODSINFO(state, getGoodsInfoData) {
        state.getGoodsInfoData = getGoodsInfoData;
    }
};
const state = {
    getGoodsInfoData: {},
    uuid_token: getUUID(),
};
const getters = {
    categoryView(state) {
        return state.getGoodsInfoData.categoryView || {}
    },
    skuInfo(state) {
        return state.getGoodsInfoData.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.getGoodsInfoData.spuSaleAttrList || []
    }
};

export default {
    actions,
    mutations,
    state,
    getters
}