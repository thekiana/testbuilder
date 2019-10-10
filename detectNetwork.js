// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

    var stringified = cardNumber.toString();

    if ((stringified.slice(0, 2) === '38' || stringified.slice(0, 2) === '39') && cardNumber.length === 14) {
      return `Diner's Club`;
    } else if ((stringified.slice(0, 2) === '34' || stringified.slice(0, 2) === '37') && cardNumber.length === 15) {
      return `American Express`;
    } else if ((stringified.charAt(0) === '4') && (cardNumber.length === 13 || cardNumber.length === 16 || cardNumber.length === 19)) {
      return `Visa`;
    } else if ((stringified.charAt(0) === '5') && (detectMasterCard(cardNumber)) && (cardNumber.length === 16)) {
      return `MasterCard`;
    } else if ((detectDiscover(cardNumber)) && (cardNumber.length === 16 || cardNumber.length === 19)) {
      return `Discover`;
    } else if ((detectMaestro(cardNumber)) && (stringified.slice(0, 4) === '5018' || stringified.slice(0, 4) === '5020' || stringified.slice(0, 4) === '5038' || stringified.slice(0, 4) === '6304')) {
      return `Maestro`;
    } else if (detectChinaUnionPay(cardNumber)) {
      return `China Union Pay`;
    } else {
      return `Delete me!`;
    }

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};

var detectMasterCard = function(cardNumber) {
  var stringified = cardNumber.toString();
  var secondChar = stringified.slice(1, 2);

  for (var i = 1; i <= 5; i++) {
    if (parseInt(secondChar) === i) {
      return true;
    }
  }

  return false;
};

var detectDiscover = function(cardNumber) {
  var stringified = cardNumber.toString();
  var firstThreeDigits = stringified.slice(0, 3);

  if ((stringified.slice(0, 4) === '6011') || (stringified.slice(0, 2) === '65')) {
    return true;
  }

  for (var prefix = 644; prefix <= 649; prefix++) {
    if (parseInt(firstThreeDigits) === prefix) {
      return true;
    }
  }

  return false;
};

var detectMaestro = function(cardNumber) {
  var stringified = cardNumber.toString();

  for (var length = 12; length <= 19; length++) {
    if (parseInt(stringified.length) === length) {
      return true;
    }
  }

  return false;
};

var detectChinaUnionPay = function(cardNumber) {
  var stringified = cardNumber.toString();
  var firstTwoDigits = cardNumber.slice(0, 2);

  if ((firstTwoDigits === '62') && (cardNumber.length >= 12 && cardNumber.length <= 19)) {
    var convertSix = cardNumber.slice(2, 6);
    var convertThree = cardNumber.slice(2, 3);
    var convertFour = cardNumber.slice(2, 4);

    if (convertSix >= 2126 && convertSix <= 2925) {
      return true;
    } else if (convertThree >= 4 && convertThree <= 6) {
      return true;
    } else if (convertFour >= 82 && convertFour <= 88) {
      return true;
    }
  }

  return false;
};

// console.log(detectNetwork('6288123456789123'));

//6288 and a length of 12


// var detectSwitch = function(cardNumber) {

// }

// Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

// Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.