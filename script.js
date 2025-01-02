const mainMenu = document.getElementById("mainMenu");
const gameContainer = document.getElementById("gameContainer");
const playerInputs = document.getElementById("playerInputs");
const addPlayerButton = document.getElementById("addPlayerButton");
const startGameButton = document.getElementById("startGameButton");
const restartButton = document.getElementById("restartButton");
const nextCardButton = document.getElementById("nextCardButton");
const resetPrompt = document.getElementById("resetPrompt");
const keepPlayersButton = document.getElementById("keepPlayersButton");
const clearAllButton = document.getElementById("clearAllButton");
const cardImage = document.getElementById("cardImage");
const scoreTable = document.getElementById("scoreTable");
const playerNamesRow = document.getElementById("playerNamesRow");
const currentHoleScoresRow = document.getElementById("currentHoleScoresRow");

let players = [];
let scores = [];
let shuffledDeck = [];
let currentCardIndex = 0;
let currentHole = 1;
const cards = Array.from({ length: 18 }, (_, i) => `card${i + 1}.png`);

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

addPlayerButton.addEventListener("click", () => {
    const playerInput = document.createElement("input");
    playerInput.type = "text";
    playerInput.placeholder = `Player ${players.length + 1}`;
    playerInputs.appendChild(playerInput);
});

startGameButton.addEventListener("click", () => {
    const playerInputsList = playerInputs.querySelectorAll("input");
    players = Array.from(playerInputsList).map(input => input.value || `Player ${players.length + 1}`);
    scores = players.map(() => Array(18).fill(0));
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    currentHole = 1;
    updateScoreTable();
    showNextCard();
    mainMenu.style.display = "none";
    gameContainer.style.display = "block";
});

nextCardButton.addEventListener("click", () => {
    if (currentHole < 18) {
        currentHole++;
        currentCardIndex++;
        showNextCard();
        updateScoreTable();
    }
});

restartButton.addEventListener("click", () => {
    resetPrompt.style.display = "block";
    gameContainer.style.display = "none";
});

keepPlayersButton.addEventListener("click", () => {
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    currentHole = 1;
    scores = players.map(() => Array(18).fill(0));
    updateScoreTable();
    resetPrompt.style.display = "none";
    gameContainer.style.display = "block";
    showNextCard();
});

clearAllButton.addEventListener("click", () => {
    players = [];
    scores = [];
    playerInputs.innerHTML = "";
    resetPrompt.style.display = "none";
    mainMenu.style.display = "block";
});

function showNextCard() {
    if (currentCardIndex < shuffledDeck.length) {
        cardImage.src = shuffledDeck[currentCardIndex];
    }
}

function updateScoreTable() {
    playerNamesRow.innerHTML = players.map(player => `<th>${player}</th>`).join("");
    currentHoleScoresRow.innerHTML = players.map(
        (_, i) => `<td>${scores[i][currentHole - 1]}</td>`
    ).join("");

    currentHoleScoresRow.querySelectorAll("td").forEach((td, i) => {
        const scoreContainer = document.createElement("div");
        const addButton = document.createElement("button");
        const subtractButton = document.createElement("button");

        addButton.textContent = "+1";
        subtractButton.textContent = "-1";

        addButton.addEventListener("click", () => {
            scores[i][currentHole - 1]++;
            updateScoreTable();
        });

        subtractButton.addEventListener("click", () => {
            scores[i][currentHole - 1]--;
            updateScoreTable();
        });

        scoreContainer.appendChild(addButton);
        scoreContainer.appendChild(subtractButton);
        td.innerHTML = `${scores[i][currentHole - 1]}`;
        td.appendChild(scoreContainer);
    });
}

resetPrompt.style.display = "none";
