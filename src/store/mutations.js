const mutations = {
    // 用户信息
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    // 登录状态
    loginStatus(state, status) {
        state.loginStatus = status
    },
    // 歌手信息
    setSinger(state, singer) {
        state.singer = singer
    },
    // 播放列表
    setPlayList(state, playList) {
        state.playList = playList
    }
}

export default mutations