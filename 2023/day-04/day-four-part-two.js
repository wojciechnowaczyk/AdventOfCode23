const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
const cardsFactors = [1];

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
    console.log(cardsFactors);
  } catch (err) {
    console.error(err);
  }
})();


const calculateData = (dataLine) => {
  const matchedNumbers = [];

  const cardNumber = parseInt(dataLine.match(/^\d+|\d+\b|\d+(?=\w)/g)[0])
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
  if(cardsFactors[cardNumber] === undefined){
    cardsFactors.push(1)
  }

  for(let j=0; j < cardsFactors[cardNumber-1]; j++){
    if(matchedNumbers.length > 0){
      for(let i = cardNumber-1; i < (cardNumber + matchedNumbers.length-1); i++){
        cardsFactors[i+1] = cardsFactors[i+1] + 1;
        cardsFactors.push(1)
      }
    }
  }
  sum += cardsFactors[cardNumber-1]


}


