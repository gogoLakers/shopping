// 引入Vue以使用use方法
import Vue from 'vue';

// 引入路由
import VueRouter from 'vue-router';

// 引入仓库
import store from "@/store";

// 使用路由插件
Vue.use(VueRouter);

// 重写push,replace
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location) {
    return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
    return originalPush.call(this, location).catch(err => err)
}

// 引入路由配置
import routes from './routes'

// 配置路由规则
let router = new VueRouter({
    routes,
});

router.beforeEach(async (to, from, next) => {
    // 仓库相关数据
    let token = store.state.users.token
    let name = store.state.users.loginInfoData.name

    // 1.判断是否登录(通过仓库有无token进行判断)
    if (token) {
        // 2.判断是否跳转到登录页面  
        if (to.path === '/login') {
            // 如是，则表示不能跳转至登陆页面,停留在home页面
            next('/home');
        } else {
            //跳转前判断仓库有无登陆后的用户信息
            //如有name则直接放行
            if (name) {
                next();
            } else {
                //没有name则需要获取用户信息后再放行
                try {
                    await store.dispatch('loginInfo');
                    next();
                } catch (error) {
                    // 错误情况为token过期,获取不到信息
                    //则需要清除token重新获取token登陆
                    await store.dispatch('logout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登录时除了trade\pay\paysuccess\center等页面都放行,如果是上述页面,则跳转至登陆页
        let topath = to.path;
        if (topath.indexOf('trade') != -1 || topath.indexOf('pay') != -1 || topath.indexOf('center') != -1) {
            // 跳转至登陆页面时,将未登录时想去的路由以query带给登录页
            next('/login?redirect=' + topath)
        } else {
            next()
        }
    }
})

// 默认暴露
export default router