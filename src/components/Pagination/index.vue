<template>
  <div class="pagination">
    <!-- 前面 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="numStarEnd.star > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-show="numStarEnd.star > 2">...</button>
    <!-- 中间 -->
    <button
      v-for="(page, index) in numStarEnd.end"
      :key="index"
      v-show="page >= numStarEnd.star"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>
    <!-- 后面 -->
    <button v-show="numStarEnd.end < totalPages - 1">...</button>
    <button
      v-show="numStarEnd.end < totalPages"
      @click="$emit('getPageNo', totalPages)"
      :class="{ active: pageNo === totalPages }"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo === totalPages"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    numStarEnd() {
      const { pageNo, continues, totalPages } = this;
      let star = 0;
      let end = 0;

      // 总页数比连续分页少
      if (totalPages < continues) {
        star = 1;
        end = totalPages;
      } else {
        // parseInt会自动去除小数位
        star = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 特殊情况
        if (star < 1) {
          star = 1;
          end = continues;
        }
        if (end > totalPages) {
          end = totalPages;
          star = end - continues + 1;
        }
      }
      return { star, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
