const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    return gameBoard.includes('') ? null : 'T';
};

const handleClick = (index) => {
    if (gameEnded || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    
    const winner = checkWinner();
    if (winner) {
        if (winner === 'T') {
            message.textContent = "It's a Tie!";
        } else {
            message.textContent = `${winner} wins!`;
        }
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `${currentPlayer}'s Turn`;
    }
};

const handleCellClick = (event) => {
    const index = Array.from(cells).indexOf(event.target);
    handleClick(index);
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;
    currentPlayer = 'X';
    message.textContent = "X's Turn";
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
