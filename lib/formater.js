
function cliInput(str) {
  let arr = str.toUpperCase().split(' '),
      keywords = keywordFormat(arr)
  return {
    keywords,
    command: arr[0],
    options: arr[1]
  }
}
function keywordFormat(arr) {
  let len = arr.length,result = ''
  for (let i=2; i<len; i++) {
    result+= `${arr[i]} `
  }
  return result.slice(0,result.length-1)
}

module.exports = {
  inputText: cliInput
}
