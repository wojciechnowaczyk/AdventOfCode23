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
  let isGamePossible = true;
  // console.log(dataLine)
  const id = dataLine.match(/^\d+|\d+\b|\d+(?=\w)/g)[0]; //gets all integers in the string and gets the first element in an array
  const parsedId = parseInt(id);
  const games = dataLine.split(":")[1].split(';');
  // console.log(games);
  games.forEach(game => {
    console.log(game);
    //check greens
    const greens = game.match(/(\d+)(?=\s*green)/) //gets all matching integers before a word 'green'
    if(greens){
      if(greens[0] > 13){
        isGamePossible = false;
        return
      }
    }
    //check red
    const reds = game.match(/(\d+)(?=\s*red)/) //gets all matching integers before a word 'red'
    if(reds){
      if(reds[0] > 12){
        isGamePossible = false;
        return
      }
    }

    //check blue
    const blues = game.match(/(\d+)(?=\s*blue)/) //gets all matching integers before a word 'blue'
    if(blues){
      if(blues[0] > 14){
        isGamePossible = false;
        return
      }
    }

  })
  if(isGamePossible){
    sum += parsedId
  }
  
}
