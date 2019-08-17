$(function () {


    const bowlingApp = {};
    bowlingApp.pinNumbers = [{
            pinId: 'one',
            answerKey: 1
        },
        {
            pinId: 'two',
            answerKey: 2
        },
        {
            pinId: 'three',
            answerKey: 3
        },
        {
            pinId: 'four',
            answerKey: 4
        },
        {
            pinId: 'five',
            answerKey: 5
        },
        {
            pinId: 'six',
            answerKey: 6
        },
        {
            pinId: 'seven',
            answerKey: 7
        },
        {
            pinId: 'eight',
            answerKey: 8
        },
        {
            pinId: 'nine',
            answerKey: 9
        },
        {
            pinId: 'ten',
            answerKey: 10
        }
    ];
    bowlingApp.score = 0;
    bowlingApp.time = 60;
    bowlingApp.answer = [];
    bowlingApp.isUserPlaying = false;
    bowlingApp.randomNumber = function () {
        num = Math.floor(Math.random() * 2);
        if (num === 0) {
            return true;
        } else {
            return false;
        }
    };

    bowlingApp.init = function () {
        bowlingApp.score = 0;
        bowlingApp.time = 60;
        bowlingApp.answer = [];
        bowlingApp.isUserPlaying = false;
    }

    $("#start-button").on('click', function () {
        bowlingApp.startGame();
    });


    // this is how to start the game. After clikcing start button it will run all functions to start game
    bowlingApp.startGame = function () {
        bowlingApp.answer = [];
        bowlingApp.isUserPlaying = true;
        bowlingApp.getPinNumber();
        bowlingApp.getShowPin();
        bowlingApp.getAnswer();
        bowlingApp.startCount();

        bowlingApp.checkPlaying();
        console.log(bowlingApp.answer);
    };

    bowlingApp.checkPlaying = function () {
        if (bowlingApp.isUserPlaying === true) {
            $('#start-button button').prop(
                'disabled', true).text('Good Luck!').css({
                color: 'green',
                weight: 'bold',
                background: '#d2d2ca',
                width: '150px',
                cursor: 'auto',
                border: 'none'

            });
        } else {
            $('#start-button button').prop('disabled', false)
        }
    }

    // function that starts and stops  the countdown timer
    bowlingApp.startCount = function () {
        bowlingApp.interval = setInterval(countDown, 1000);

        function countDown() {
            bowlingApp.time--
            $('#count-down-time').text(bowlingApp.time)
            if (bowlingApp.time <= 0) {
                clearInterval(bowlingApp.interval);
                bowlingApp.stopGame();
                bowlingApp.finalScore();
            }
        }
    }

    // this allows you to keep playing after you get the answer right
    bowlingApp.keepPlaying = function () {
        bowlingApp.answer = [];
        bowlingApp.getPinNumber();
        bowlingApp.getShowPin();
        bowlingApp.getAnswer();
        console.log(bowlingApp.answer)
    }

    // creates new array called pinNumber that  holds a boolean for each pin
    bowlingApp.getPinNumber = function () {
        this.pinNumber = this.pinNumbers.map(function () {
            return bowlingApp.randomNumber();
        });
    };



    bowlingApp.getShowPin = function () {
        this.pinNumber.forEach(function (item, index) {
            if (item === true) {

                return $(`#${bowlingApp.pinNumbers[index].pinId}`).css('visibility', 'visible');

            } else {
                return $(`#${bowlingApp.pinNumbers[index].pinId}`).css('visibility', 'hidden');

            }
        });
    };

    //pushs the correct answer into new array
    bowlingApp.getAnswer = function () {
        this.pinNumber.map(function (item, index) {
            if (item === true) bowlingApp.answer.push(bowlingApp.pinNumbers[index].answerKey);
        });
    };

    //function that checks if two arrays are equal
    bowlingApp.checkEqual = function (arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (var i = arr1.length; i--;) {
            if (arr1[i] != arr2[i]) return false;
        }

        return true;
    };


    bowlingApp.plusScore = function () {
        bowlingApp.score += 12;
        $('#score').text(bowlingApp.score);
    };


    bowlingApp.minusScore = function () {
        if (bowlingApp.score <= 0) {
            bowlingApp.score = 0
        } else {
            bowlingApp.score -= 3;
        }
        $('#score').text(bowlingApp.score);
    };


    // stop form from refreshing the page
    bowlingApp.getPersonAnswer = $('form').on('submit', function (e) {
        e.preventDefault()
        // grab form inut from user 
        bowlingApp.personAnswer = $('#person-answer').val().split(',');
        console.log(bowlingApp.personAnswer);


        // checks if user's answer matches the correct answer
        if (bowlingApp.checkEqual(bowlingApp.answer, bowlingApp.personAnswer) === false) {
            bowlingApp.minusScore();
            $('.display-correctness').text('Try Again').css({
                display: 'block',
                color: 'red'
            }).fadeToggle(700);
        } else {
            bowlingApp.plusScore();
            $('.display-correctness').text('Right!').css({
                display: 'block',
                color: '#7dc243'
            }).fadeToggle(700);
            bowlingApp.keepPlaying();
        };
        //clears previous entry
        $('#person-answer').val('');
    });

    // Will display your final score at the end of the game
    bowlingApp.finalScore = function () {
        $('.display-correctness').text(`Final Score ${bowlingApp.score}`).css({
            display: 'block',
            color: '#7dc243'
        })
    };



    //stops the game by disabling the input fields 
    bowlingApp.stopGame = function () {
        $('.disable-elements').attr(
            'disabled', true).css('cursor', 'auto');
        $('#play-again-button button').css('display', 'block');
    }

    $('#play-again-button').on('click', function () {
        $('#play-again-button button').hide();
        $('.display-correctness').hide();
        $('.disable-elements').attr('disabled', false);
        $('#score').text('0');

        bowlingApp.init();
        bowlingApp.isUserPlaying = true;
        bowlingApp.getPinNumber();
        bowlingApp.getShowPin();
        bowlingApp.getAnswer();
        bowlingApp.startCount();
        bowlingApp.resetTimer();
        bowlingApp.checkPlaying();
        console.log(bowlingApp.answer);

    })

    bowlingApp.init();

});