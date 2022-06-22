<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademarkInfo">×</i>
            </li>
            <!-- 属性面包屑 -->
            <li
              class="with-x"
              v-for="(propsElement, index) in searchParams.props"
              :key="index"
            >
              {{ propsElement.split(":")[1]
              }}<i @click="removeAttrsInfo(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo="attrsInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 排序 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-xiajiantou': isDesc,
                        'icon-shangjiantou': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-xiajiantou': isDesc,
                        'icon-shangjiantou': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`" target="_blank"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link
                      target="_blank"
                      :to="`/detail/${goods.id}`"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        // 分类名
        categoryName: "",
        keyword: "",
        // 排序(默认综合降序)
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        // 售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 发请求之前要将searchParams带上（也就是在moutd之前）
  beforeMount() {
    //  Object.assign合并对象（整理好数据，当作参数向服务器发请求）
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  // 组件挂在完毕请求一次数据，仅一次
  mounted() {
    this.getSearchListData();
  },
  computed: {
    // 获取商品数据
    ...mapGetters(["goodsList"]),
    // 排序数据
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    // 获取总共的数据总数
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    // 派发给仓库
    getSearchListData() {
      // this.$store.dispatch("search/searchList", {}); //存在命名空间---空间名加在函数前面！！
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 清空id
    clearCategoryId() {
      // undefined不会被当成参数向服务器发请求,减少性能消耗
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    // 三级联动面包屑删除
    removeCategoryName() {
      // this.clearCategoryId();
      this.searchParams.categoryName = undefined;
      // 再次跳转路由,route的路径改变会被检测到,会自动发请求
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },
    // 关键字面包屑删除
    removeKeyword() {
      // 给服务器携带的keyword参数清空
      this.searchParams.keyword = undefined;
      // 调整路径
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });
      // 通知MyHeader组件清空搜索框
      this.$bus.$emit("clearKeyword");
    },
    // 自定义事件获取点击的品牌(子传父)
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getSearchListData();
    },
    // 品牌面包屑删除
    removeTrademarkInfo() {
      this.searchParams.trademark = "";
      this.getSearchListData();
    },
    // 自定义事件获取点击的属性(子传父)
    attrsInfo(attrs, attrValue) {
      // 将子组件传过来的获取到的数据push给props属性
      let recProps = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      if (this.searchParams.props.indexOf(recProps) === -1) {
        this.searchParams.props.push(recProps);
        this.getSearchListData();
      }
    },
    // 属性面包屑删除
    removeAttrsInfo(index) {
      // 原地删除原数组中被点击的面包屑(会改变原数组)
      this.searchParams.props.splice(index, 1);
      this.getSearchListData();
    },
    // 商品排序
    changeOrder(value) {
      if (this.searchParams.order.indexOf(value) !== -1) {
        let point = this.searchParams.order.split(":")[1];
        this.searchParams.order = `${value}:${
          point === "desc" ? "asc" : "desc"
        }`;
      } else {
        this.searchParams.order = `${value}:desc`;
      }
      this.getSearchListData();
    },
    // 获取被点击的分页器按钮
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getSearchListData();
    },
  },
  watch: {
    // $route与data中的数据同一等级，可以直接监听
    $route: {
      handler() {
        // 每次检测到数据变化时，要将searchParams3个id清空,防止上请求的id没有被覆盖，还留着
        this.clearCategoryId();
        // 发请求之前重新整理参数
        Object.assign(this.searchParams, this.$route.params, this.$route.query);
        this.getSearchListData();
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>