const icons = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🥭', '🍍'];
let cards = [...icons, ...icons];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    moves = 0;
    matchedPairs = 0;
    document.getElementById('moves').textContent = moves;
    flippedCards = [];
    cards = shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner" data-icon="${icon}" onclick="flipCard(this)">
                <div class="card-front">❓</div>
                <div class="card-back">${icon}</div>
            </div>
        `;
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.parentElement.classList.contains('flip')) {
        card.parentElement.classList.add('flip');
        flippedCards.push(card);
    }
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    if (first.dataset.icon === second.dataset.icon) {
        matchedPairs++;

        // Add flower effect
        first.parentElement.classList.add('flower-effect');
        second.parentElement.classList.add('flower-effect');

        if (matchedPairs === icons.length) {
            setTimeout(() => alert('🎉 You Won! 🎉'), 300);
        }
    } else {
        first.parentElement.classList.remove('flip');
        second.parentElement.classList.remove('flip');
    }
    flippedCards = [];
}

startGame();
