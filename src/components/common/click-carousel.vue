<template>
  <el-card class="box-card" body-style="padding: 4px">
    <div class="click-carousel">
      <div
        v-for="(imgItem,index) in imgList"
        ref="carousel"
        :key="imgItem.id"
        :class="['wh img-node', isAction == index ? 'action' : '']"
      >
      {{imgItem.count}}
        <img
          class="wh"
          :src="imgItem.url"
          :alt="imgItem.title"
          :title="imgItem.title"
        />
      </div>
    </div>
    <div class="flex my-button-warp">
      <button class="arrow-left" @click="handleLeft"><i class="el-icon-arrow-left"></i></button>
      <button class="arrow-right" @click="handleRight"><i class="el-icon-arrow-right"></i></button>
    </div>
  </el-card>
</template>

<script>
  const imgLists = [
        {
          id: 1,
          url: "https://img2.baidu.com/it/u=4157293960,2103840381&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500",
          title: "十几花开",
        },
        {
          id: 2,
          url: "https://img2.baidu.com/it/u=3908142881,2459234098&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
          title: "松鼠耸立",
        },
        {
          id: 3,
          url: "https://img1.baidu.com/it/u=360781277,337501559&fm=253&fmt=auto&app=138&f=JPEG?w=859&h=500",
          title: "荷塘月色",
        },
        {
          id: 4,
          url: "https://img1.baidu.com/it/u=3164998783,2199444470&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
          title: "小鹿乱撞",
        },
      ];
export default {
	name: 'click-carousel',
  props:{ 
    imgList: {
      type: Array,
      default: function () {
        return imgLists
       }
    }
    },
  data() {
    return {
      isAction: 0, // 点击滚动;
      length: 0,
    };
  },
  mouted() {
    this.changeDistance();
  },
  methods: {
    changeDistance() {
      if(this.length) return;
      this.length = this.$refs.carousel.length;
    },
    handleLeft() {
      this.changeDistance();
      if(this.isAction > 0) {
        this.isAction--;
      }else {
        this.isAction = this.length -1;
      }
    },
    handleRight() {
      this.changeDistance();
      if(this.isAction < this.length -1) {
        this.isAction++;
      }else {
        this.isAction = 0;
      }
    }
  },
  computed: {
  }
};
</script>


<style scoped>
.box-card {
  margin-top: 10px;
  border-radius: 4px;
}
.click-carousel {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.img-node {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
}
.action {
  z-index: 10;
}
.my-button-warp {
  padding: 4px;
  justify-content: space-evenly;
}
.arrow-left,
.arrow-right {
  border: none;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 25px;
  width: 25px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  text-align: center;
  font-size: 14px;
}
button :hover {
  color: red;
}
</style>
