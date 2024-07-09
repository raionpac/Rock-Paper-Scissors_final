// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to each game choice button
    const choices = document.querySelectorAll('.choices button');
    choices.forEach(button => {
        button.addEventListener('click', () => {
            // Retrieve the player's choice based on the button clicked
            const playerChoice = button.getAttribute('aria-label').split(' ')[1].toLowerCase();
            playGame(playerChoice);
            playSound(playerChoice);
        });
    });
});

// Function to play the sound
function playSound(choice) {
    let soundFile;
    switch(choice) {
        case 'rock':
            soundFile = 'rock.wav';
            break;
        case 'paper':
            soundFile = 'paper.wav';
            break;
        case 'scissors':
            soundFile = 'scissors.wav';
            break;
    }
    if (soundFile) {
        const sound = new Audio(`assets/sounds/${soundFile}`); 
        sound.play();
    }
}

// Main function to handle the game logic
function playGame(playerChoice) {
    const computerChoice = getComputerChoice(); // Get the computer's choice
    const result = calculateResult(playerChoice, computerChoice); // Determine the game result
    displayResult(playerChoice, computerChoice, result); // Display the result
    updateScore(result); // Update the score based on the result
}

// Function to randomly generate the computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to calculate the game result
function calculateResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Tie";
    }
    const winningCombinations = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };
    return winningCombinations[playerChoice] === computerChoice ? 'Win' : 'Lose';
}

// Function to display the game result
function displayResult(playerChoice, computerChoice, result) {
    const playerDisplay = document.getElementById('playerChoiceImage');
    const computerDisplay = document.getElementById('computerChoiceImage');
    const resultDisplay = document.getElementById('resultDisplay');

    // Update the images for player and computer choices and make them visible
    playerDisplay.src = `assets/img/${playerChoice}.svg`;
    playerDisplay.style.display = 'block';

    computerDisplay.src = `assets/img/${computerChoice}.svg`;
    computerDisplay.style.display = 'block';

    // Update the result text and apply colour based on the result
    resultDisplay.textContent = `You ${result}! `;
    resultDisplay.classList.remove('greenText', 'redText'); // Remove previous result color classes
    if (result === 'Win') {
        resultDisplay.classList.add('greenText'); // Apply green text for a win
    } else if (result === 'Lose') {
        resultDisplay.classList.add('redText'); // Apply red text for a loss
    }
}

// Function to update the score
function updateScore(result) {
    let playerScore = parseInt(document.getElementById('playerScoreDisplay').textContent);
    let computerScore = parseInt(document.getElementById('computerScoreDisplay').textContent);

    // Increment the score based on the game result
    if (result === 'Win') {
        playerScore++;
    } else if (result === 'Lose') {
        computerScore++;
    }

    // Update the score display
    document.getElementById('playerScoreDisplay').textContent = playerScore.toString();
    document.getElementById('computerScoreDisplay').textContent = computerScore.toString();
}
