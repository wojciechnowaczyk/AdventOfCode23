const events = require('events');
const fs = require('fs');
const readline = require('readline');

let lowestNumber = null;

let seeds = [];
let seed_to_soil_map =[];
let soil_to_fetilizer_map = [];
let fertilizer_to_water_map = [];
let water_to_light_map = [];
let light_to_temperature_map = [];
let temperature_to_humidity_map =[];
let humidity_to_location_map = [];

let currentIterationName = "";

let allIterations = 0;
let currentIteration = 0;

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
    calculateIterations();
    iterateSeeds();
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
      let seedsArr = seedsFromData.split(' ').filter(Boolean)
      let startRange;
      //iterate throuhg the seeds line and parse data into start range seeds and length
      seedsArr.forEach((seed, index) => {
        if(index%2 === 0){
          startRange = seed
        }else{
          seeds.push({startRange: startRange, length: seed})
        }
      })
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

  const calculateIterations = () => {
    seeds.forEach(seed => {
      allIterations += parseInt(seed.length)
    })
  }

  const iterateSeeds = () => {
    seeds.forEach(seedAlamanac => {
      const startRange = parseInt(seedAlamanac.startRange);
      const length = parseInt(seedAlamanac.length);
      for(let i = startRange; i< startRange+length; i++){
        currentIteration += 1;
        console.log(currentIteration+'/'+allIterations)
        const seedToSoilNumber = getTheNumberOfNextReference(i, seed_to_soil_map)
        const soilToFertilizerNumber = getTheNumberOfNextReference(seedToSoilNumber, soil_to_fetilizer_map)
        const fertilizerToWaterNumber = getTheNumberOfNextReference(soilToFertilizerNumber, fertilizer_to_water_map)
        const waterToLightNumber = getTheNumberOfNextReference(fertilizerToWaterNumber, water_to_light_map)
        const lightToTemperatureNumber = getTheNumberOfNextReference(waterToLightNumber, light_to_temperature_map)
        const temperatureToHumidityNumber = getTheNumberOfNextReference(lightToTemperatureNumber, temperature_to_humidity_map)
        const humidityToLocationNumber = getTheNumberOfNextReference(temperatureToHumidityNumber, humidity_to_location_map)

        if(lowestNumber === null){
          lowestNumber = humidityToLocationNumber
        }else if(humidityToLocationNumber < lowestNumber){
          lowestNumber = humidityToLocationNumber;
        }
      }
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
