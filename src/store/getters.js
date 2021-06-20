// 歌曲列表
export const playList = state => state.playList

// 选择播放
export const selectPlay = (state) => {
    const list = state.playList[state.playIndex]
    return list
}