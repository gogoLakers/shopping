<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 购物车商品 -->
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <!-- 是否勾选 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="checkCartChange(cartInfo, $event)"
            />
          </li>
          <!-- 商品介绍 -->
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <!-- 商品价格 -->
          <li class="cart-list-con4">
            <span class="price">￥{{ cartInfo.skuPrice }}.00</span>
          </li>
          <!-- 商品数量 -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('reduce', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <!-- 单品总价 -->
          <li class="cart-list-con6">
            <span class="sum"
              >￥{{ cartInfo.skuPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <!-- 删除商品 -->
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="delCart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="checkAllList"
          :disabled="cartInfoList.length == 0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCartChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("cartList");
    },
    // 数量变化
    handler: throttle(async function (type, disNum, cartInfo) {
      switch (type) {
        case "add":
          disNum = disNum;
          break;
        case "reduce":
          if (cartInfo.skuNum <= 1) {
            disNum = 0;
          } else {
            disNum = disNum;
          }
          break;
        case "change":
          if (isNaN(disNum) || disNum <= 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        await this.$store.dispatch("addToCart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
    // 删除商品
    async delCart(skuId) {
      try {
        await this.$store.dispatch("delCart", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 勾选状态
    async checkCartChange(cartInfo, e) {
      try {
        let checked = e.target.checked === true ? 1 : 0;
        await this.$store.dispatch("checkCart", {
          skuID: cartInfo.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除勾选商品
    async deleteCartChecked() {
      try {
        await this.$store.dispatch("delCartChecked");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全部勾选
    checkAllList: throttle(async function (e) {
      let isChecked = e.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("checkAll", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),
  },
  computed: {
    ...mapGetters(["cartInfoListData"]),
    cartInfoList() {
      return this.cartInfoListData.cartInfoList || [];
    },
    isAllChecked() {
      // every判断是否所有item都满足条件，若满足即返回true，但凡有一个不满足即返回false
      return this.cartInfoList.every((item) => item.isChecked === 1);
    },
    // 总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => (sum += item.skuPrice * item.skuNum));
      return sum;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>