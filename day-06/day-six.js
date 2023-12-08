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
    calculateData()
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

const calculateData = () => {
  parsedDataArr.forEach(race => {
    let ways = 0;
    for(let i = 1; i <race.time; i++){
      const raceDistance = (race.time - i)*i
      if(raceDistance > race.distance){
        ways += 1;
      }
    }
    if(sum === 0){
      sum = ways
    }else{
      if(ways !== 0){
        sum = sum * ways
      }
    }
  })
}
