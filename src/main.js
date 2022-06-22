import Vue from 'vue'
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from './store'

// 引入element组件
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router'
Vue.config.productionTip = false

// 注册全局组件（使用时不需要重新引入和注册）
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//引入mock(mockServe没有对外暴露，不用写from，这里在入口文件引入可以直接在最开始执行一次)
import './mock/mockServe';

// 引入swiper
import 'swiper/css/swiper.css';

// 引入图片
import loadingImg from '@/assets/logo.png'
// 引入图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: loadingImg,
})

// 同意引入api文件夹里的全部请求函数
import * as API from "@/api"
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
})
