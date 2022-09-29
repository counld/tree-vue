import Vue from 'vue'
import Vuex from 'vuex'
import socket from '@/socket'

Vue.use(Vuex)

const state = {
  connected: false, // 连接状态
  nickname: '', // 当前用户昵称
  nicknames: [], // 房间用户昵称列表
  holder: '', // 游戏主持人
  lines: [], // 房间的绘图信息 (画了多少根线)
  MessageInfoList: JSON.parse(sessionStorage.getItem('MessageInfoList')) || [], //系统消息
  lineWidth: 5,
  lineColor: '#409EFF',
  answerSuccess: {
    message: '',
    type: false,
  },
}

const mutations = {
  updateConnected(state, connected) {
    state.connected = connected
  },
  updateNickname(state, nickname) {
    state.nickname = nickname || ''
  },
  updateNicknames(state, nicknames) {
    state.nicknames = nicknames || []
  },
  updateHolder(state, holder) {
    state.holder = holder || ''
  },
  updateLines(state, lines) {
    state.lines = lines || []
  },

  addToNicknames(state, nickname) {
    if (!state.nicknames.includes(nickname)) {
      state.nicknames.push(nickname)
    }
  },
  drawNewLine(state, newLine) {
    state.lines.push(newLine)
  },
  updateNewLine(state, lastLine) {
    const line = state.lines[state.lines.length - 1]
    line.points = lastLine.points
  },
  delFromNicknames(state, nickname) {
    state.nicknames = state.nicknames.filter(item => item !== nickname)
  },
  upDateMessage(state, objMsg) {
    state.MessageInfoList = state.MessageInfoList.concat(objMsg);
    const info = JSON.stringify(state.MessageInfoList);
    sessionStorage.setItem('MessageInfoList', info);
  },
  changeLineWidth(state, lineWidth) {
    state.lineWidth = lineWidth;
  },
  changeLineColor(state, lineColor) {
    state.lineColor = lineColor;
  },
  changeAnswerSuccess(state, answerObj) {
    state.answerSuccess = answerObj;
  },
  //重新开始
  handleReset(state) {
    state.holder = '';
    state.answerSuccess = {
      message: '',
      type: false,
    };
    state.lines = [];
  }
}

const actions = {
  // 确认用户名是否存在
  checkUserExist(context, nickname) {
    return new Promise((resolve) => {
      socket.emit('check_user_exist', nickname, isExist => {
        resolve(isExist)
      })
    })
  },
  // 进入房间
  sendUserEnter(context) {
    const nickname = localStorage.getItem('nickname')
    socket.emit('enter', nickname);
    context.commit('updateNickname', nickname)
  },
  // 开始游戏申请
  sendStartGame(context, imageAnswer) {
    socket.emit('start_game', imageAnswer)
  },
  // 结束游戏申请
  /* eslint-disable no-unused-vars */
  sendStopGame(context) {
    socket.emit('stop_game')
  },
  // 画新线
  sendDrawNewLine(context, newLine) {
    socket.emit('new_line', newLine)
  },
  // 更新线条
  // no-unused-vars
  sendUpdateNewLine(context, lastLine) {
    socket.emit('update_line', lastLine)
  },

  //发送回答信息
  sendAnswerGame(context, inputImageName) {
    console.log(inputImageName, 'inputImageName');
    socket.emit('answer_game', inputImageName)
  },

  //用户讨论信息
  userDiscussInfo(context, objMsg) {
    socket.emit('message', objMsg);
  },

  sendUserLeave(context) {
    socket.emit('leave')
    context.commit('updateNickname', '')
    // localStorage.removeItem('nickname')
  },
  resetGame(context) { //从新开始
    context.commit('handleReset');
    socket.emit('reset_game')
  }
}

const getters = {
  isGameStarted(state) {
    // 根据主持人是否存在, 判断游戏是否开始
    return !!state.holder
  },
  isGameHolder(state) {
    return state.nickname === state.holder
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
