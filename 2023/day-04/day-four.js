const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-04.txt'),
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
  const matchedNumbers = [];
  let finalNumber = 0;
  const parsedDataLine = dataLine.split(":")[1];
  const winningNumbers = parsedDataLine.split("|")[0].split(" ");
  const numbersYouHave = parsedDataLine.split("|")[1].split(" ");
  const filteredWinningNumbers = winningNumbers.filter(el => {return el != ""})
  const filteredNumbersYouHave = numbersYouHave.filter(el => {return el != ""})
  filteredWinningNumbers.forEach((winningNumber)=>{
    if(filteredNumbersYouHave.includes(winningNumber)){
      matchedNumbers.push(winningNumber);
    }
  })
  for(let i = 1; i<=matchedNumbers.length; i++ ){
    if(i == 1){
      finalNumber = i;
    }
    if(i > 1){
      finalNumber = finalNumber * 2
    }
  }
  sum += finalNumber;
}
