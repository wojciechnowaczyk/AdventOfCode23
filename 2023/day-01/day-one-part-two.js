const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-01.txt'),
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

const dictionary = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]


const calculateData = (dataLine) => {
  let data = dataLine;
  dictionary.forEach((digit, index) => {
    // data = data.replaceAll(digit, index +1);
    const i = data.indexOf(digit)
    if(i >= 0){
      console.log(data);
      console.log(i)
      data = data.slice(0,(i+1)) + (index +1) + data.slice((i+2))
      console.log(data)
    }
  })
  const numbersInLine = data.replace(/[^0-9]/g,"");

  if(numbersInLine.length > 1){
    const firstChar = numbersInLine.charAt(0) //gets first chatacter in string
    const lastChar = numbersInLine.slice(-1); // gets last character in string
    finalNumber = parseInt(firstChar + lastChar);
    sum+=finalNumber

  }else{
    const digit = numbersInLine.charAt(0);
    const finalNumber = digit + digit;
    const parsedFinalNumber = parseInt(finalNumber)
    sum+=parsedFinalNumber
  }
}
