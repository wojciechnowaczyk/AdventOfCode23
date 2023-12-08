const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
let parsedDataArr = [];

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-06.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      parseData(line);      
    });

    await events.once(rl, 'close');

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const parseData = (dataLine) => {
  const parsedLine = dataLine.split(":")[1];
  let newArr = [];
  if(dataLine.includes("Time")){
    const timeArr = parsedLine.split(" ");
    let timeArrFiltered = timeArr.filter(Boolean)
    timeArrFiltered.forEach(time => {
      parsedDataArr.push({time: time})
    })
  }else if(dataLine.includes('Distance')){
    const distanceArr = parsedLine.split(" ");
    let distanceArrFiltered = distanceArr.filter(Boolean);
    parsedDataArr.forEach((data, index) => {
      newArr.push({time: parseInt(data.time), distance: parseInt(distanceArrFiltered[index])})
    })
    parsedDataArr = newArr;
  }


}

