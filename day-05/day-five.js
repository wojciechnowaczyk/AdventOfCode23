const events = require('events');
const fs = require('fs');
const readline = require('readline');

let locations = [];

let seeds = [];
let seed_to_soil_map =[];
let soil_to_fetilizer_map = [];
let fertilizer_to_water_map = [];
let water_to_light_map = [];
let light_to_temperature_map = [];
let temperature_to_humidity_map =[];
let humidity_to_location_map = [];

let currentIterationName = "";

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-05.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      parseData(line)
    });

    await events.once(rl, 'close');

    console.log(humidity_to_location_map)

    console.log('Reading file line by line with readline done.');
  } catch (err) {
    console.error(err);
  }
})();


const parseData = (dataLine) => {
  //check if line is a string line
  if(!dataLine.match(/^[0-9\s]+$/)){
    //get the string before :
    const title= dataLine.split(':')[0]
    if(title === 'seeds'){
      let seedsFromData = dataLine.split(':')[1];
      seeds = seedsFromData.split(' ').filter(Boolean)
    }else{
      let parsedTitle = title.replace(/[ -]/g, '_');
      currentIterationName = parsedTitle;
    }
  }else{
    const data = dataLine.split(' ');
    switch(currentIterationName){
      case 'seed_to_soil_map' : 
        seed_to_soil_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'soil_to_fertilizer_map' :
        soil_to_fetilizer_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'fertilizer_to_water_map' :
        fertilizer_to_water_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'water_to_light_map' :
        water_to_light_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'light_to_temperature_map' :
        light_to_temperature_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'temperature_to_humidity_map' :
        temperature_to_humidity_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      case 'humidity_to_location_map' :
        humidity_to_location_map.push({destination : data[0], source: data[1], length: data[2]})
        break;
      
      
    }
  }
  //set string line as current iteration
  }
