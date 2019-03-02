var rockInput = document.getElementById('btn-rock');
var paperInput = document.getElementById('btn-paper');
var scissorsInput = document.getElementById('btn-scissors');
var newGame = document.getElementById('btn-new-game');
var computerPoints = 0;
var playerPoints = 0;
var winPoints;
var gameReady = 'start';
var computerMove;
var winPointsOutput = document.getElementById('win-condition');
var output = document.getElementById('output');
var scoreBoard = document.getElementById('game-score');

var gameLog = function(text){
    output.innerHTML = text;
};

var pointsLog = function(player, computer) {
    var score = player + ' - ' + computer;
    scoreBoard.innerHTML = score;
};

var winConditionLog = function(text) {
    winPointsOutput.innerHTML = text;
};

gameLog('Press "New game" to start');
pointsLog(playerPoints, computerPoints);

paperInput.addEventListener('click', function() {
    buttonValue('paper');
});
rockInput.addEventListener('click', function() {
    buttonValue('rock');
});
scissorsInput.addEventListener('click', function() {
    buttonValue('scissors');
});

var buttonValue = function(selection) {
    if(gameReady === 'started'){
        playerMove(selection);
    }
    else if(gameReady === 'start') {
        gameLog('Please start the game by clicking the "New game" button');
    }
    else if(gameReady === 'end') {
        gameLog('Game over, please press the "New game" button to start again.');
    };
};

var playerMove = function(playerValue) {
    computerRandom();
    if(playerValue === computerMove) {
        gameLog('Draw! You both played ' + playerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
    }
    else if((playerValue === 'rock' && computerMove === 'scissors') || (playerValue === 'scissors' && computerMove === 'paper') || (playerValue === 'paper' && computerMove === "rock")) {
        playerPoints++;
        winLoseMsg('win', playerValue, computerMove);
    }
    else{
        computerPoints++;
        winLoseMsg('lose', playerValue, computerMove);
    };
    pointsLog(playerPoints, computerPoints);
    scoreCheck(playerPoints, computerPoints);
};

var computerRandom = function() {
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    if(randomNumber === 1) {
        computerMove = 'paper';
    }
    else if(randomNumber === 2) {
        computerMove = 'rock';
    }
    else {
        computerMove = 'scissors';
    };
};

var winLoseMsg = function(result, playerValue, computerValue) {
    gameLog('You ' + result + ' !<br>You played ' + playerValue + ' while computer played ' + computerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Scissors" and press the apropriate button.');
};

var scoreCheck = function(player, computer) {
    if (player === winPoints) {
        gameLog('<strong>You win</strong>!<br>You are awesome and beat the super-inteligent AI!<br><br>Press the "New game" button to play again!');
        endGame();
    }
    else if(computer === winPoints) { 
        gameLog('<strong>You lose!</strong><br>The super-inteligent AI has yet again proven to be the best.<br><br>Press the "New game" button to play again!');
        endGame();
    };
};

var endGame = function() {
    computerPoints = 0;
    playerPoints = 0;
    winConditionLog("");
    winPoints = undefined;
    setTimeout(function() {
        gameReady = 'end';
    }, 0);
};

newGame.addEventListener('click', function(){
    winPoints = window.prompt('Enter score needed to win');
    winPoints = Math.abs(parseInt(winPoints, 10));
    if(typeof winPoints === 'number' && !isNaN(winPoints)) {
        winConditionLog('Firs to ' + winPoints + ' points wins.');
        gameLog('Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
        computerPoints = 0;
        playerPoints = 0;
        pointsLog(playerPoints, computerPoints);
        gameReady = 'started';
    }
    else {
        gameLog('Please use a number');
    };
});