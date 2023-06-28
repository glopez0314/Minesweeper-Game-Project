let mineAmount = 10;
let minePosition = [];
let marked = 0;
let cellsClicked = 0;
let time = 0;

const playAgn = document.getElementById("play-agn");
const board = document.getElementById('board');
const boardEl = document.querySelectorAll(".cell");
const flagBtn = document.getElementById('flag-btn');
const barOne = document.getElementById('info');
const barTwo = document.getElementById('time');
const barThree = document.getElementById('bar-three');
const barFour = document.getElementById('bar-four');
const mineCount = document.getElementById('minesLeft');
const winMessage = document.getElementById('win-message');
const timer = document.getElementById('counter');

playAgn.addEventListener("click", init);
flagBtn.addEventListener("click", toggle);
boardEl.forEach(cell => {
    cell.addEventListener("click", handleInput);
});
    
init();

function init() {
    boardEl.forEach(cell => {
        cell.classList.remove('clicked');
        cell.classList.remove('m-1');
        cell.classList.remove('m-2');
        cell.classList.remove('m-3');
        cell.classList.remove('m-4');
        cell.classList.remove('m-5');
        cell.classList.remove('m-6');
        cell.classList.remove('m-7');
        cell.classList.remove('m-8');
        cell.innerHTML = "";
        cell.style.backgroundColor = '';
    });
    board.classList.remove('hide');
    winMessage.classList.remove('show');
    flagBtn.classList.remove('hide');
    playAgn.classList.remove('show');
    barOne.classList.remove('hide');
    barTwo.classList.remove('hide');
    barThree.classList.remove('show');
    barFour.classList.remove('show');
    flagBtn.classList.replace('toggled', 'not-toggled');
    cellsClicked = 0;
    minePosition = [];
    mineAmount = 10;
    marked = 0;
    endGame = false;
    time = 0;
    render();
}

function render(){
    renderMines();
    renderMessage();
}

function handleInput(evt) {
    const cell = evt.target;
    if (cell.classList.contains("clicked") || endGame) {
        return;
    } else if (flagBtn.classList == 'toggled') {
        if (cell.innerHTML == '') {
            cell.innerHTML = '🚩';
            marked += 1;
            renderMessage();
        } else {
            cell.innerHTML = '';
            marked -= 1;
            renderMessage();
        };
    }else if (minePosition.includes(cell.id)) {
        return gameOver();
    } else {
        if (cell.innerHTML == '🚩') {
        cell.innerHTML = '';
        marked -= 1;
        renderMessage();
        }
        const num = cell.id.split("-");
        let row = parseInt(num[0]);
        let col = parseInt(num[1]);
        countAdjMines(row, col);
        checkWin();
    }
}   

function checkWin() {
    if (cellsClicked === 54) {
        endGame = true;
        flagBtn.classList.add('hide');
        playAgn.classList.add('show');
        board.classList.add('hide');
        winMessage.classList.add('show');
        
    }
} 

function gameOver() {
    endGame = true;
    flagBtn.classList.add('hide');
    playAgn.classList.add('show');
    barOne.classList.add('hide');
    barTwo.classList.add('hide');
    barThree.classList.add('show');
    barFour.classList.add('show');
    boardEl.forEach((cell) => {
        if (minePosition.includes(cell.id)) {
            cell.innerHTML = '💣';
            cell.style.backgroundColor = 'red';
        }
    })
 }

function countAdjMines(row, col) {
    const cell = document.getElementById(row.toString() + "-" + col.toString())
    if (row < 0 || row >= 8 || col < 0 || col >= 8) {
        return;
    }
    if (cell.classList.contains('clicked')) {
        return;
    }
    cell.classList.add('clicked');
    cellsClicked += 1;
    let minesNearby = 0;
   
    minesNearby += checkAdjacent(row - 1, col - 1);
    minesNearby += checkAdjacent(row - 1, col);
    minesNearby += checkAdjacent(row - 1, col + 1);
    minesNearby += checkAdjacent(row, col + 1);
    minesNearby += checkAdjacent(row + 1, col + 1);
    minesNearby += checkAdjacent(row + 1, col);
    minesNearby += checkAdjacent(row + 1, col - 1);
    minesNearby += checkAdjacent(row, col - 1);
    if (minesNearby > 0) {
        cell.innerText = minesNearby;
        cell.classList.add(`m-${minesNearby}`);
    } else {
        countAdjMines(row - 1, col - 1,);
        countAdjMines(row - 1, col,);
        countAdjMines(row - 1, col + 1,);
        countAdjMines(row, col + 1,);
        countAdjMines(row + 1, col + 1,);
        countAdjMines(row + 1, col,);
        countAdjMines(row + 1, col - 1,);
        countAdjMines(row, col - 1,);
    }
    

    function checkAdjacent(row, col) {
        if (row < 0 || row >= 8 || col < 0 || col >= 8) {
            return 0;
        }
        if (minePosition.includes(row.toString() + "-" + col.toString())) {
            return 1;
        } else {
            return 0;
        }
    }
}

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
    mineCount.innerHTML = (mineAmount - marked);
};

function startTimer() {
    setInterval(countTime, 1000);
}

function countTime() {
    if (!endGame) {
        time++;
        timer.innerText = time;
    }
}

startTimer();