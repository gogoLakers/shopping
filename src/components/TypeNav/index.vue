<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托，给每个子元素绑定相同的事件 -->
      <div @mouseleave="leaveShow" @mouseenter="showTypeNav">
        <h2 class="all">全部商品分类</h2>
        <!-- 给三级联动过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="isShowTypeNav">
            <!-- 事件委托 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级联动 -->
              <div
                class="item"
                v-for="(c1, index) in categoryListData"
                :key="c1.categoryId"
                :class="{ current: getIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 给每级联动的a标签自定义属性 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: getIndex === index ? 'block' : 'none' }"
                >
                  <!-- 二级联动 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <!-- 给每级联动的a标签自定义属性 -->
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级联动 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 给每级联动的a标签自定义属性 -->
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 导航栏 -->
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      getIndex: -1,
      isShowTypeNav: true,
    };
  },
  mounted() {
    // 如果跳转至search,默认不展示三级联动
    if (this.$route.name === "search") {
      this.isShowTypeNav = false;
    }
  },
  computed: {
    ...mapState({
      categoryListData: (state) => state.home.categoryListData,
    }),
  },
  methods: {
    // 对经过的部分现实背景颜色进行节流操作
    changeIndex: throttle(function (index) {
      this.getIndex = index;
    }, 20),
    // 离开三级联动
    leaveShow() {
      this.getIndex = -1;
      if (this.$route.name === "search") {
        this.isShowTypeNav = false;
      }
    },
    // 跳转路由采用编程式路由+自定义属性（确保点击的是a标签）
    goSearch(e) {
      // dataset取到的属性值会把驼峰命名都变为小写!!
      // console.log(e.target.dataset);

      // 如果触发事件的元素含有categoryName这个属性,就可以解构出来(解构时去掉标签里的data)
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        // 如果点击的是a标签
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          // 如果是一级联动
          query.category1Id = category1id;
        } else if (category2id) {
          // 如果是二级联动
          query.category2Id = category2id;
        } else {
          // 如果是三级联动
          query.category3Id = category3id;
        }
        location.query = query;
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
    // 在search组件中显示隐藏三级联动部分
    showTypeNav() {
      this.isShowTypeNav = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        a {
          cursor: pointer;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .current {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画样式
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.2s linear;
    }
  }
}
</style>