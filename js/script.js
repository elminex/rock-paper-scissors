
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
    gameReady = 'end';
}
var pointsLog = function(player, computer) {
    var scoreBoard = document.getElementById('game-score');
    var score = player + ' - ' + computer;
    scoreBoard.innerHTML = score;
};

var scoreCheck = function(player, computer) {
    if (player == winPoints) {
        gameLog('You win! Game over');
        endGame();
    }
    if (computer == winPoints) { 
        gameLog('You lose! Game over');
        endGame();
    };
};

paperInput.addEventListener('click', function(){
    console.log(gameReady);
    if(gameReady === 'started') {
        playerSelection = 'paper';
        playerMove(playerSelection);
    }
    if(gameReady === 'start') {
        gameLog('Please start the game by clicking the "New game" button')
    }
    if(gameReady === 'end') {
        gameLog('Game over, please press the "New game" button to start again.')
    }
});

rockInput.addEventListener('click', function(){
    if (gameReady === 'started') {
        playerSelection = 'rock';
        playerMove(playerSelection);
    }
    if (gameReady === 'start') {
        gameLog('Please start the game by clicking the "New game" button')
    }
    if(gameReady === 'end') {
        gameLog('Game over, please press the "New game" button to start again.')
    }
});

scissorsInput.addEventListener('click', function(){
    if(gameReady === 'started') {
        playerSelection = 'scissors';
        playerMove(playerSelection);
    }
    if(gameReady === 'start') {
        gameLog('Please start the game by clicking the "New game" button')
    }
    if(gameReady === 'end') {
        gameLog('Game over, please press the "New game" button to start again.')
    }
});

gameLog('Press "New game" to start');
pointsLog(0, 0);
var playerMove = function(playerMove) {
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
    if(playerMove == computerMove) {
        gameLog('Draw! You both played ' + playerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
    }
    else if(playerMove == 'rock') {
        if(computerMove == 'paper'){
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            playerPoints++;
        }
    }
    else if(playerMove == 'scissors') {
        if(computerMove == 'paper'){
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            playerPoints++;
        }
        else {
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
    }
    else if(playerMove == 'paper') {
        if(computerMove == 'scissors') {
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
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