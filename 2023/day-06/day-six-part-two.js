const events = require('events');
const fs = require('fs');
const readline = require('readline');

let sum= 0;
let parsedDataArr = [];
let finalTime = 0;
let finalDistance = 0;

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
    calculateData()

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const parseData = (dataLine) => {
  const parsedLine = dataLine.split(":")[1];
  if(dataLine.includes("Time")){
    const timeArr = parsedLine.split(" ");
    let timeArrFiltered = timeArr.filter(Boolean)
    timeArrFiltered.forEach(time => {
      finalTime = finalTime+time
    })
    finalTime = parseInt(finalTime)
  }else if(dataLine.includes('Distance')){
    const distanceArr = parsedLine.split(" ");
    let distanceArrFiltered = distanceArr.filter(Boolean);
    distanceArrFiltered.forEach(distance => {
      finalDistance = finalDistance + distance
    })
    finalDistance = parseInt(finalDistance)
  }
}

const calculateData = () => {
    for(let i = 1; i <finalTime; i++){
      const raceDistance = (finalTime - i)*i
      if(raceDistance > finalDistance){
        sum += 1;
      }
    }
}
