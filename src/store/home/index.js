import { reqgetBaseCategoryList, reqBannerList, reqFloorList } from '@/api';
const actions = {
    // 三级联动
    async categoryList({ commit }) {
        // result为发请求返回promise的成功的结果
        let result = await reqgetBaseCategoryList();
        // console.log(result);
        if (result.code === 200) commit('CATEGORYLIST', result.data);
    },
    // 轮播图
    async bannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code === 200) commit('BANNERLIST', result.data)
    },
    // floor部分数据请求
    async floorList({ commit }) {
        let result = await reqFloorList();
        if (result.code === 200) commit('FLOORLIST', result.data)
    }
};

const mutations = {
    CATEGORYLIST(state, categoryListData) {
        state.categoryListData = categoryListData.slice(0, 16);
    },
    BANNERLIST(state, bannerListData) {
        state.bannerListData = bannerListData;
    },
    FLOORLIST(state, floorListData) {
        state.floorListData = floorListData;
    }
};

const state = {
    categoryListData: [],
    bannerListData: [],
    floorListData: []
};

const getters = {

};

export default {
    // 开启命名空间
    // namespaced: true,
    actions,
    mutations,
    state,
    getters
}