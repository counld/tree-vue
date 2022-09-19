<template>
  <div class="header-right">
    <div class="SearchInput searchInput" id="portal-helpCenterInput">
      <input
        class="wh"
        v-model="input"
        @input="change"
        placeholder="搜索信息"
      />
      <i class="el-icon-search icon"></i>
      <div class="search-container flex-column" v-show="isShow">
        <ul class="relation">
          <li
            class="search-link alone-ellipsis"
            v-for="item in restaurants"
            :key="item.id"
          >
            <router-link :to="`/mains/detail/${item.id}`" :title="item.title"
              >{{ item.title }}
            </router-link>
          </li>
        </ul>
        <div class="search-triangle"></div>
      </div>
    </div>
    <div class="messageList" style="height: 60px">
      <fullScreen />
      <span class="control">控制台</span>
    </div>
    <userDropdown />
  </div>
</template>

<script>
import userDropdown from "./user-dropdown.vue";
import fullScreen from "@/components/fullScreen";
import { queryApiArticleSearchList } from "@/utils/queryApi";
export default {
  name: "header-right",
  components: { userDropdown, fullScreen },
  props: ["size"],
  data() {
    return {
      input: "",
      restaurants: [],
      // timeout:  null,
      isShow: false,
      mask: null,
    };
  },
  mounted() {},
  beforeDestroy() {
    // clearTimeout(this.timeout);
    document.body.removeEventListener('click',this.isShowDisappear);
  },
  updated() {},
  methods: {
    change() {
      this.isShow = true;
      const input = this.input.toString();
      if (!input) return;
      this.debounce(this.loadAll(input), 300);
    },
    loadAll(input) {
      queryApiArticleSearchList.call(this, input).then((res) => {
        document.body.addEventListener('click',this.isShowDisappear,false);
        this.isShow = true;
        this.restaurants = res.data;
      });
    },
    isShowDisappear() {
      this.isShow = false;
    },
    debounce(fn, wait) {
      var timer = null;
      return function () {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, wait);
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-right {
  -webkit-text-size-adjust: 100%;
  --antd-wave-shadow-color: #1677ff;
  --scroll-bar: 0;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "tnum", "tnum";
  color: #333;
  font: 12px/1.14 PingFangSC-Regular, \5b8b\4f53;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 0;
  padding: 0 1rem;
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 1000;
  min-width: 230px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  font-size: 14px;
  line-height: 60px;
}
.control {
  margin-right: 10px;
}

.SearchInput {
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 35px;
}

.searchInput {
  margin-right: 1rem;
}

.SearchInput .icon {
  position: absolute;
  top: 10px;
  left: 8px;
  width: 12px;
  height: 12px;
}
.SearchInput input {
  display: inline-block;
  min-width: 0;
  margin: 0;
  padding: 4px 24px 5px;
  font-size: 14px;
  font-family: inherit;
  font-variant: tabular-nums;
  line-height: 22px;
  vertical-align: top;
  background-image: none;
  font-feature-settings: "tnum", "tnum";
  background-color: #fff;
  outline: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.search-container {
  width: 100%;
  text-align: center;
  position: absolute;
  line-height: 30px;
  color: -webkit-link;
  max-height: 200px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  top: 45px;
  left: 0;
  z-index: 999;
  background-color: #fff;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}

.search-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 7px 7px;
  border-color: transparent transparent #fff;
  position: absolute;
  z-index: 999;
  top: -7px;
  margin-left: 22px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.search-link {
  margin: 0 8px;
  border-bottom: 1px solid #666;
}
.relation {
  position: relative;
  overflow-y: auto;
}
input:hover {
  outline-color: none;
  -webkit-transition: border linear 0.2s, -webkit-box-shadow linear 0.5s;
  border-color: rgba(141, 39, 142, 0.75);
  box-shadow: 0 0 18px rgba(111, 1, 32, 3);
}
.messageList {
  position: relative;
  display: -ms-flexbox;
  text-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  color: #666;
}
</style>
