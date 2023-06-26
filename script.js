//constants//
const PLAYER = "player";

//state variables//
let player;
let board;
let mines;

//cached varriables//
const playAgn = document.getElementById("pla-agn");
const boardEl = document.getElementById("board");
const flagBtn = documnet.getElementById('flag-btn');

//EventListener//
playAgn.addEventListener("click", init);
flagBtn.addEventListener("click", toggle);
boardEl.addEventListener("click", hadleInput);

//functions//
init();

function init() {
    render();
}

/* have a function that renders the board*/
function render(){
    renderBoard();
    renderMessage();
}

/* Have a display to tell you the number of mines */

/* have a players move function and event listener */
function handleInput() {

}

/* Have an end game function that activates if the player has passed the level or stepped/"clicked" on a mine */
function gameOver() {
    if {

    } else {

    }
}

/* have a function to count adjacent mines an tag the squares next to the mines */
function countAdjMines() {

}

/* have a function that will open adjacent empty spaces not touching a mine */
//flood function?

/* Have a mark function so the player can remind their self that a mine is there */
function toggle() {

}

function renderBoard() {

}

function renderMessage() {
    
}
