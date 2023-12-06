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
      if(lineEl === "*"){
        console.log('star')
        getNumbers(lineElIndex)
      }
    })
  })
}

const getNumbers = (elIndex) => {
  let numbersArr = [];
  //check previous index
  numbersArr.push(getNumber("prev", currentLine, elIndex));
  //check next index
  numbersArr.push(getNumber("next", currentLine, elIndex));
  //check prev line
  const prevLineNumbers = getNumbersFromLine(prevLine, elIndex);
  //check next line
  const nextLineNumbers = getNumbersFromLine(nextLine, elIndex);
  // console.log(numbersArr)
  const finalArr = [...prevLineNumbers, ...nextLineNumbers, ...numbersArr];
  console.log(finalArr)
}

const getNumbersFromLine = (line, elIndex) => {
  const numbArr = []
  if(isNaN(parseInt(line[elIndex]))){
    //check prev elements
    const prevElements = getNumber('prev',line, elIndex)
    if(prevElements != null) numbArr.push(prevElements)

    //check next elements
    const nextElements = getNumber("next", line, elIndex)
    if(nextElements != null) numbArr.push(nextElements)


  }
  return numbArr;

}

const getNumber = (mode, line, elIndex) => {
  let n = elIndex;
  let index = 0;
  let dynamicIndex = 0;
  let finalNumber = "";
  if(mode ==="prev"){
    index = elIndex - 1
    dynamicIndex = n -1
  }
  else if(mode === "next"){
    index = elIndex + 1
    dynamicIndex = n + 1
  }

  if(!isNaN(parseInt(line[index]))){
    let shouldCheckNextEl = true;
    while(shouldCheckNextEl){
      if(mode === 'prev'){
        if(!isNaN(parseInt(line[n-1])) && parseInt(line[n-1]) !== undefined){
          finalNumber += line[n-1]
            n--

        }else{
          shouldCheckNextEl = false;
        }
      }
      if(mode === "next"){
        if(!isNaN(parseInt(line[n+1])) && parseInt(line[n+1]) !== undefined){
          finalNumber += line[n+1]
            n++
          }
        else{
          shouldCheckNextEl = false;
        }
      }

    }
  }

  if(finalNumber !== ""){
    if(mode === "next"){
      return parseInt(finalNumber)
    }else{
      return parseInt(finalNumber.split("").reverse().join(""));
    }
  }
}


