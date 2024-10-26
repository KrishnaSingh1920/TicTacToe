let tap = new Audio("tap.mp3");
let win = new Audio("win.mp3");
let gameOver = new Audio("gameover.mp3");
let bgMusic = new Audio("bgmusic.mp3");
let turn = 'X';

// Play background music on loop
bgMusic.loop = true; 
bgMusic.volume = 0.2; // Adjust volume if necessary
bgMusic.play();

const changePlayer = () => {
    return turn === "X" ? "O" : "X";
};

const checkVictory = () => {
    let boxTexts = document.getElementsByClassName('text');
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    winConditions.forEach(condition => {
        let [a, b, c] = condition;
        if (boxTexts[a].innerText !== '' &&
            boxTexts[a].innerText === boxTexts[b].innerText &&
            boxTexts[a].innerText === boxTexts[c].innerText) {
            showNotification(`Player ${boxTexts[a].innerText} Wins!`); // Show winner
            win.play();
            setTimeout(resetGame, 2000); // Wait 2 seconds before resetting
        }
    });

    const isDraw = Array.from(boxTexts).every(box => box.innerText !== '');
    if (isDraw) {
        showNotification("It's a Draw!");
        gameOver.play(); // Play game over sound
        setTimeout(resetGame, 2000); // Wait 2 seconds before resetting
    }
};

const showNotification = (message) => {
    const notificationElement = document.getElementById('notification');
    notificationElement.innerText = message; // Set the notification message
    notificationElement.style.display = 'block'; // Show the notification
    setTimeout(() => notificationElement.style.display = 'none', 2000); // Hide after 2 seconds
};

const resetGame = () => {
    Array.from(document.getElementsByClassName('text')).forEach(text => {
        text.innerText = ''; // Clear text in each box
    });
    turn = 'X'; // Reset turn to 'X'
};

// Game box click events
let box = document.getElementsByClassName("box");
Array.from(box).forEach(element => {
    let text = element.querySelector('.text');
    element.addEventListener('click', () => {    
        if (text.innerText === '') {
            text.innerText = turn;
            turn = changePlayer();
            tap.play();
            checkVictory();
        }
    });
});
