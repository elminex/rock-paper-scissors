
var rockInput = document.getElementById('btn-rock');
var paperInput = document.getElementById('btn-paper');
var scissorsInput = document.getElementById('btn-scissors');
var newGame = document.getElementById('btn-new-game');
var playerSelection;
var computerPoints = 0;
var playerPoints = 0;
var winPoints;
var gameReady = 'start';

var winConditionLog = function(text) {
    var winPointsOutput = document.getElementById('win-condition');
    winPointsOutput.innerHTML = text;
}
var gameLog = function(text){
    var output = document.getElementById('output');
    output.innerHTML = text;
};

var endGame = function() {
    computerPoints = 0;
    playerPoints = 0;
    winConditionLog("");
    winPoints = undefined;
    setTimeout(function() {
        gameReady = 'end';
    }, 0);
}

var pointsLog = function(player, computer) {
    var scoreBoard = document.getElementById('game-score');
    var score = player + ' - ' + computer;
    scoreBoard.innerHTML = score;
};

var scoreCheck = function(player, computer) {
    if (player === winPoints) {
        gameLog('You win! Game over');
        endGame();
    }
    if (computer === winPoints) { 
        gameLog('You lose! Game over');
       endGame();
    };
};

paperInput.addEventListener('click', function() {
    buttonValue('paper')
});
rockInput.addEventListener('click', function() {
    buttonValue('rock')
});
scissorsInput.addEventListener('click', function() {
    buttonValue('scissors')
});

var buttonValue = function(selection) {
    if(gameReady === 'started'){
        playerMove(selection);
    }
    if(gameReady === 'start') {
        gameLog('Please start the game by clicking the "New game" button')
    }
    if(gameReady === 'end') {
        gameLog('Game over, please press the "New game" button to start again.')
    };
};

gameLog('Press "New game" to start');
pointsLog(0, 0);
var playerMove = function(playerValue) {
    var computerRandom = Math.floor(Math.random() * 3) + 1;
    var computerMove;
    if(computerRandom == 1) {
        computerMove = 'paper';
    }
    else if(computerRandom == 2) {
        computerMove = 'rock';
    }
    else {
        computerMove = 'scissors';
    }
    if(playerValue == computerMove) {
        gameLog('Draw! You both played ' + playerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
    }
    else if(playerValue == 'rock') {
        if(computerMove == 'paper'){
            gameLog('You lose!<br>You played ' + playerValue + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerValue + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            playerPoints++;
        }
    }
    else if(playerValue == 'scissors') {
        if(computerMove == 'paper'){
            gameLog('You win!<br>You played ' + playerValue + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            playerPoints++;
        }
        else {
            gameLog('You lose!<br>You played ' + playerValuee + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
    }
    else if(playerValue == 'paper') {
        if(computerMove == 'scissors') {
            gameLog('You lose!<br>You played ' + playerValue + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerValue + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            playerPoints++;
        }
    }
    pointsLog(playerPoints, computerPoints);
    scoreCheck(playerPoints, computerPoints);
};

newGame.addEventListener('click', function(){
    winPoints = window.prompt('Enter score needed to win');
    winPoints = Math.abs(parseInt(winPoints, 10));
    if(typeof winPoints === 'number' && !isNaN(winPoints)) {
        winConditionLog('You need ' + winPoints + ' points to win.');
        gameLog('Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
        pointsLog(0, 0);
        gameReady = 'started';
    }
    else {
        gameLog('Please use a number');
    }
});