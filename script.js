const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
const resetbtn = document.getElementById('resetbtn');

let currentPlayyer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''
];
let gameActive = true;
function checkWinner() {
    const winPattern = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows matching
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns matching
        [0, 4, 8], [2, 4, 6]          //diagonals matching
    ];
    for (const pattern of winPattern) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}
function checkDraw() {
    return !gameBoard.includes('');
}
function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') { return; }
    gameBoard[index] = currentPlayyer;
    document.getElementById(`cell${index}`).innerText = currentPlayyer;

    const winner = checkWinner();
    if (winner) {
        winnerDisplay.innerText = `Player ${winner} wins 🚩!`;
        gameActive = false;
    } else if (checkDraw()) {
        winnerDisplay.innerText = 'It\'s a draw 🌠!';
        gameActive = false;
    } else {
        currentPlayyer = currentPlayyer === 'X' ? 'O' : 'X';
    }
}
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''
    ];
    gameActive = true;
    currentPlayyer = 'X';
    winnerDisplay.innerText = '';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });
}
function createCell(index) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell${index}`;
    cell.addEventListener('click', () => handleClick(index));
    return cell;
}
for (let i = 0; i < 9; i++) {
    const cell = createCell(i);
    board.appendChild(cell);
}