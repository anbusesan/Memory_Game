const icons = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🥭', '🍍'];
let cards = [...icons, ...icons];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let timeLeft = 60;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    moves = 0;
    matchedPairs = 0;
    timeLeft = 60;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = timeLeft + 's';
    flippedCards = [];
    cards = shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner" data-icon="${icon}" data-id="${index}" onclick="flipCard(this)">
                <div class="card-front">❓</div>
                <div class="card-back">${icon}</div>
            </div>
        `;
        gameBoard.appendChild(card);
    });

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.parentElement.classList.contains('flip')) {
        card.parentElement.classList.add('flip');
        flippedCards.push(card);
    }
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    
    if (first.dataset.icon === second.dataset.icon && first.dataset.id !== second.dataset.id) {
        matchedPairs++;
        first.parentElement.classList.add('flower-effect');
        second.parentElement.classList.add('flower-effect');

        if (matchedPairs === icons.length) {
            clearInterval(timer);
            setTimeout(() => alert('🎉 You Won! 🎉'), 500);
        }
    } else {
        setTimeout(() => {
            first.parentElement.classList.remove('flip');
            second.parentElement.classList.remove('flip');
        }, 500);
    }
    flippedCards = [];
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft + 's';
    } else {
        clearInterval(timer);
        alert('⏳ Time Up! Try Again.');
        startGame();
    }
}

startGame();
