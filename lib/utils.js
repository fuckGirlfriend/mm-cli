const fs = require('fs'),
      os = require('os')

function getID(str) {
  return str.slice(str.indexOf('id=')+3)
}

const url = {
  musicID: `http://music.163.com/song/media/outer/url?id=fuck.mp3`
}

function fsExistsSync(path) {
  try{
      fs.accessSync(path,fs.F_OK);
  }catch(e){
      return false;
  }
  return true;
}

function isMMdir() {
  let path = `${os.homedir()}/.mm`
  let isDir =  fsExistsSync(path)
  if (!isDir) {
    fs.mkdirSync(path)
  }
  return path
}

module.exports = {
  getID,
  url,
  fsExistsSync,
  isMMdir
}