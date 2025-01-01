let players = [];
let scores = [];
let currentHole = 1;

// Elements
const mainMenu = document.getElementById("mainMenu");
const playerInputs = document.getElementById("playerInputs");
const addPlayerButton = document.getElementById("addPlayerButton");
const startGameButton = document.getElementById("startGameButton");
const gameContainer = document.getElementById("gameContainer");
const cardImage = document.getElementById("cardImage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const scoreContainer = document.getElementById("scoreContainer");
const resetPrompt = document.getElementById("resetPrompt");
const keepPlayersButton = document.getElementById("keepPlayersButton");
const clearAllButton = document.getElementById("clearAllButton");

// Deck logic
const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.png`);
let shuffledDeck = shuffleDeck([...cards]);
let currentCardIndex = 0;

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Add player
addPlayerButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "player-name";
    input.placeholder = "Enter player name";
    playerInputs.appendChild(input);
});

// Start game
startGameButton.addEventListener("click", () => {
    players = [...document.querySelectorAll(".player-name")].map(input => input.value || "Player");
    scores = players.map(() => Array(18).fill(0));
    mainMenu.style.display = "none";
    gameContainer.style.display = "block";
    updateScoreTable();
    showNextCard();
});

// Show next card
function showNextCard() {
    if (currentCardIndex < shuffledDeck.length) {
        cardImage.src = shuffledDeck[currentCardIndex];
        currentCardIndex++;
        currentHole++;
        resetHoleScores();
        updateScoreTable();
    } else {
        alert("You've completed all the cards!");
    }
}

// Reset hole scores
function resetHoleScores() {
    players.forEach((_, i) => scores[i][currentHole - 1] = 0);
}

// Update score table
function updateScoreTable() {
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Player</th>
                <th>Hole ${currentHole}</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${players.map((player, i) => `
                <tr>
                    <td>${player}</td>
                    <td>${scores[i][currentHole - 1]}</td>
                    <td>${scores[i].reduce((sum, score) => sum + score, 0)}</td>
                </tr>
            `).join("")}
        </tbody>
    `;
    scoreContainer.innerHTML = "";
    scoreContainer.appendChild(table);
}

// Restart deck
restartButton.addEventListener("click", () => {
    resetPrompt.style.display = "block";
    gameContainer.style.display = "none";
});

// Reset prompt buttons
keepPlayersButton.addEventListener("click", () => {
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    currentHole = 1;
    resetHoleScores();
    updateScoreTable();
    resetPrompt.style.display = "none";
    gameContainer.style.display = "block";
});

clearAllButton.addEventListener("click", () => {
    players = [];
    scores = [];
    mainMenu.style.display = "block";
    resetPrompt.style.display = "none";
});

// Initialize first card
function initialize() {
    showNextCard();
}
initialize();
