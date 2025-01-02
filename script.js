// Array holding the card images (from card1.jpg to card18.jpg) const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.jpg`); let shuffledDeck = shuffleDeck([...cards]); let currentCardIndex = 0;

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

// Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Add a new player
addPlayerButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "player-name";
    input.placeholder = "Enter player name";
    playerInputs.appendChild(input);
});

// Start the game
startGameButton.addEventListener("click", () => {
    players = [...document.querySelectorAll(".player-name")].map(input => input.value || "Player");
    scores = players.map(() => Array(18).fill(0)); // Reset scores
    mainMenu.style.display = "none";
    gameContainer.style.display = "block";
    currentCardIndex = 0;
    currentHole = 1;
    shuffledDeck = shuffleDeck([...cards]);
    updateScoreTable();
    showNextCard();
});

// Show next card function showNextCard() { if (currentCardIndex < shuffledDeck.length) { cardImage.src = shuffledDeck[currentCardIndex]; currentCardIndex++; currentHole++; updateScoreTable(); } else { alert("You've completed all the cards!"); } }

// Update the score table
function updateScoreTable() {
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Player</th>
                ${Array.from({ length: currentHole }, (_, i) => `<th>Hole ${i + 1}</th>`).join("")}
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${players.map((player, i) => `
                <tr>
                    <td>${player}</td>
                    ${Array.from({ length: currentHole }, (_, j) => `
                        <td>
                            <div class="score-adjust-buttons">
                                <button onclick="adjustScore(${i}, ${j}, -1)">-</button>
                                <span>${scores[i][j]}</span>
                                <button onclick="adjustScore(${i}, ${j}, 1)">+</button>
                            </div>
                        </td>
                    `).join("")}
                    <td>${scores[i].reduce((sum, score) => sum + score, 0)}</td>
                </tr>
            `).join("")}
        </tbody>
    `;
    scoreContainer.innerHTML = "";
    scoreContainer.appendChild(table);
}

// Adjust the score
function adjustScore(playerIndex, holeIndex, change) {
    scores[playerIndex][holeIndex] += change;
    updateScoreTable();
}

// Restart the deck
restartButton.addEventListener("click", () => {
    console.log("Restart button clicked");
    resetPrompt.style.display = "block";
    gameContainer.style.display = "none";
});

// Reset prompt buttons
keepPlayersButton.addEventListener("click", () => {
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    currentHole = 1;
    scores = players.map(() => Array(18).fill(0)); // Reset scores to zero
    updateScoreTable();
    resetPrompt.style.display = "none";
    gameContainer.style.display = "block";
    showNextCard();
});

clearAllButton.addEventListener("click", () => {
    players = [];
    scores = [];
    playerInputs.innerHTML = ""; // Clear player input fields
    mainMenu.style.display = "block";
    resetPrompt.style.display = "none";
    gameContainer.style.display = "none";
});

// Event Listeners
nextButton.addEventListener("click", showNextCard);
restartButton.addEventListener("click", restartDeck);

// Initialize first card
function initialize() {
    showNextCard();
}
initialize();



