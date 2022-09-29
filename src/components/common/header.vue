<template>
  <header>
    <div class="head">
      <div class="flex fullheight align-center">
        <div class="limit-width min-none">
          <img class="wh" :src="imageurl" />
        </div>
        <ul :class="['flex', 'font-size-20', 'link-list', isOpen ? '' : 'short-hight']" @click="openList">
					<div class="link-icon" ><i :class="['el-icon-s-unfold', isOpen ? 'rotated' : '' ]"></i></div>
          <li
            class="margin-left-10 link-item"
            v-for="(item, index) in routerlist"
            :key="index"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script>
import { routerMap } from "@/router/routerMap.js";

export default {
  name: "headers",
  props: ["imageUrl"],
  data() {
    return {
      imageurl: this.imageUrl || "/image/avatar.jpg",
      username: localStorage.getItem("username") || "新用户",
			isOpen: false,
			mask: null,
    };
  },
  mounted() {
	},
	beforeDestroy() {
  // 销毁
},
	methods: {
		openList(e) {
			e.stopPropagation(); //阻止冒泡  遮罩内元素不关闭（遮罩关闭）
			// e.preventDefault(); 
			this.isOpen = !this.isOpen;
		}
	},
  computed: {
    copylist() {
      routerMap.map((item) => {
        if (item.path === "/mains/home") {
          item.path = item.path + "/" + this.username;
        }
        return routerMap;
      });
      return routerMap;
    },
    routerlist() {
      return this.copylist;
    },
  },
};
</script>
<style scoped>
header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 70px;
  opacity: 0.8;
  background-color: #f5f5f5;
}

.head {
  position: relative;
  padding-top: 10px;
  width: 100%;
  height: 100%;
}

.head::after {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  background: black
    linear-gradient(
      to left,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
}
.link-icon {
	display: none;
}
.router-link-active {
  color: #1677ff;
  position: relative;
}

.router-link-active::before {
  position: absolute;
  bottom: -45%;
  left: 50%;
  width: 50%;
  height: 4px;
  background-color: #226bf3;
  border-radius: 2px;
  transform: translateX(-50%);
  content: "";
}
.limit-width {
  width: 50px;
  height: 50px;
  margin: 0 20px;
}
@media (max-width: 640px) {
	.short-hight {
		height: 30px;
		overflow: hidden;
	}
  .link-list {
    width: 35px;
    flex-direction: column;
    background: white;
    position: absolute;
    align-items: center;
    top: 25px;
		cursor: pointer;
    z-index: 999;
    left: 1rem;
		pointer-events: painted;
		transition: all 1s ease-in-out 1s;
  }
  .link-item {
    margin: auto;
    width: 50%;
    flex: 1;
		transition: all 1s ease-in-out 1s;
    margin-top: 10px;
  }
	.router-link-active::before {
		bottom: -15%;
	}
	.link-icon {
		display: block;
		font-size: 24px;
    text-align: center;
	}
	.rotated {
		color: #ff2d55;
		transform: rotateZ(90deg);
	}
}

</style>