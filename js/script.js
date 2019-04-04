const newGame = document.getElementById('btn-new-game');
const tableWrapper = document.getElementById('table-output');
const params = {
    playerName: undefined,
    round: 0,
    computerMove: undefined,
    computerPoints: 0,
    playerPoints: 0,
    winPoints: undefined,
    gameReady: 'start',
    progress: []
}

function createTable() {
    const table = document.createElement('table');
    tableWrapper.appendChild(table);
    const tableLabels = ['Round nr', 'Player move', 'AI move', 'Round winner', 'Score'];
    const tableHeaderRow = document.createElement('tr');
    table.appendChild(tableHeaderRow);
    for (let i = 0; i < tableLabels.length; i++) {
        let tableHeaderData = document.createElement('th');
        tableHeaderData.innerHTML = tableLabels[i];
        tableHeaderRow.appendChild(tableHeaderData)
    }
    for (let j = 0; j < params.progress.length; j++) {
        tableRow = document.createElement('tr');
        for (let key in params.progress[j]) {
            const tableData = document.createElement('td');
            tableData.innerHTML = params.progress[j][key];
            tableRow.appendChild(tableData);
        }
        table.appendChild(tableRow);
    }
}

let gameLog = function (text) {
    const output = document.getElementById('output');
    output.innerHTML = text;
}

let endLog = function(text) {
    const modal = document.getElementById('game-end');
    modal.classList.add('show');
    createTable();
    const modalOutput = document.getElementById('game-end-output');
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
    document.addEventListener('keyup', function (event) {
        if (event.keyCode === 27) {
            modal.classList.remove('show');
        }
    });
}
  
function tableLog(playerValue, winner) {
    params.round++;
    const newObject = {
        nr: params.round,
        player: playerValue,
        computer: params.computerMove,
        roundWinner: winner,
        score: params.playerPoints + ' - ' + params.computerPoints
    }
    params.progress.push(newObject);
}

let pointsLog = function(player, computer) {
    let score = player + ' - ' + computer;
    const scoreBoard = document.getElementById('game-score');
    scoreBoard.innerHTML = score;
}

let winConditionLog = function (text) {
    const winPointsOutput = document.getElementById('win-condition');
    winPointsOutput.innerHTML = text;
}



// Start screen


gameLog('Press "New game" to start');
pointsLog(params.playerPoints, params.computerPoints);

moveButtons = document.querySelectorAll('.player-move');
for (i = 0; moveButtons.length > i; i++) {
    let moves = moveButtons[i];
    moves.addEventListener('click', function (e) {
        let moveValue = e.target.getAttribute('data-move');
        buttonValue(moveValue);
    })
}

let buttonValue = function(selection) {
    if(params.gameReady === 'started'){
        playerMove(selection);
    }
    else if(params.gameReady === 'start'){
        gameLog('Please start the game by clicking the "New game" button');
    }
    else if(params.gameReady === 'end'){
        gameLog('Game over, please press the "New game" button to start again.');
    }
}

let playerMove = function(playerValue) {
    computerRandom();
    let winner = 'draw';
    if(playerValue === params.computerMove) {
        gameLog('Draw! Both ' + params.playerName + ' and the AI played ' + playerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
    }
    else if((playerValue === 'rock' && params.computerMove === 'scissors') || (playerValue === 'scissors' && params.computerMove === 'paper') || (playerValue === 'paper' && params.computerMove === "rock")) {
        params.playerPoints++;
        winLoseMsg('wins', playerValue, params.computerMove);
        winner = params.playerName;
    }
    else{
        params.computerPoints++;
        winLoseMsg('lost', playerValue, params.computerMove);
        winner = 'AI'
    }
    tableLog(playerValue, winner);
    pointsLog(params.playerPoints, params.computerPoints);
    scoreCheck(params.playerPoints, params.computerPoints);
}

let computerRandom = function () {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        params.computerMove = 'paper';
    }
    else if (randomNumber === 2) {
        params.computerMove = 'rock';
    }
    else {
        params.computerMove = 'scissors';
    }
}

let winLoseMsg = function(result, playerValue, computerValue) {
    gameLog(params.playerName + ' ' + result + ' !<br>' + params.playerName + ' played ' + playerValue + ' while computer played ' + computerValue + '.<br><br>Next round.<br>Select "Rock", "Papper" or "Scissors" and press the apropriate button.');
}

let scoreCheck = function(player, computer) {
    if (player === params.winPoints) {
        gameLog('Press the "New game" button to play again!');
        endLog(params.playerName + ' <strong>won!<br></strong>' + params.playerName + ' is awesome and beat the super-inteligent AI!<br><br>Close this window and press the "New game" button to play again!');
        endGame();
    }
    else if (computer === params.winPoints) { 
        gameLog('Press the "New game" button to play again!');
        endLog(params.playerName + ' <strong>lost!</strong><br>The super-inteligent AI has yet again proven to be the best.<br><br>Close this window and press the "New game" button to play again!');
        endGame();
    }
}

let endGame = function () {
    params.round = 0;
    params.computerPoints = 0;
    params.playerPoints = 0;
    winConditionLog("");
    params.winPoints = undefined;
    setTimeout(function() {
        params.gameReady = 'end';
    }, 0)
}

newGame.addEventListener('click', function () {
    if (tableWrapper.hasChildNodes()) {
        tableWrapper.childNodes[0].remove();
    }
    params.progress = [];
    const modal = document.getElementById('game-start');
    modal.classList.add('show');
    startGame(modal);
})

function startGame(modal) {
    const startGame = document.getElementById('start-game-btn');
    closeModal(modal);
    startGame.addEventListener('click', function () {
        params.playerName = document.getElementById('input-name').value;
        params.winPoints = document.getElementById('input-rounds').value;
        params.winPoints = Math.abs(parseInt(params.winPoints, 10));
        if ((params.playerName.length > 0) && !isNaN(params.winPoints)) {
            winConditionLog('First to ' + params.winPoints + ' points wins.');
            gameLog('Select "Rock", "Papper" or "Sciccors" and press the apropriate button.');
            params.computerPoints = 0;
            params.playerPoints = 0;
            pointsLog(params.playerPoints, params.computerPoints);
            params.gameReady = 'started';
            modal.classList.remove('show');
        }
        else {
            window.alert('Please enter name and number of rounds');
        }
    })
}