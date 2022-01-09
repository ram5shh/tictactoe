const mainModule = (function () {

    const restartRoundButton = document.querySelector("button.resetround");
    restartRoundButton.addEventListener('click', () => {
        //restart a single round
        if (confirm("Reset this Round?")) {
            restartRound();
        }
    });

    const restartGameButton = document.querySelector("button.resetgame");
    restartGameButton.addEventListener('click', () => {
        //restart game
        if (confirm("This will reset the scoreboard. Continue?")) {
            restartGame();
        }
    });


    const _gameBoardButton = document.querySelectorAll(`#game-button`);
    let _player1Score = [[0], []]; //1st is total score, 2nd is boxes clicked in current round
    let _player2Score = [[0], []]; //1st is total score, 2nd is boxes clicked in current round
    const _winningPatterns = [[1, 2, 3], [1, 4, 7], [7, 8, 9], [3, 6, 9], [2, 5, 8], [1, 5, 9], [3, 5, 7], [4, 5, 6]];

    let _currPlayer = "1";

    const player1ScoreBoard = document.querySelector('.player1 span');
    const player2ScoreBoard = document.querySelector('.player2 span');


    const getGameBoardButton = () => {
        return _gameBoardButton;
    }

    const getCurrentPlayer = () => {
        return _currPlayer;
    }

    const changePlayer = () => {
        if (_currPlayer == "1") {
            _currPlayer = "2";
        }
        else {
            _currPlayer = "1";
        }
    }

    const getPlayer1Score = () => {
        return _player1Score[1];
    }

    const getPlayer2Score = () => {
        return _player2Score[1];
    }

    const clearPlayerScores = () => {
        _player1Score[1] = [];
        _player2Score[1] = [];
    }

    const getWinningPattern = () => {
        return _winningPatterns;
    }

    function restartRound() {
        getGameBoardButton().forEach((element) => {
            element.innerText = '';
            _currPlayer = "1";
            clearPlayerScores();
        })
    }

    function restartGame() {
        restartRound();
        _player1Score[0][0] = 0;
        _player2Score[0][0] = 0;
        renderScore();
    }


    const addToPlayerScore = (score) => {
        if (getCurrentPlayer() == "1") {
            _player1Score[1].push(score);
        }
        else {
            _player2Score[1].push(score);
        }
    }

    const updateGamesWon = (player) => {
        if (player == "1") {
            _player1Score[0][0] += 1;
        }
        else {
            _player2Score[0][0] += 1;
        }
    }

    const renderScore = () => {
        player1ScoreBoard.innerText = _player1Score[0];
        player2ScoreBoard.innerText = _player2Score[0];
    }

    return {
        restartRound,
        getPlayer1Score,
        getPlayer2Score,
        getWinningPattern,
        getCurrentPlayer,
        changePlayer,
        addToPlayerScore,
        updateGamesWon,
        renderScore
    }
})();

// mainModule.renderScore();

function checkIfWon(playerScoreArray) {
    //return true if player has winning pattern
    let matchingNumbers = 0;
    let playerStatus = false;

    for (let pattern of mainModule.getWinningPattern()) {
        for (val of pattern) { //checking each pattern
            if (playerScoreArray.includes(val)) {
                matchingNumbers += 1;
            }
        }
        if (matchingNumbers == 3) {
            playerStatus = true;
            return playerStatus;
        }
        else {
            matchingNumbers = 0;
        }
    }
    return playerStatus;
}


window.addEventListener('click', function(event) {
    console.log(event);
    if (event.target.id === "game-button") {
        //player plays
        if (mainModule.getCurrentPlayer() == "1" && event.target.innerText == '') {
            event.target.innerText = "X";
            event.target.setAttribute("style", "font-size:50px");
            mainModule.addToPlayerScore(+event.target.classList.value);


            if (checkIfWon(mainModule.getPlayer1Score())) { //player1 won the round
                mainModule.updateGamesWon(mainModule.getCurrentPlayer());
                setTimeout(function () { alert("WINNER: PLAYER 1!"); }, 250);
                setTimeout(function () { mainModule.restartRound(); }, 1000);
                mainModule.renderScore();
                return;
            } else {
                mainModule.changePlayer();
            }
        }

        else if (mainModule.getCurrentPlayer() == "2" && event.target.innerText == '') {
            event.target.innerText = "O";
            event.target.setAttribute("style", "font-size:50px");
            mainModule.addToPlayerScore(+event.target.classList.value);

            if (checkIfWon(mainModule.getPlayer2Score())) { //player2 won the round
                mainModule.updateGamesWon(mainModule.getCurrentPlayer());
                setTimeout(function () { alert("WINNER: PLAYER 2!"); }, 250);
                setTimeout(function () { mainModule.restartRound(); }, 1000);
                mainModule.renderScore();
                return;
            } else {
                mainModule.changePlayer();
            }
        }
    }
}
);