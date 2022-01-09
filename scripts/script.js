// (function () {

//     let mainObject = {

//         restartButton = {
//             theButton: document.querySelector("button.reset"),
//             restartGame: function () {
//                 gameBoardButton.forEach((element) => {
//                     element.innerHTML = '';
//                     currPlayer = "1";
//                     player1Score = [];
//                     player2Score = [];
//                 })
//             }
//         },
//         gameBoardButton: document.querySelectorAll(`#game-button`),
//         player1Score: [],
//         player2Score: [],
//         winningPatterns: [[1, 2, 3], [1, 4, 7], [7, 8, 9], [3, 6, 9], [2, 5, 8], [1, 5, 9], [3, 5, 7]],

//     }


// })();



const gameBoardButton = document.querySelectorAll(`#game-button`);
let currPlayer = "1";
const winningPatterns = [[1, 2, 3], [1, 4, 7], [7, 8, 9], [3, 6, 9], [2, 5, 8], [1, 5, 9], [3, 5, 7]];
let player1Score = [];
let player2Score = [];

function checkIfWon(playerScoreArray) {
    //return true if player has winning pattern
    let matchingNumbers = 0;
    let playerStatus = false;

    for (let pattern of winningPatterns) {
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


window.addEventListener('click', (event) => {
    if (event.target.innerHTML === "Restart Game") {
        //restart game
        gameBoardButton.forEach((element) => {
            element.innerHTML = '';
            currPlayer = "1";
            player1Score = [];
            player2Score = [];
        })
    }

    if (event.path[0].id == `game-button`) {
        //player plays
        if (currPlayer == "1" && event.target.innerHTML == '') {
            event.target.innerHTML = "X";
            currPlayer = "2";
            player1Score.push(+event.target.classList.value);
        }
        else if (currPlayer == "2" && event.target.innerHTML == '') {
            event.target.innerHTML = "O";
            currPlayer = "1";
            player2Score.push(+event.target.classList.value);
        }

        //check winner
        if (player1Score.length > 2) {
            if (checkIfWon(player1Score)) {
                alert('player 1 won! ');
                player1Score = [];
                player2Score = [];
                return;
            }
            else if (checkIfWon(player2Score)) {
                alert('player 2 won! ');
                player1Score = [];
                player2Score = [];
                return;
            }
        }
    }
});







