// Array holding the card images (from card1.png to card18.png)
const cards = Array.from({ length: 18 }, (_, i) => `images/card${i + 1}.png`);
let shuffledDeck = shuffleDeck([...cards]);
let currentCardIndex = 0;

// Elements
const cardImage = document.getElementById("cardImage");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

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
        currentCardIndex++;
    } else {
        alert("GAME OVER");
    }
}

// Restart the deck (shuffle and reset)
function restartDeck() {
    shuffledDeck = shuffleDeck([...cards]);
    currentCardIndex = 0;
    showNextCard();
}

// Event Listeners
nextButton.addEventListener("click", showNextCard);
restartButton.addEventListener("click", restartDeck);

// Initialize by showing the first card
showNextCard();


