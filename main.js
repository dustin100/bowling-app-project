const pinNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];



const randomNumber = () => {
  num =
    Math.floor(Math.random() * 2);
  if (num === 0) {
    return true;
  } else {
    return false;
  }

}
let score = 10;
const scoring = () => {
  document.getElementById("score").innerHTML = score;
}
scoring();

//resets pins shown
const startButton = document.getElementById("start-button");
startButton.onclick = () => {

  const pinNumber = pinNumbers.map(function () {
    return randomNumber();
  });

  const showPin = pinNumber.forEach(function (item, index) {
    if (item === true) {
      return document.getElementById(pinNumbers[index]).style.visibility = "visible";
    } else {
      return document.getElementById(pinNumbers[index]).style.visibility = "hidden";
    }
  });
  //create answer by pushing index into new array 
  let answer = [];

  const checkAnswer = pinNumber.map(function (item, index) {
    if (item === true)
      answer.push(pinNumbers[index]);

  });

  //function that checks if two arrays are equal

  const checkEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] != arr2[i])
        return false;
    }

    return true;

  }




  console.log(answer);
  let personAnswer = prompt(`Enter the Pins Left Standing`).split(",");

  while (checkEqual(answer, personAnswer) === false) {
    score--
    scoring();
    personAnswer = prompt(`Enter the Pins Left Standing`).split(",");
  }
  console.log(`You're Right`)
  score = score + 5
  scoring();
  console.log(personAnswer);
}