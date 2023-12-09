const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
const input = [];
let prevLine = [];
let currentLine = [];
let nextLine =[];

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-07.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      calculateData(line)
      
    });

    await events.once(rl, 'close');

    calculateData();

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const calculateData = (dataLine) => {

}

