import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入小仓库（vuex模块化）
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from './shopcart';
import users from './users';
import trade from './trade';

export default new Vuex.Store({
    modules: {
        // 命名空间名字
        home,
        search,
        detail,
        shopcart,
        users,
        trade
    }
})
