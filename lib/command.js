const fs = require('fs'),
  play = require('./play'),
  utils = require('./utils'),
  os = require('os'),
  request = require('request'),
  nw = new(require('simple-netease-cloud-music')),
  ascii = require('./ascii'),
  search = require('./search')

require('colors')

function command(obj) {
  switch (obj.command) {
    case 'EXIT':
      process.exit(1)
      break;
    case 'NEM':
      switch (obj.options) {
        case 'DL':

          let url = obj.keywords.toLowerCase(),
            is163 = checkURL(url),
            intURL = parseInt(url),
            isFlag = is163 || !isNaN(intURL)

          if (isFlag) {
            let ID = ''
            if (is163) {
              ID = utils.getID(url)
              downMusic(ID)
            } else if (!isNaN(intURL)) {
              downMusic(ID)
              ID = intURL
            } else {
              console.log('报错了吧兄弟?'.red)
            }
          }
        break;
        case 'SEARCH':
          search(obj.keywords)
      }

      break;
    case 'HELP':
      console.log(ascii.help)
      break;
    default:
      console.log('  × 输入错误,请重新输入'.red)
      console.log(' ')
      break;
  }
  if (obj.command == 'EXIT') {
    process.exit(1)
  }
}

function checkURL(str) {
  let repx = /https\:\/\/music\.163\.com\/#\/song\?id=/g
  return repx.test(str)
}

function downMusic(id) {
  let source = {}
  nw.url(id).then(data => {
    source.url = data.data[0].url
  })
  nw.song(id).then(data => {
    source.ar = data.songs[0].ar[0].name
    source.song = data.songs[0].name
  })
  let setInter = setInterval(() => {
    if (source.url && source.ar && source.song) {
      clearInterval(setInter)
      down(source)
    }
  }, 500)

  function down(obj) {
    let path = utils.isMMdir(),
        file = fs.createWriteStream(`${path}/${obj.ar}-${obj.song}.mp3`)
    request(obj.url)
    .on('response',data=> {
      let size = (data.headers['content-length'] / 1024 / 1024).toFixed(2)
      console.log(' ')
      console.log(`     ( >﹏<。)～ 正在下载 大约${size} MB `.bgCyan.black)
    })
    .on('end',()=> {
      console.log(' ')
      console.log(`   ${'...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄....'.red} ${'下载成功啦~'.cyan}`)
    })
    .pipe(file)
  }
}

module.exports = command