const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-02.txt'),
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
  const games = dataLine.split(":")[1].split(';');
  let redsHighestAmount =0;
  let greensHighestAmount=0;
  let bluesHighestAmount=0;


  games.forEach(game => {
    //check greens
    const greens = game.match(/(\d+)(?=\s*green)/) //gets all matching integers before a word 'green'
    if(Array.isArray(greens)){
      const parsedGreens = parseInt(greens[0])
      if(parsedGreens > greensHighestAmount){
        greensHighestAmount = parsedGreens;
      }
    }
    //check red
    const reds = game.match(/(\d+)(?=\s*red)/) //gets all matching integers before a word 'red'
    if(Array.isArray(reds)){
      const parsedReds = parseInt(reds[0])
      if(parsedReds > redsHighestAmount){
        redsHighestAmount = parsedReds;
      }
    }
    //check blue
    const blues = game.match(/(\d+)(?=\s*blue)/) //gets all matching integers before a word 'blue'
    if(Array.isArray(blues)){
      const parsedBlues = parseInt(blues[0])
      if(parsedBlues > bluesHighestAmount){
        bluesHighestAmount = parsedBlues;
      }
    }

  })

  const value = redsHighestAmount * bluesHighestAmount * greensHighestAmount
  sum += value;
  
}
