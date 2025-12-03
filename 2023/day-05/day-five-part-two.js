const events = require('events');
const fs = require('fs');
const readline = require('readline');

let lowestNumber = null;
let locations =[];

let startTime; 
let endTime;
let time;

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
    startTime = new Date()
    rl.on('line', (line) => {
      parseData(line)
    });

    await events.once(rl, 'close');
    calculateIterations();
    iterateLocations();
    endTime = new Date();
    console.log('lowest number: ')
    console.log(lowestNumber)
    time = (endTime.getTime() - startTime.getTime())/1000;
    console.log('time: ' + time + " s")
    // console.log(locations);

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
          seeds.push({startRange: parseInt(startRange), length: parseInt(seed)})
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
        seed_to_soil_map.push({destination : parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'soil_to_fertilizer_map' :
        soil_to_fetilizer_map.push({destination : parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'fertilizer_to_water_map' :
        fertilizer_to_water_map.push({destination :parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'water_to_light_map' :
        water_to_light_map.push({destination : parseInt(data[0]), source:parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'light_to_temperature_map' :
        light_to_temperature_map.push({destination : parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'temperature_to_humidity_map' :
        temperature_to_humidity_map.push({destination : parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      case 'humidity_to_location_map' :
        humidity_to_location_map.push({destination : parseInt(data[0]), source: parseInt(data[1]), length: parseInt(data[2])})
        break;
      
      
    }
  }
    //sort locations by destination number from the lowest to the highest
    locations = humidity_to_location_map.sort((a,b) => a.destination - b.destination)
}

  const calculateIterations = () => {
    seeds.forEach(seed => {
      allIterations += parseInt(seed.length)
    })
  }

  const iterateLocations = () => {
    locations.forEach(locationAlamanac => {
      for(let i = locationAlamanac.destination; i< locationAlamanac.destination + locationAlamanac.length; i++){
        if(lowestNumber) break;
        if(lowestNumber === null){
          currentIteration += 1;
          console.log(currentIteration+'/'+allIterations)
          console.log("lowestNumber: " + lowestNumber)
          const locationToHumidityNumber = getTheNumberOfPrevReference(i, humidity_to_location_map);
          const humidityToTemperatureNumber = getTheNumberOfPrevReference(locationToHumidityNumber, temperature_to_humidity_map);
          const temperatureToLightNumber = getTheNumberOfPrevReference(humidityToTemperatureNumber, light_to_temperature_map);
          const lightToWaterNumber = getTheNumberOfPrevReference(temperatureToLightNumber, water_to_light_map);
          const waterToFertilizerNumber = getTheNumberOfPrevReference(lightToWaterNumber, fertilizer_to_water_map);
          const fertilizerToSoilNumber = getTheNumberOfPrevReference(waterToFertilizerNumber, soil_to_fetilizer_map);
          const soilToSeedNumber = getTheNumberOfPrevReference(fertilizerToSoilNumber, seed_to_soil_map);
  
          seeds.forEach(seedsAlamanac => {
            if(soilToSeedNumber >= seedsAlamanac.startRange && soilToSeedNumber <= seedsAlamanac.startRange + seedsAlamanac.length){
              lowestNumber = i
              console.log("lowestNumber: " + lowestNumber)
              return;
            }
          })
        }
      }
    })
  }

  const getTheNumberOfPrevReference = (numb, map) => {
    map.forEach(alamanach => {
      //check if a number is in range
      if(alamanach.destination <= numb && numb <= alamanach.destination + alamanach.length){
        const difference = numb - alamanach.destination
        prevNumber = alamanach.source + difference
      }
    })
    if(!prevNumber){
      //if number is not in range of source and length return the same number as input number
      prevNumber = numb
    }
    return prevNumber
  }
