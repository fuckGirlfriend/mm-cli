const nw = new(require('simple-netease-cloud-music')),
  terminalLink = require('terminal-link'),
  readline = require('readline'),
  // rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // }),
  play = require('node-mpv')
let songID = `https://music.163.com/#/song?id=fuck`

let keywords = 'atmozfears'

require('colors')

function search(keywords) {
  nw.search(keywords).then(data => {
    if (data.code == 200) {
      console.log(' ')
      console.log(`  ⇧ 搜索结果 :: ${data.result.songCount}  `.bgCyan.black)
      console.log(' ')
      data.result.songs.forEach((item, index) => {
        let songName = terminalLink(` ${item.name} `.white.bgBlack, songID.replace('fuck', item.id))
        console.log(` → ${(index+1).toString().cyan} ♯ ${songName}`)
      })
      console.log(' ')

      function seltCode() {
        // rl.question(`  ◉ 请选择: `.bgBlack.cyan, msg => {
        //   msg = parseInt(msg)
        //   isNaN(msg) ? errInput() : feeder(msg)
        // })
      }

      function errInput() {
        console.log(' ')
        console.log('  × 输入错误,请重新输入'.red)
        console.log(' ')
        seltCode()
      }

      function feeder(num) {
        let song = data.result.songs[num - 1]
        console.log(`
      ➽   Name: ${song.name.cyan},
      ➽     ID: ${song.id.toString().red},
      ➽ Author: ${song.ar[0].name.yellow}
      `)
        let id = url(song)
        play(id, song.name)
      }

      function url(obj) {
        return obj.id
      }
      seltCode()
    }
  })
}

module.exports = search