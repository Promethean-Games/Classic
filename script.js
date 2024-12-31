// Array holding the card images (from card1.png to card18.png)
const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.png`);
let shuffledDeck = shuffleDeck([...cards]);
let currentCardIndex = 0;

// Elements
const cardImage = document.getElementById("cardImage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const statusTable = document.getElementById("statusTable");

// Initialize the status table with "Hole 1" to "Hole 18"
function initStatusTable() {
    const headerRow = document.querySelector("thead tr");
    for (let i = 0; i < 18; i++) {
        const holeCell = document.createElement("th");
        holeCell.textContent = `Hole ${i + 1}`;
        headerRow.appendChild(holeCell);
    }

    // Create a row for the status check marks
    const statusRow = document.createElement("tr");
    for (let i = 0; i < 18; i++) {
        const statusCell = document.createElement("td");
        statusRow.appendChild(statusCell);
    }

    statusTable.appendChild(statusRow);
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
    const statusRow = statusTable.rows[0];
    const statusCell = statusRow.cells[index];
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
    const statusRow = statusTable.rows[0];
    for (let i = 0; i < statusRow.cells.length; i++) {
        statusRow.cells[i].innerHTML = ''; // Clear all check marks
    }
}

// Event Listeners
nextButton.addEventListener("click", showNextCard);
restartButton.addEventListener("click", restartDeck);

// Initialize table and show the first card
initStatusTable();
showNextCard();
