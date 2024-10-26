let tap = new Audio("tap.mp3");
let win = new Audio("win.mp3");
let gameOver = new Audio("gameover.mp3");
let bgMusic = new Audio("bgmusic.mp3");
let turn = 'X';

bgMusic.loop = true;
bgMusic.volume = 0.2;

const changePlayer = () => {
    return turn === "X" ? "O" : "X";
};

const checkVictory = () => {
    let boxTexts = document.getElementsByClassName('text');
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let gameWon = false;

    winConditions.forEach(condition => {
        let [a, b, c] = condition;
        if (boxTexts[a].innerText !== '' &&
            boxTexts[a].innerText === boxTexts[b].innerText &&
            boxTexts[a].innerText === boxTexts[c].innerText) {
            showNotification(`Player ${boxTexts[a].innerText} Wins!`);
            win.play();
            disableBoxes();
            gameWon = true;
            setTimeout(resetGame, 1000);
        }
    });

    if (!gameWon) {
        const isDraw = Array.from(boxTexts).every(box => box.innerText !== '');
        if (isDraw) {
            showNotification("It's a Draw!");
            gameOver.play();
            disableBoxes();
            setTimeout(resetGame, 1000);
        }
    }
};

const showNotification = (message) => {
    const notificationElement = document.getElementById('notification');
    notificationElement.innerText = message;
    notificationElement.style.display = 'block';
    setTimeout(() => notificationElement.style.display = 'none', 1000);
};

const disableBoxes = () => {
    Array.from(document.getElementsByClassName('box')).forEach(box => {
        box.style.pointerEvents = 'none';
    });
};

const resetGame = () => {
    Array.from(document.getElementsByClassName('text')).forEach(text => {
        text.innerText = '';
    });
    Array.from(document.getElementsByClassName('box')).forEach(box => {
        box.style.pointerEvents = 'auto';
    });
    turn = 'X';
};

let box = document.getElementsByClassName("box");
Array.from(box).forEach(element => {
    let text = element.querySelector('.text');
    element.addEventListener('click', () => {    
        if (text.innerText === '') {
            text.innerText = turn;
            turn = changePlayer();
            tap.play();
            bgMusic.play();
            checkVictory();
        }
    });
});
