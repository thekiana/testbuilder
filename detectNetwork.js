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

    if ((stringified.slice(0, 2) === '38' || '39') && (cardNumber.length === 14)) {
      return `Diner's Club`;
    } else if ((stringified.slice(0, 2) === '34' || '37') && (cardNumber.length === 15)) {
      return `American Express`;
    } else if ((stringified.charAt(0) === '4') && (cardNumber.length === 13 || 16 || 19)) {
      return `Visa`;
    } else if ((stringified.charAt(0) === '5') && (detectMasterCard(cardNumber)) && (cardNumber.length === 16)) {
      return `MasterCard`;
    } else if ((detectDiscover(cardNumber)) && (cardNumber.length === 16 || 19)) {
      return 'Discover';
    } else {
      return 'Delete me!';
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

  if ((stringified.slice(0, 4) === '6011') || (stringified.slice(0, 2) === '65')) {
    return true;
  }

  for (var prefix = 644; prefix <= 649; prefix++) {
    if (stringified.slice(0, 3) === parseInt(prefix)) {
      return true;
    }
  }

  return false;
}

// Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
// Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.