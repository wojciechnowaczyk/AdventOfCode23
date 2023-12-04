const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./inputs/input-01.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      calculateData(line)
    });

    await events.once(rl, 'close');

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();


const calculateData = (dataLine) => {
  const numbersInLine = dataLine.replace(/[^0-9]/g,"");
  if(numbersInLine.length > 1){
    const firstChar = numbersInLine.charAt(0)
    const lastChar = numbersInLine.slice(-1);
    finalNumber = parseInt(firstChar + lastChar);
    sum+=finalNumber

  }else{
    const digit = numbersInLine.charAt(0);
    const finalNumber = digit + digit;
    const parsedFinalNumber = parseInt(finalNumber)
    sum+=parsedFinalNumber
  }
}
