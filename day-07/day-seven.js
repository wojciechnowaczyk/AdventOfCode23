const { count } = require('console');
const events = require('events');
const fs = require('fs');
const { parse } = require('path');
const readline = require('readline');

let sum= 0;
let numberOfRanks = 0;

let fiveOfKindArr = [];
let fourOfAKindArr = [];
let fullHouseArr = [];
let threeOfAKindArr = [];
let twoPairArr = [];
let onePairArr = [];
let highCardArr = [];

const dictionary = {
  fiveOfKind: "Five of a kind",
  fourOfAKind: "Four of a kind",
  fullHouse: "Full house",
  threeOfAKind: "Three of a kind",
  twoPair: "Two pair",
  onePair: "One Pair",
  highCard: "High card"
}

const cardsDitictionary = {
  "A": 14,
  "K": 13,
  "Q": 12,
  "J": 11,
  "T": 10,
  "9": 9,
  "8": 8,
  "7":7,
  "6":6,
  "5":5,
  "4":4,
  "3":3,
  "2":2

}

const allHands = [];


(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('./input-07.txt'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      calculateData(line)
      
    });

    await events.once(rl, 'close');

    calculateData();
    createArrays();
    finalCalculation();
    console.log(numberOfRanks)

    console.log('Reading file line by line with readline done.');
    console.log("sum: " + sum)
  } catch (err) {
    console.error(err);
  }
})();

const calculateData = (dataLine) => {
  if(dataLine){
    const parsedData = dataLine.split(' ');
    const cards = parsedData[0]
    const bid  = parsedData[1]
    let type = getTypeOfHand(cards);
    let parsedCard = parseCardsIntoNumbers(cards)
    allHands.push({cards: parsedCard, bid: bid, type: type})
    numberOfRanks += 1;
  }
}

const getTypeOfHand = (cards) => {
  let counts = {};
  let type = '';
  const parsedCards = cards.split("") ?? [];
  parsedCards.forEach(card => {
    counts[card] = (counts[card] || 0) +1;
  })
  const countedCards = []
  for(const [key, value] of Object.entries(counts)){
    countedCards.push({card: key, amount: value})
  }
    console.log(countedCards)
    let continueIterating = true;
    countedCards.forEach(card => {
      if(continueIterating){
      switch(card){
        case card.amount === 5:
        type = dictionary.fiveOfKind
        break;
        case card.amount === 4:
          type =  dictionary.fourOfAKind
          break;
        case (card.amount === 3 || card.amount === 2) && countedCards.length === 2 :
          type = dictionary.fullHouse
          break;
        case card.amount === 3 && countedCards.length === 3:
          type = dictionary.threeOfAKind
          break;
        case card.amount === 2 && countedCards.length === 3:
          type = dictionary.twoPair
          break;
        case card.amount === 2 && countedCards.length === 4:
          type = dictionary.onePair
          break;
        default:
          type = dictionary.highCard
          break;
      }
      if(type != '' && type != dictionary.highCard){
        continueIterating = false
      }
    }
    })

  return type;


}

const parseCardsIntoNumbers = (cards) => {
  let newCard = [];
  const parsedCards = cards.split("") ?? [];
  parsedCards.forEach(card => {
    newCard.push(cardsDitictionary[card])
  })
  return newCard
}

const createArrays = () => {
  fiveOfKindArr = allHands.filter(card => card.type === dictionary.fiveOfKind)
  fourOfAKindArr = allHands.filter(card => card.type === dictionary.fourOfAKind)
  console.log(fourOfAKindArr)
  fullHouseArr = allHands.filter(card => card.type === dictionary.fullHouse)
  threeOfAKindArr = allHands.filter(card => card.type === dictionary.threeOfAKind)
  console.log(threeOfAKindArr)
  twoPairArr = allHands.filter(card => card.type === dictionary.twoPair)
  onePairArr = allHands.filter(card => card.type === dictionary.onePair)
  highCardArr = allHands.filter(card => card.type === dictionary.highCard)
}

const finalCalculation = () => {
  let sortedFiveOfKind = sortArray(fiveOfKindArr);
  countRank(sortedFiveOfKind)

  let sortedFourOfKind = sortArray(fourOfAKindArr);
  countRank(sortedFourOfKind);
}
const countRank = (arr) => {
  arr.forEach(hand => {
    let totalRank = hand.bid * numberOfRanks;
    sum += totalRank;
  })
}
const sortArray = (cardsTypeArr) => {
  cardsTypeArr.sort((a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }
    return 0; // Arrays are equal
});
return cardsTypeArr.reverse();
}

