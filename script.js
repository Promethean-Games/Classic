/* General styles */
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #000;
    color: white;
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.menu-container, .app-container, .reset-container {
    width: 100%;
    max-width: 600px;
    text-align: center;
}

h1, h2 {
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
    margin: 10px;
    background-color: #d11111;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #7f0b0b;
}

.card-image {
    width: 100%;
    height: auto;
    max-height: 60vh;
    margin: 20px 0;
}

input.player-name {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid white;
    border-radius: 5px;
    background: black;
    color: white;
    width: calc(100% - 24px);
}

/* Score section */
.score-container table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.score-container th, .score-container td {
    padding: 10px;
    border: 1px solid white;
    text-align: center;
}

.score-container th {
    background-color: #d11111;
    color: white;
}

.score-adjust-buttons {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.score-adjust-buttons button {
    width: 30px;
    height: 30px;
    font-size: 16px;
    padding: 0;
    margin: 0;
    background-color: #d11111;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
}

.score-adjust-buttons button:hover {
    background-color: #7f0b0b;
}


