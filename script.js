// Array holding the card images (from card1.jpg to card18.jpg)
const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.jpg`);
let shuffledDeck = shuffleDeck([...cards]);
let currentCardIndex = 0;

// Elements
const cardImage = document.getElementById("cardImage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const statusTable = document.getElementById("statusTable");

// Initialize the status table
function initStatusTable() {
    for (let i = 0; i < 18; i++) {
        const row = document.createElement("tr");
        const holeCell = document.createElement("td");
        const statusCell = document.createElement("td");

        holeCell.textContent = `Hole ${i + 1}`;
        statusCell.innerHTML = ''; // Initially, no check marks.

        row.appendChild(holeCell);
        row.appendChild(statusCell);
        statusTable.appendChild(row);
    }
}

// Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
    }
    return deck;
}

// Show the next card
function showNextCard() {
    if (currentCardIndex < shuffledDeck.length) {
        cardImage.src = shuffledDeck[currentCardIndex];
        updateCompletionStatus(currentCardIndex);
        currentCardIndex++;
    } else {
        alert("You've gone through all the cards!");
    }
}

// Update completion status in the table
function updateCompletionStatus(index) {
    const row = statusTable.rows[index];
    const statusCell = row.cells[1];
    statusCell.innerHTML = '<span class="checkmark">✔️</span>';
}

// Restart the deck (shuffle and reset)
function restartDeck() {
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    showNextCard();
    resetCompletionStatus();
}

// Reset all completion statuses
function resetCompletionStatus() {
    const rows = statusTable.rows;
    for (let i = 0; i < rows.length; i++) {
        rows[i].cells[1].innerHTML = ''; // Clear all check marks
    }
}

// Event Listeners
nextButton.addEventListener("click", showNextCard);
restartButton.addEventListener("click", restartDeck);

// Initialize table and show the first card
initStatusTable();
showNextCard();
