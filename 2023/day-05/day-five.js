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

    iterateSeeds();
    const lowestNumber = Math.min(...locations)
    console.log('lowest number: ')
    console.log(lowestNumber)

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
      // seeds.push(2637529854);
    }else{
      //set string line as current iteration
      let parsedTitle = title.replace(/[ -]/g, '_');
      currentIterationName = parsedTitle;
    }
  }else{
    //parse data line by line
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
        humidity_to_location_map.push({destination : data[0], source: parseInt(data[1]), length: data[2]})
        break;
      
      
    }
  }
  }

  const iterateSeeds = () => {
    seeds.forEach(seed => {
      //check the seed to soil map
      const parsedSeed = parseInt(seed)
      const seedToSoilNumber = getTheNumberOfNextReference(parsedSeed, seed_to_soil_map)
      const soilToFertilizerNumber = getTheNumberOfNextReference(seedToSoilNumber, soil_to_fetilizer_map)
      const fertilizerToWaterNumber = getTheNumberOfNextReference(soilToFertilizerNumber, fertilizer_to_water_map)
      const waterToLightNumber = getTheNumberOfNextReference(fertilizerToWaterNumber, water_to_light_map)
      const lightToTemperatureNumber = getTheNumberOfNextReference(waterToLightNumber, light_to_temperature_map)
      const temperatureToHumidityNumber = getTheNumberOfNextReference(lightToTemperatureNumber, temperature_to_humidity_map)
      const humidityToLocationNumber = getTheNumberOfNextReference(temperatureToHumidityNumber, humidity_to_location_map)

      locations.push(humidityToLocationNumber)
    })
  }

  const getTheNumberOfNextReference = (numb, map) => {
    let nextNumber = null;
    map.forEach(alamanach => {
      const parsedSource = parseInt(alamanach.source)
      const parsedDestination = parseInt(alamanach.destination);
      const parsedLength = parseInt(alamanach.length)
      //check if a number is in range
      if(parsedSource <= numb && numb <= parsedSource + parsedLength){
        const difference = numb - parsedSource
        nextNumber = parsedDestination + difference
      }
    })
    if(!nextNumber){
      //if number is not in range of source and length return the same number as input number
      nextNumber = numb
    }
    return nextNumber
  }
