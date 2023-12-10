const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
let instruction = "" 
let steps = [];


(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-08.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      parseData(line)
    });


    await events.once(rl, 'close');
    console.log(steps)

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const parseData = (dataLine) => {
  if(dataLine.includes("L") || dataLine.includes("R")){
    instruction += dataLine
  }else{
    let input = dataLine.split("=")[0];
    let parsedElements = dataLine.split("=")[1]
    if(parsedElements){
      parsedElements = parsedElements.replace(/[(),]/g, '').split(" ").slice(1)
    }
    steps.push({node: input, elements: parsedElements})
 
  }

}

