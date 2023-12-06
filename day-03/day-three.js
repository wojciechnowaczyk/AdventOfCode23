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
      input: fs.createReadStream('./input-03.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      input.push(line.toString().split(""))
      
    });

    await events.once(rl, 'close');

    calculateData();

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const calculateData = () => {
  input.forEach((line, index) => {
    //setting prev, current and next lines on every iteration
    if(index > 0){
      prevLine = input[index - 1]
    }else{
      prevLine = []
    }
    currentLine = input[index];
    if(index + 1 === input.length){
      nextLine = []
    }else{
      nextLine = input[index + 1]
    }
    line.forEach((lineEl, lineElIndex) => {
      // if element is dot, do nothing
      if(lineEl === "."){
      }else if(typeof parseInt(lineEl) === 'number'){
        //if element is number, check if is NaN; if yes the element is symbol if not the element is a digit
        if(isNaN(parseInt(lineEl))){

        }else{
          if(isNaN(parseInt(line[lineElIndex - 1]))){
            let shouldCheckNextEl = true;
            let n = lineElIndex;
            let startIndex = lineElIndex;
            let endIndex;
            let finalNumber = lineEl;
            let isNumberValid = false;
            while(shouldCheckNextEl){
              if(!isNaN(parseInt(line[n+1]))){
                finalNumber += line[n+1]
                n++
              }else{
                shouldCheckNextEl = false;
              }
            }
            endIndex = n;
            isNumberValid = checkIfNumberIsValid(startIndex, endIndex)
            if(isNumberValid){
              sum += parseInt(finalNumber)
            }

          }

        }
      }
    })
  })
}

const checkIfElementIsSymbol = (arr, el) => {
  if(el === "."){
    arr.push(false)
  }else if(isNaN(parseInt(el)) && el !== undefined){
    console.log(el)
    arr.push(true)
  }else{
    arr.push(false)
  }
}

const checkIfNumberIsValid = ( startIndex, endIndex) => {
  let symbolsArray = [];
  checkIfElementIsSymbol(symbolsArray, currentLine[startIndex - 1]);
  checkIfElementIsSymbol(symbolsArray, currentLine[endIndex + 1]);

  //check prev line
  if(prevLine.length){
    for(let i = startIndex - 1; i <= endIndex +1; i++){
      checkIfElementIsSymbol(symbolsArray, prevLine[i])
    }
  }

  //check next line
  if(nextLine.length){
    for(let i = startIndex -1; i <= endIndex +1; i++){
      checkIfElementIsSymbol(symbolsArray, nextLine[i])
    }
  }

  if(symbolsArray.includes(true)){
    return true
  }else{
    return false
  }

}
