const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
let instructions = "" 
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
    calculateData();

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const parseData = (dataLine) => {
  if(!dataLine.includes("=")){
    instructions += dataLine
  }else if(dataLine != ''){
    let input = dataLine.split(" =")[0];
    let parsedElements = dataLine.split("=")[1]
    if(parsedElements){
      parsedElements = parsedElements.replace(/[(),]/g, '').split(" ").slice(1)
    }
    steps.push({node: input, elements: parsedElements})
 
  }
}

const calculateData = () => {
  const parsedInstructions = instructions.split("");
  let currentIndex = steps.findIndex(element => element.node === "AAA");
  let didFindTheNumber = false;
  const iterateInstructions = () => {
    parsedInstructions.forEach((instruction) => {
      //check if the current iteration element is equals to 'ZZZ', if yes, it breaks the loop;
      if(steps[currentIndex].node !== "ZZZ"){
        if(instruction === "L"){
          // get the element of the next iteration
          let el = steps[currentIndex].elements[0]
          //get the index of the next iteration element
          currentIndex = steps.findIndex(element => element.node === el)
        }
        if(instruction === "R"){
         let el = steps[currentIndex].elements[1]
         currentIndex = steps.findIndex(element => element.node === el)
        }
        sum += 1;
      }else{
        didFindTheNumber = true;
      }
    })
  }
  while (!didFindTheNumber){
    iterateInstructions();
  }
}

