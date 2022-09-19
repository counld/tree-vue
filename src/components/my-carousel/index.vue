<template>
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in swiperList" :key="item.id">
        <a src="/">
          <img :src="item.thumbnail" :alt="item.picture" class="wh"/>
        </a>
        <p class="carousel-title"> {{item.picture}}</p>
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
  name: 'my-carousel',
  props: {
    swiperList: {
      type: Array,
      default: [1,2,3,4].map((item,index) => ({id:index,picture: 'item' + index, thumbnail:'https://www.bokezhu.com/content/uploads/2020/09/fe9afb964f19cc3ee029.jpg',islarge:0})),

    }
  }
}
</script>

<style scoped>
  ::v-deep .el-carousel__container {
    height: 200px;
  }
  a {
    display: block;
    background-color: transparent;
    height: 100%;
  }
  ::v-deep .el-carousel--horizontal {
    padding: 0;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  ::v-deep .el-carousel__button {
    width: 20px;
  }
  .carousel-title {
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 18px;
    color: #fff;
  }
</style>