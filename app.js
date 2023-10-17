$(document).ready(function () {

    //grab elements to change
    const board = $("#game-board");
    const displayMessage = $("#message");
    const resetButton = $("#reset");

    //Create matrix to represent board
    const startBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    /**
     * Generates the board using nested for loop
     *
     * 
     */
    function createBoard() {
        board.empty(); // Use .empty() to clear the board
        for (let row = 0; row < startBoard.length; row++) {
            for (let col = 0; col < startBoard[row].length; col++) {
                const cellElement = document.createElement("div");
                cellElement.classList.add("square");
                //store both the row and column as strings in our id so that we can
                //access it in our makeMove
                cellElement.id = row.toString() + col.toString();
                console.log(cellElement.id);
                cellElement.addEventListener("click", makeMove);
                board.append(cellElement);
            }
        }
    }

    createBoard();

    //Choose a random player by making a list of two
    let players = ["X", "O"];
    //Random initialization
    let currentPlayer = players[Math.floor(Math.random() * 2)];
    //clone board to keep track
    const boardState = startBoard.slice();

    /**
     * Makes a move in the game when a cell is clicked.
     *
     * 
     */
    function makeMove(e) {
        const cellIndex = e.target.id;
        const row = cellIndex[0];
        const col = cellIndex[1];

        // Check if the cell is empty; if so, allow the move
        if (boardState[row][col] === "") {
            boardState[row][col] = currentPlayer;
            e.target.text = currentPlayer;

            e.target.classList.add(currentPlayer === "X" ? "cross" : "circle");

            // Check for a win or a draw
            if (checkWin(currentPlayer)) {
                displayMessage.text(`${currentPlayer} wins!`);
                //Audio for winner!
                var audio = new Audio('win.mp3');
                audio.play();
            } else if (boardState.every(row => row.every(cell => cell !== ""))) {
                displayMessage.text("It's a draw!");
            } else {
                // Change turns
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                displayMessage.text(`It's ${currentPlayer}'s turn.`);
            }

        }
    }

    /**
     * Checks whether or not X or O has a winning combo
     *
     * 
     */
    function checkWin(player) {
        //loop through all rows
        for (let row = 0; row < startBoard.length; row++) {
            if (
                boardState[row][0] === player &&
                boardState[row][1] === player &&
                boardState[row][2] === player
            ) {
                return true;
            }
        }

        //loop through all columns
        for (let col = 0; col < startBoard[0].length; col++) {
            if (
                boardState[0][col] === player &&
                boardState[1][col] === player &&
                boardState[2][col] === player
            ) {
                return true;
            }
        }

        //hardcoded diagnal
        if (
            (boardState[0][0] === player && boardState[1][1] === player && boardState[2][2] === player) ||
            (boardState[0][2] === player && boardState[1][1] === player && boardState[2][0] === player)
        ) {
            return true;
        }

        return false;
    }

    /**
     * resets board
     *
     * 
     */
    resetButton.on("click", () => {
        for (let row = 0; row < startBoard.length; row++) {
            for (let col = 0; col < startBoard[row].length; col++) {
                boardState[row][col] = "";
            }
        }
        currentPlayer = players[Math.floor(Math.random() * 2)];
        displayMessage.text(`It's ${currentPlayer}'s turn.`);
        createBoard();
    });

    displayMessage.text(`It's ${currentPlayer}'s turn.`);
});
