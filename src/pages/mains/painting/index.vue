<template>
  <div class="relative">
    <div class="ling-games">
      <el-card>
        <div class="flex">
          <el-button class="small-show" @click="handleShow">
          去聊天
        </el-button>
        <el-button>
          <a href="http://xuewuboy.club:8000/onlinegame/" target="_blank" title="2048">2048</a>
        </el-button>
        <el-button>
          <a href="http://xuewuboy.club:8000/luckdraw/" target="_blank" title="抽奖">抽奖</a>
        </el-button>
        </div>
      </el-card>
    </div>
    <!-- 添加聊天框 -->
    <div :class="['fixed', 'flex', message?'message':'']">
      <div class="padding-auto" id="scroll">
        <div class="wh">
          <ul>
            <div v-for="(item, index) in infoList" :key="index">
              <li
                :class="[
                  item.name === identitySelf ? 'text-right' : 'text-left',
                ]"
              >
                <el-avatar :src="item.avatar" shape="square"></el-avatar>
                <p
                  :class="[
                    item.name === identitySelf
                      ? 'margin-right-10'
                      : 'margin-left-10',
                    item.name === identitySelf ? 'text-color' : 'text-white',
                  ]"
                >
                  <span>{{ item.message }}</span>
                </p>
              </li>
              <div v-if="beforeTime" class="font-size-14 text-center">
                <span>{{ item.time }}</span>
              </div>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex absolute-bottom">
        <el-input
          type="textarea"
          :rows="2"
          id="session"
          placeholder="请输入聊天内容"
          v-model="input"
        >
        </el-input>
        <el-button type="success" @click="handSend">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "painting",
  data() {
    return {
      input: "",
      message: false,
      identitySelf: localStorage.getItem("username") || "guest",
      infoList: [
        {
          name: "李明",
          id: 123456432,
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          message:
            "iuaerldvuileajbd,sn aewfuildsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: "2022/9/17 11:39:44",
        },
        {
          name: "李明",
          id: 123456432,
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          message:
            "iuaerldvuileajbd,sn aewfuildsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: "2022/9/17 11:39:44",
        },
        {
          name: "李明",
          id: 123456432,
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          message:
            "iuaerldvuileajbd,sn aewfuildsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: "2022/9/17 11:39:44",
        },
        {
          name: "小丽",
          id: 12345232332,
          avatar:
            "https://img2.baidu.com/it/u=3062813899,1142128231&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663520400&t=9526ff0a99fb9956a8bd91bf14b45e2e",
          message: "你好，日料店",
          time: new Date().toLocaleString(),
        },
        {
          name: "guest",
          id: 12323232332,
          avatar:
            "https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          message:
            "dsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: new Date().toLocaleString(),
        },
        {
          name: "小丽",
          id: 12345232332,
          avatar:
            "https://img2.baidu.com/it/u=3062813899,1142128231&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1663520400&t=9526ff0a99fb9956a8bd91bf14b45e2e",
          message: "阿海运挨饿万不打卡艾尔我VN的, 一安居客的， 爱女 ",
          time: new Date().toLocaleString(),
        },
        {
          name: "李明",
          id: 123456432,
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          message:
            "iuaerldvuileajbd,sn aewfuildsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: "2022/9/17 11:39:44",
        },
        {
          name: "guest",
          id: 12323232332,
          avatar:
            "https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          message:
            "dsj, avIAL,iaiblds ialvds, lab,dsj  来不得劲 爱尔兰大V就是, 想爱了女大三, 你阿内,  j,UI垃圾,打砸日料店",
          time: new Date().toLocaleString(),
        },
      ],
      isAction: false, //自己发送那么就是在右侧;
      beforeTime: true,
    };
  },
  //updated生命周期钩子函数可以让弹窗在刚打开时，滚动条就在绑定id的盒子的最底部
  updated() {},
  methods: {
    handSend() {
      const messageInfo = {
        name: this.identitySelf,
        id: new Date(),
        // 这里的头像要连表查询出来，不能这里给
        avatar:
          "https://img2.baidu.com/it/u=390829681,3002818272&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
        message: this.input,
      };
      if (this.input == "") return;
      this.infoList.push(messageInfo);
      this.input = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      setTimeout(() => {
        const div = document.getElementById("scroll");
        div && (div.scrollTop = div.scrollHeight);
      }, 0);
    },

    handleShow() {
      this.message = !this.message;
    }
  },
};
</script>

<style scoped>
  .ling-games {
    float: left;
    min-height: calc(100vh - 70px);
    padding-top: 70px;
    padding: 10px;
    text-align: center;
  }
  .small-show {
    display: none;
  }
.fixed {
  position: fixed;
  right: 0;
  bottom: 30px;
  width: 400px;
  height: 500px;
  padding-top: 8px;
  flex-direction: column;
  background: #999;
}
.padding-auto {
  padding: 4px;
  overflow: hidden;
  overflow-y: auto;
  flex: 1;
}
.text-left {
  color: #333;
  display: flex;
  align-items: center;
  margin-left: 1rem;
}
.text-right {
  color: #333;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-right: 1rem;
}
ul {
  /* min-height: 100vh; */
}
li {
  margin: 8px 0;
}
/*  滚动条 */
.padding-auto::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
}
.padding-auto::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 4px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e5e5e5;
}
.padding-auto::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
}

.el-avatar {
  align-self: flex-start;
}
p {
  max-width: 70%;
  font-family: "宋体";
  font-weight: 700;
  border-radius: 4px;
}
p:hover {
  opacity: 0.8;
}
.text-white {
  background-color: #fff;
  padding: 0.5em;
  position: relative;
}
.text-white::before {
  position: absolute;
  content: "";
  left: -20px;
  top: 8px;
  border: 10px solid;
  border-color: transparent;
  border-right-color: #fff;
}
.text-color {
  position: relative;
  padding: 0.5em;
  background-color: greenyellow;
}
.text-color::after {
  position: absolute;
  content: "";
  right: -20px;
  top: 8px;
  border: 10px solid;
  border-color: transparent;
  border-left-color: greenyellow;
}
.absolute-bottom {
  width: 100%;
  background-color: #888;
  padding: 0 10px;
}
.absolute-bottom span {
  padding: 2px;
  background-color: #888;
  color: rgb(225, 213, 213);
}
:deep(.el-textarea) {
  margin-right: 10px;
}

@media screen and (max-width: 640px) {
  .fixed {
    position: relative;
    margin-top: 2rem;
    width: 100%;
    height: 540px;
    bottom: auto;
  }
  .margin-top-70 {
    overflow: hidden;
  }
  p {
    max-width: 65%;
  }
  :deep(.el-card__body) {
    padding: 4px;
  }
  .small-show {
    display: block;
  }
  .message {
    position: fixed;
    bottom: 2px;
  }
}
</style>
