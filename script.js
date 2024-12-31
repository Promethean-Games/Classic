// Array holding the card images (from card1.png to card18.png)
const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.png`);
let shuffledDeck = shuffleDeck([...cards]);
let currentCardIndex = 0;

// Elements
const cardImage = document.getElementById("cardImage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const holeHeader = document.getElementById("holeHeader");
const checkmarkRow = document.getElementById("checkmarkRow");

// Initialize the status table with "Hole 1" to "Hole 18"
function initStatusTable() {
    // Create the hole headers
    for (let i = 0; i < 18; i++) {
        const holeCell = document.createElement("th");
        holeCell.textContent = `Hole ${i + 1}`;
        holeHeader.appendChild(holeCell);
    }

    // Create a row for the status check marks
    for (let i = 0; i < 18; i++) {
        const statusCell = document.createElement("td");
        checkmarkRow.appendChild(statusCell);
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
    const statusCell = checkmarkRow.cells[index];
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
    for (let i = 0; i < checkmarkRow.cells.length; i++) {
        checkmarkRow.cells[i].innerHTML = ''; // Clear all check marks
    }
}

// Event Listeners
nextButton.addEventListener("click", showNextCard);
restartButton.addEventListener("click", restartDeck);

// Initialize table and show the first card
initStatusTable();
showNextCard();
