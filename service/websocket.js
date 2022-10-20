const io = require('socket.io')

module.exports = (httpServer) => {

    const ioServer = io(httpServer,{ 
        cors: true,
        'max reconnection attempts': 10,
    })
    
    let user2socket = {}
    let socket2user = {}

    let currentGame = null;
    const server = ioServer.of('/game');

    server.on('connection', socket => {

        // 【事件】检查昵称是否已占用
        // ------------------------------------------------------------
        socket.on('check_user_exist', (nickname, callback) => {
            callback(!!user2socket[nickname])
        })

        // 【事件】用户进入游戏
        // ------------------------------------------------------------
        socket.on('enter', (nickname) => {
            const sid = socket.id

            // 添加用户信息
            user2socket[nickname] = sid
            socket2user[sid] = nickname

             if(currentGame && currentGame.holder) {
                // 发送用户列表给当前用户
                socket.emit('room_info', {
                    nicknames: Object.keys(user2socket),
                    holder: currentGame?.holder || '',
                    lines: currentGame?.lines || []
                })
            }else {
                socket.emit('room_info',{
                    nicknames: Object.keys(user2socket),
                })
            }

            // 发送新进用户给其他用户
            socket.broadcast.emit('user_enter', nickname)
        })

        // 【事件】用户离开游戏
        // ------------------------------------------------------------
        socket.on('leave', () => {
            const sid = socket.id
            const nickname = socket2user[sid]

            // 移除用户信息
            delete user2socket[nickname]
            delete socket2user[sid]

            // 如果当前离开的是游戏主持人
            if (currentGame && currentGame.holder === nickname) {
                currentGame = null
            }

            // 发送离开用户给其他用户
            socket.broadcast.emit('user_leave', nickname)
        })

        // 【事件】申请开始游戏
        // ------------------------------------------------------------
        socket.on('start_game', (finalAnswer) => {
            if (currentGame) {
                // 游戏已经处于开始状态了
                socket.emit('already_started', currentGame.holder)
                return
            }

            // 游戏可以开始：设置当前游戏信息
            currentGame = {
                success: false,
                holder: socket2user[socket.id],
                finalAnswer,
                lines: []
            }
            const holder = currentGame.holder;
            server.emit('game_started', holder)
        })

        // 【事件】申请终止游戏
        // ------------------------------------------------------------
        socket.on('stop_game', () => {
            const nickname = socket2user[socket.id]

            if (currentGame && nickname === currentGame.holder) {
                currentGame = null
                server.emit('game_stoped')
            }
        })

        // 【事件】用户回答答案
        // ------------------------------------------------------------
        socket.on('answer_game', (answer) => {
            if (!currentGame) return
            if (currentGame.success) {
                socket.emit('game_answered', {
                    alreadyDone: true
                })
            } else {
                const success = currentGame.finalAnswer === answer
                if (success) {
                    currentGame.success = true
                }
                server.emit('game_answered', {
                    alreadyDone: false,
                    success,
                    nickname: socket2user[socket.id],
                    answer
                })
            }
        })

        //【事件】主持人描述话题
        socket.on('topicdesc_message',(topicdesc) => {
            socket.broadcast.emit('topicdesc_message',topicdesc);
        })

        // 【事件】主持人重新修改话题答案
        // ------------------------------------------------------------
        socket.on('reset_answer',(answer) => {
            currentGame.finalAnswer = answer;
            currentGame.success = false;
            socket.broadcast.emit('reset_answer');
        })

        // 【事件】用户绘图
        // ------------------------------------------------------------
        socket.on('new_line', (line) => {
            if (currentGame && currentGame.lines) {
                currentGame.lines.push(line)
                socket.broadcast.emit('starting_line', line)
            }
        })

        socket.on('update_line', (line) => {
            if (currentGame && currentGame.lines) {
                currentGame.lines[currentGame.lines.length - 1] = line
                socket.broadcast.emit('updating_line', line)
            }
        })

        socket.on('update_save_line', (line) => {
            if (currentGame && currentGame.lines) {
                currentGame.lines = line
                server.emit('update_save_line', line)
            }
        })

        // 【事件】 客户端发送消息
        socket.on('message', (obj) => {
           //向所有客户端广播发布的消息
           server.emit('message', obj);
        })

          // 【事件】客户端申请重新开始game
        // ------------------------------------------------------------

        socket.on('reset_game', (string) => {
            // 广播重新开始game给其他用户
            delete currentGame.finalAnswer;
            socket.broadcast.emit('reset_game', string)
        })
        // 【事件】客户端断开连接
        // ------------------------------------------------------------
        socket.on('disconnect', () => {
            const sid = socket.id
            const nickname = socket2user[sid]

         if(nickname in user2socket && sid in socket2user) {
            delete user2socket[nickname];
            delete socket2user[sid];
            currentGame = null;
         }
          // 如果当前离开的是游戏主持人
          if(currentGame && nickname == currentGame.holder) {
                currentGame = null;
            }

            // 发送离开的用户信息给其他用户
            socket.broadcast.emit('user_leave', nickname)
        })

        // ------------------------------------------------------------
    })

}