//constants//


//state variables//
let board;
let mineAmount = 10;
let minePosition = [];

//cached varriables//
const playAgn = document.getElementById("play-agn");
const boardEl = document.querySelectorAll(".cell");
const flagBtn = document.getElementById('flag-btn');
const mineCount = document.getElementById('minesLeft');

//EventListener//
playAgn.addEventListener("click", init);
flagBtn.addEventListener("click", toggle);
boardEl.forEach(cell => {
    cell.addEventListener("click", handleInput);
});
    

//functions//
init();

function init() {
    boardEl.forEach(cell => {
        cell.classList.remove('clicked');
        cell.innerHTML = "";
        cell.style.backgroundColor = '';
    });
    flagBtn.classList.replace('toggled', 'not-toggled');
    minePosition = [];
    board = [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ]
    render();
}

/* have a function that renders the board*/
function render(){
    renderMines();
    renderMessage();
}

/* Have a display to tell you the number of mines */

/* have a players move function and event listener */
function handleInput(evt) {
    const cell = evt.target;
    if (flagBtn.classList == 'toggled') {
        if (cell.innerHTML == '') {
            cell.innerHTML = '🚩';
        } else {
            cell.innerHTML = '';
        };
    }else if (minePosition.includes(cell.id)) {
        return gameOver();
    } else {
        cell.classList.add('clicked');
        countAdjMines();
    }
}

/* Have an end game function that activates if the player has passed the level or stepped/"clicked" on a mine */
 function gameOver() {
    boardEl.forEach((cell) => {
        if (minePosition.includes(cell.id)) {
            cell.innerHTML = '💣';
            cell.style.backgroundColor = 'red';
        }
    })
 }
/* have a function to count adjacent mines an tag the squares next to the mines */
function countAdjMines() {
    let minesFound = 0;
    minesFound += countAdjacent();
    minesFound += countAdjacent();

}

/* have a function that will open adjacent empty spaces not touching a mine */
//flood function?

/* Have a mark function so the player can remind their self that a mine is there */
function toggle() {
    this.classList.toggle('not-toggled');
    this.classList.toggle('toggled');
}

function renderMines() {
    let minesGenerated = mineAmount;
    while(minesGenerated > 0) {
        let row = Math.floor(Math.random() * 8);
        let column = Math.floor(Math.random() * 8);
        let idx = row.toString() + "-" + column.toString();
        if (!minePosition.includes(idx)) {
            minePosition.push(idx);
            minesGenerated -= 1;
        }
    }
}

function renderMessage() {
    mineCount.innerHTML = mineAmount;

}
