// 歌曲列表
export const playList = state => state.playList

// 歌手信息
export const singer = state => state.singer

// 选择播放
export const selectPlay = (state) => {
    const list = state.playList[state.playIndex]
    return list
}