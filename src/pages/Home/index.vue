<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor
      v-for="production in floorListData"
      :key="production.id"
      :production="production"
    />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  // floor组件要在home派发dispatch,因为floor组件复用了，且里面的数据据不一样
  mounted() {
    this.$store.dispatch("floorList");
  },
  computed: {
    ...mapState({
      floorListData: (state) => state.home.floorListData,
    }),
  },
};
</script>