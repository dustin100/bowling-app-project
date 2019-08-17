const bowlingApp = {};
bowlingApp.pinNumbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
  bowlingApp.keepScore = 0;
bowlingApp.time = 99;
bowlingApp.answer = [];

bowlingApp.randomNumber = function () {
  num =
    Math.floor(Math.random() * 2);
  if (num === 0) {
    return true;
  } else {
    return false;
  }
}

// this is how to start the game. After clikcing start button it will run all functions to start game
bowlingApp.init = function () {
  const startButton = document.getElementById("start-button");
  startButton.onclick = function () {
    //functions will go here 
    bowlingApp.getPinNumber();
    bowlingApp.getShowPin();
    bowlingApp.getAnswer();
    bowlingApp.getPersonAnswer();
  }
};

// creates new array called pinNumber that now holds a boolean for each pin  
bowlingApp.getPinNumber = function () {
  this.pinNumber = this.pinNumbers.map(function () {
    return bowlingApp.randomNumber();
  });
}

//
bowlingApp.getShowPin = function () {
  this.pinNumber.forEach(function (item, index) {
    if (item === true) {
      return document.getElementById(bowlingApp.pinNumbers[index]).style.visibility = "visible";
    } else {
      return document.getElementById(bowlingApp.pinNumbers[index]).style.visibility = "hidden";
    }
  });
}

//pushs the correct answer into new array
bowlingApp.getAnswer = function () {
  this.pinNumber.map(function (item, index) {
    if (item === true)
      bowlingApp.answer.push(bowlingApp.pinNumbers[index]);

  });
}

//function that checks if two arrays are equal
bowlingApp.checkEqual = function (arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] != arr2[i])
      return false;
  }

  return true;

}


bowlingApp.plusScore = function () {
  document.getElementById("score").innerHTML = (this.keepScore += 10) * 1.3;
}
bowlingApp.minusScore = function () {
  document.getElementById("score").innerHTML = this.keepScore -= 3;
}

bowlingApp.getPersonAnswer = function () {
  console.log(this.answer);
  this.personAnswer = prompt(`Enter the Pins Left Standing`).split(",");

  while (this.checkEqual(this.answer, this.personAnswer) === false) {

    this.minusScore();
    this.personAnswer = prompt(`Enter the Pins Left Standing`).split(",");
  }
  this.plusScore();
  console.log(`You're Right`)
}

bowlingApp.init();