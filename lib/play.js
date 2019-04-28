// @shelljs/global

const mpv = new (require('node-mpv')),
      terminalLink = require('terminal-link'),
      utils = require('./utils')

require('shelljs/global')

require('colors')

function play(id,name) {
  let url = getURL(id),
      link = terminalLink(name,url)

  console.log(`  👾 Download ⇨  ${link}`)

  mpv.load(url)
  mpv.volume(100)
}

function getURL(id) {
  return utils.url.musicID.replace('fuck',id)
}

module.exports = play
