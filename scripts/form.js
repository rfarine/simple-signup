var inputs = document.getElementsByTagName('input');
var fuzzyBunny = document.getElementById('fuzzyBunny');
var fuzzyCat = document.getElementById('fuzzyCat');
var fuzzyDog = document.getElementById('fuzzyDog');
var visa = document.getElementById('visa');
var mastercard = document.getElementById('mastercard');
var amex = document.getElementById('amex');
var hasChanged = [];

var validateInput = function validateInput(event) {
  var inputValue = event.target.value;
  var inputName = event.target.name;
  var fuzzyBunnyIsValid = fuzzyBunny.value.match(/^[^@]*@[^@]*$/g);
  var fuzzyCatIsValid = fuzzyCat.value.match(/^\d{10}$/);
  var fuzzyDogIsValid = fuzzyDog.value.match(/^[345]\d{15}$/g);
  var inputHasChanged = hasChanged.includes(inputName);
  var errors = [];

  if (!inputHasChanged) {
    hasChanged.push(inputName);
  }

  if (!fuzzyBunnyIsValid && hasChanged.includes('fuzzyBunny')) {
    fuzzyBunny.classList.add('invalid');
    errors.push({ fuzzyBunny: 'Fuzzy Bunny must contain one @.' });
  }

  if (!fuzzyCatIsValid && hasChanged.includes('fuzzyCat')) {
    fuzzyCat.classList.add('invalid');
    errors.push({ fuzzyCat: 'Fuzzy Cat must contain exactly 10 digits. It must only contain digits.' });
  }

  if (!fuzzyDogIsValid && hasChanged.includes('fuzzyDog')) {
    fuzzyDog.classList.add('invalid');
    errors.push({ fuzzyDog: 'Fuzzy Dog must start with either 3, 4, or 5 and contain 16 digits.' });
  }

  if (fuzzyBunnyIsValid) {
    fuzzyBunny.classList.remove('invalid');
  }

  if (fuzzyCatIsValid) {
    fuzzyCat.classList.remove('invalid');
  }

  if (fuzzyDogIsValid) {
    fuzzyDog.classList.remove('invalid');
  }

  return false;
}

function removeHighlights() {
  var highlightedCards = document.getElementsByClassName('creditCardHighlight');
  Array.prototype.forEach.call(highlightedCards, function(card) {
    card.classList.remove('creditCardHighlight');
  });
}

var highlightCreditCard = function highlight(event) {
  var inputValue = event.target.value;
  var firstChar = inputValue.charAt(0);

  // return early if there's already 1 character entered.
  if (inputValue.length > 1) {
    return false;
  }

  switch (firstChar) {
    case '3':
      removeHighlights();
      amex.classList.add('creditCardHighlight');
      break;
    case '4':
      removeHighlights();
      visa.classList.add('creditCardHighlight');
      break;
    case '5':
      removeHighlights();
      mastercard.classList.add('creditCardHighlight');
      break;
    default:
      removeHighlights();
      return false;
      break;
  }
}

Array.prototype.forEach.call(inputs, function(input) {
  return input.addEventListener('change', validateInput);
});

fuzzyDog.addEventListener('keyup', highlightCreditCard);
