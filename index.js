#!/usr/bin/env node

const play = require('./lib/play'),
  clear = require('clear'),
  ascii = require('./lib/ascii'),
  readline = require('readline'),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  }),
  utils = require('./lib/formater').inputText,
  command = require('./lib/command')

require('colors')

clear()

console.log(ascii.intro.rainbow)

rl.setPrompt(' ◉  Terminal ⇨  '.cyan);
rl.prompt();

rl.on('line',line=> {
  line = utils(line)
  command(line)
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});


// rl.on('line',msg=> console.log(msg))
// // rl.question(`  `.,msg=> {
// //   let dict = utils(msg)
  
// //   console.log(' ')
// //   console.log(' ')
// // })

// function seltCode() {
//   rl.on('line',msg=> {
//     // `  ◉ 请选择: `.bgBlack.cyan
//     console.log(msg)
//   })
// }
// // seltCode()