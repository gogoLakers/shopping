<template>
  <div id="app">
    <MyHeader />
    <router-view></router-view>
    <MyFooter v-show="$route.meta.isShowMyFooter" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";

export default {
  name: "App",
  components: { MyHeader, MyFooter },
  mounted() {
    // 页面首次渲染时发请求,将获取的三级联动数据存在state中(避免切换路由时频繁请求相同的数据)
    this.$store.dispatch("categoryList");
  },
};
</script>

