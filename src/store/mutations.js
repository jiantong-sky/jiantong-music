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
    },
    // 播放器状态
    setPlayStatus(state, status) {
        state.playStatus = status
    },
    // 音乐播放状态
    setIsPlay(state, isPlay) {
        state.isPlay = isPlay
    },
    // 歌曲索引
    setPlayIndex(state, playIndex) {
        state.playIndex = playIndex
    },
}

export default mutations