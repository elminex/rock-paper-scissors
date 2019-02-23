
var rockInput = document.getElementById('btn-rock');
var paperInput = document.getElementById('btn-paper');
var scissorsInput = document.getElementById('btn-scissors');
var playerSelection;
var computerPoints = 0;
var playerPoints = 0;
var gameLog = function(text){
    var output = document.getElementById('output');
    output.innerHTML = text;
};
var pointsLog = function(computer, player) {
    var playerScore = document.getElementById('player-score');
    var computerScore = document.getElementById('computer-score');
    playerScore.innerHTML = player;
    computerScore.innerHTML = computer;
}
gameLog('Select your move by pushing the apropriate button.');
pointsLog(computerPoints, playerPoints);

var playerMove = function(playerMove) {
    var computerRandom = Math.floor(Math.random() * 3) + 1;
    console.log(computerRandom);
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
    console.log(computerMove);
    console.log(playerMove);
    if(playerMove == computerMove) {
        gameLog('Draw! You both played ' + playerMove + '. Try again.');
    }
    else if(playerMove == 'rock') {
        if(computerMove == 'paper'){
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Try again.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Want to go again?');
            playerPoints++;
        }
    }
    else if(playerMove == 'scissors') {
        if(computerMove == 'paper'){
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Want to go again?');
            playerPoints++;
        }
        else {
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Try again.');
            computerPoints++;
        }
    }
    else if(playerMove == 'paper') {
        if(computerMove == 'scissors') {
            gameLog('You lose!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Try again.');
            computerPoints++;
        }
        else {
            gameLog('You win!<br>You played ' + playerMove + ' while computer played ' + computerMove + '.<br>Want to go again?');
            playerPoints++
        }
    }
    pointsLog(computerPoints, playerPoints);
};

paperInput.addEventListener('click', function (){
    playerSelection = 'paper';
    playerMove(playerSelection);
});

rockInput.addEventListener('click', function (){
    playerSelection = 'rock';
    playerMove(playerSelection);
});

scissorsInput.addEventListener('click', function (){
    playerSelection = 'scissors';
    playerMove(playerSelection);
});