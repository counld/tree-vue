// 全局方法，页面或者容器(设置了overflow-y:scroll那种)滚动条到某个位置
export const scrollTop = function({scrollTop, selector=undefined, duration=300}){
  // 每0.01秒运动一次，越小，效果越好(代表回调执行得次数也越多)
  let intervalTime = 10;
  // 当前位置距离顶部距离，没有selector表示是页面得，有是容器得
  let nowScrollTop = selector ? document.querySelector(selector).scrollTop : window.pageYOffset
  // 计算每次间隔向上滑动多少像素
  let PerPixel = (scrollTop - nowScrollTop) / duration * intervalTime
  // 方向，用于清除定时器结束判断一项
  let direction = scrollTop > nowScrollTop ? 'down' : 'up'
  // 执行循环事件
  let timer = setInterval(() => {
    // 修改当前top值
    // 描述：向下时候有可能多出去，所以加个判断，如果差值大于每次移动的值添加，否则直接到那个值即可
    if (Math.abs(nowScrollTop - scrollTop) > Math.abs(PerPixel)){
      nowScrollTop += PerPixel
    }else{
      nowScrollTop = scrollTop
    }
    // 偏移位置
    // 描述：有selector表示是容器里进行偏移，否则是顶级页面偏移
    if (selector){
      document.querySelector(selector).scroll(0, nowScrollTop)
    }else{
      window.scrollTo(0, nowScrollTop)
    }
    // 到指定位置就清空定时器
    if (direction === 'down' ? nowScrollTop >= scrollTop : nowScrollTop <= scrollTop) {
      clearInterval(timer)
    }
  }, intervalTime)
}