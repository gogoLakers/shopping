
// 路由懒加载(减小打包时的js文件体积)
export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { isShowMyFooter: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: { isShowMyFooter: true }
    },
    {
        name: 'detail',
        path: '/detail/:skuId?',
        component: () => import('@/pages/Detail'),
        meta: { isShowMyFooter: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { isShowMyFooter: true }
    },
    {
        // name: 'shopcart',
        path: '/shopcart',
        component: () => import('@/pages/ShopCart'),
        meta: { isShowMyFooter: true }
    },
    {
        // name: 'trade',
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { isShowMyFooter: true },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        // name: 'pay',
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { isShowMyFooter: true },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        // name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { isShowMyFooter: true }
    },
    {
        // name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { isShowMyFooter: true },
        // 二级路由配置
        children: [{
            path: 'myorder',
            component: () => import('@/pages/Center/MyOrder'),
        },
        {
            path: 'grouporder',
            component: () => import('@/pages/Center/GroupOrder'),
        },
        {
            // 重定向（一级路由为center时，默认二级路由为myorder）
            path: '/center',
            redirect: '/center/myorder'
        }]
    },
    {
        // name: 'login',
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { isShowMyFooter: false }
    },
    {
        // name: 'register',
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { isShowMyFooter: false }
    },
    {
        path: '*',
        redirect: '/home'
    }
]