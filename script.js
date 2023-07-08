let minePosition;
let cellsClicked;
let mineAmount;
let strTime;
let endGame;
let marked;
let clock;
let time;

const winMessage = document.getElementById('win-message');
const mineCount = document.getElementById('minesLeft');
const barThree = document.getElementById('bar-three');
const playAgn = document.getElementById("play-agn");
const flagBtn = document.getElementById('flag-btn');
const barFour = document.getElementById('bar-four');
const boardEl = document.querySelectorAll(".cell");
const timer = document.getElementById('counter');
const board = document.getElementById('board');
const barOne = document.getElementById('info');
const barTwo = document.getElementById('time');

playAgn.addEventListener("click", init);
flagBtn.addEventListener("click", toggle);
boardEl.forEach(cell => {
    cell.addEventListener("click", handleInput);
});
    
init();

function init() {
    boardEl.forEach(cell => {
        cell.classList.remove('clicked', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'm-6', 'm-7', 'm-8');
        cell.innerHTML = "";
        cell.style.backgroundColor = '';
    });
    flagBtn.classList.replace('toggled', 'not-toggled');
    winMessage.classList.remove('show');
    barThree.classList.remove('show');
    flagBtn.classList.remove('hide');
    playAgn.classList.remove('show');
    barFour.classList.remove('show');
    barOne.classList.remove('hide');
    barTwo.classList.remove('hide');
    board.classList.remove('hide');
    minePosition = [];
    cellsClicked = 0;
    mineAmount = 10;
    endGame = false;
    marked = 0;
    time = 0;
    timer.innerText = time;
    render();
    stopTime();
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
        startTimer();
    }
}   

function checkWin() {
    if (cellsClicked === 54) {
        endGame = true;
        winMessage.classList.add('show');
        flagBtn.classList.add('hide');
        playAgn.classList.add('show');
        board.classList.add('hide');
        
    }
} 

function gameOver() {
    endGame = true;
    barThree.classList.add('show');
    flagBtn.classList.add('hide');
    playAgn.classList.add('show');
    barFour.classList.add('show');
    barOne.classList.add('hide');
    barTwo.classList.add('hide');
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
    minesNearby += checkAdjacent(row - 1, col + 1);
    minesNearby += checkAdjacent(row + 1, col + 1);
    minesNearby += checkAdjacent(row + 1, col - 1);
    minesNearby += checkAdjacent(row - 1, col);
    minesNearby += checkAdjacent(row + 1, col);
    minesNearby += checkAdjacent(row, col + 1);
    minesNearby += checkAdjacent(row, col - 1);
    if (minesNearby > 0) {
        cell.innerText = minesNearby;
        cell.classList.add(`m-${minesNearby}`);
    } else {
        countAdjMines(row - 1, col - 1,);
        countAdjMines(row - 1, col + 1,);
        countAdjMines(row + 1, col + 1,);
        countAdjMines(row + 1, col - 1,);
        countAdjMines(row - 1, col,);
        countAdjMines(row + 1, col,);
        countAdjMines(row, col + 1,);
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

function render(){
    renderMines();
    renderMessage();
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
    if (!strTime) {
        strTime = true;
        clock = setInterval(countTime, 1000);
    }
}

function countTime() {
    if (!endGame) {
        time++;
        timer.innerText = time;
    } else return;
}

function stopTime() {
    clearInterval(clock);
    strTime = false;
}