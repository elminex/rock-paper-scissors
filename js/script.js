var newGame = document.getElementById('btn-new-game');
var winPointsOutput = document.getElementById('win-condition');
var output = document.getElementById('output');
var scoreBoard = document.getElementById('game-score');
let tableWrapper = document.getElementById('table-output');
let params = {
    round: 0,
    computerMove: undefined,
    computerPoints: 0,
    playerPoints: 0,
    winPoints: undefined,
    gameReady: 'start',
    progress: []
}
function createTable() {
    let table = document.createElement('table');
    table.setAttribute('id', 'summary-table')
    tableWrapper.appendChild(table);
    let tableLabels = ['Round nr', 'Player move', 'AI move', 'Round winner', 'Score'];
    let tableHeaderRow = document.createElement('tr');
    table.appendChild(tableHeaderRow);
    for (let i = 0; i < tableLabels.length; i++) {
        let tableHeaderData = document.createElement('th');
        tableHeaderData.innerHTML = tableLabels[i];
        tableHeaderRow.appendChild(tableHeaderData)
    }
    for (let j = 0; j < params.progress.length; j++) {
        tableRow = document.createElement('tr');
        for (let key in params.progress[j]) {
            let tableData = document.createElement('td');
            tableData.innerHTML = params.progress[j][key];
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }
}
var gameLog = function(text){
    output.innerHTML = text;
};
let endLog = function(text) {
    let modal = document.getElementById('game-end');
    modal.classList.add('show');
    createTable();
    let modalOutput = document.getElementById('game-end-output');
    modalOutput.innerHTML = text;
    closeModal(modal);
}
function closeModal(modal) {
    window.onclick = function (event) {
      if (event.target == modal)
            modal.classList.remove('show');
    }
    const close = document.getElementById('close-modal');
    close.onclick = function () {
        modal.classList.remove('show');
    }
    document.addEventListener('keyup', function(event) {
      if(event.keyCode === 27) {
          modal.classList.remove('show');
      }
    })
}
  
function tableLog(playerValue, winner) {
    params.round++;
    let newObject = {
        nr: params.round,
        player: playerValue,
        computer: params.computerMove,
        roundWinner: winner,
        score: params.playerPoints + ' - ' + params.computerPoints,
    }
    params.progress.push(newObject);
}
var pointsLog = function(player, computer) {
    var score = player + ' - ' + computer;
    scoreBoard.innerHTML = score;
};

var winConditionLog = function(text) {
    winPointsOutput.innerHTML = text;
};

gameLog('Press "New game" to start');
pointsLog(params.playerPoints, params.computerPoints);

moveButtons = document.querySelectorAll('.player-move');
for (i = 0; moveButtons.length > i; i++) {
    let moves = moveButtons[i];
    moves.addEventListener('click', function (e) {
        let moveValue = e.target.getAttribute('data-move');
        buttonValue(moveValue)
    })
}

var buttonValue = function(selection) {
    if(params.gameReady === 'started'){
        playerMove(selection);
    }
    else if(params.gameReady === 'start'){
        gameLog('Please start the game by clicking the "New game" button');
    }
    else if(params.gameReady === 'end'){
        gameLog('Game over, please press the "New game" button to start again.');
    };
};

var playerMove = function(playerValue) {
    computerRandom();
    let winner;
    if(playerValue === params.computerMove) {
        gameLog('Draw! You both played ' + playerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
        winner = 'draw';
    }
    else if((playerValue === 'rock' && params.computerMove === 'scissors') || (playerValue === 'scissors' && params.computerMove === 'paper') || (playerValue === 'paper' && params.computerMove === "rock")) {
        params.playerPoints++;
        winLoseMsg('win', playerValue, params.computerMove);
        winner = 'player';
    }
    else{
        params.computerPoints++;
        winLoseMsg('lose', playerValue, params.computerMove);
        winner = 'AI'
    };
    tableLog(playerValue, winner);
    pointsLog(params.playerPoints, params.computerPoints);
    scoreCheck(params.playerPoints, params.computerPoints);
};

var computerRandom = function() {
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    if(randomNumber === 1) {
        params.computerMove = 'paper';
    }
    else if(randomNumber === 2) {
        params.computerMove = 'rock';
    }
    else {
        params.computerMove = 'scissors';
    };
};

var winLoseMsg = function(result, playerValue, computerValue) {
    gameLog('You ' + result + ' !<br>You played ' + playerValue + ' while computer played ' + computerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Scissors" and press the apropriate button.');
};

var scoreCheck = function(player, computer) {
    if (player === params.winPoints) {
        gameLog('Press the "New game" button to play again!');
        endLog('<strong>You win</strong>!<br>You are awesome and beat the super-inteligent AI!<br><br>Close this window and press the "New game" button to play again!');
        endGame();
    }
    else if (computer === params.winPoints) { 
        gameLog('Press the "New game" button to play again!');
        endLog('<strong>You lose!</strong><br>The super-inteligent AI has yet again proven to be the best.<br><br>Close this window and press the "New game" button to play again!');
        endGame();
    };
};

var endGame = function () {
    params.round = 0;
    params.computerPoints = 0;
    params.playerPoints = 0;
    winConditionLog("");
    params.winPoints = undefined;
    setTimeout(function() {
        params.gameReady = 'end';
    }, 0);
};

newGame.addEventListener('click', function () {
    if (tableWrapper.hasChildNodes()) {
        tableWrapper.childNodes[0].remove();
    }
    params.progress = [];
    params.winPoints = window.prompt('Enter score needed to win');
    params.winPoints = Math.abs(parseInt(params.winPoints, 10));
    if(typeof params.winPoints === 'number' && !isNaN(params.winPoints)) {
        winConditionLog('First to ' + params.winPoints + ' points wins.');
        gameLog('Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
        params.computerPoints = 0;
        params.playerPoints = 0;
        pointsLog(params.playerPoints, params.computerPoints);
        params.gameReady = 'started';
    }
    else {
        gameLog('Please use a number');
    };
});