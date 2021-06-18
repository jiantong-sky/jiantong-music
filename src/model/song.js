import utils from '../utils/utils'
// 处理歌曲列表详情数据

export function createSong(songData) {
    const song = {
        id: songData.id,
        singer: filterSinger(songData.ar || songData.artists),
        name: songData.name,
        image: songData.al.picUrl,
        duration: utils.formatSecond(songData.dt),
        url: ` https://music.163.com/song/media/outer/url?id=${songData.id}.mp3 `,
        playCount: songData.playCount || '',
        score: songData.score || ''
    }
    return song
}

// 歌手处理
function filterSinger(singer) {
    let ret = []
    if (!singer) return ''
    if (singer.length > 1) {
        singer.map(item => {
            ret.push(item.name)
        })
        return ret.join('/')
    }
    return singer[0].name
}