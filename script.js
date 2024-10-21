let currentRoom = 'main-room';
let timer;
let timeLeft = 600;
let lockerPuzzleSolved = false;
let skeletonPuzzleSolved = false;
let paintingPuzzleSolved = false;
let hallwayPuzzleSolved = false;
let basementPuzzleSolved = false;
let atticPuzzleSolved = false;
let keyFound = false;
let allPuzzlesSolved = false;
let cluesFound = [];

// DOM content loaded event
document.addEventListener('DOMContentLoaded', function () {
    // Show the start screen initially
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
});

// Start game function
function startGame() {
    // Hide the start screen and show the game container
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    // Reset the game state for a new game
    resetGameState();

    // Start the timer
    startTimer();

    // Show the initial room
    goToRoom(currentRoom);
    updateProgress();
}

// Room navigation function
function goToRoom(room) {
    if (room === 'hallway' && !keyFound) {
        alert("The hallway door is locked. Find the key in the washroom first.");
        return;
    }

    document.querySelectorAll('.room').forEach(r => r.style.display = 'none');
    document.getElementById(room).style.display = 'block';
    currentRoom = room;

    if (room === 'hallway') {
        alert("Boba ghost is around the corner...");
    }
}

// Timer function
function startTimer() {
    clearInterval(timer); // Clear any existing timer
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! The Boba ghost caught you. You are now its meal!");
            restartGame();
        } else {
            timeLeft--;
            document.getElementById('timer').innerText = 'Time Left: ' + formatTime(timeLeft);
        }
    }, 1000);
}

// Format time function
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Reset game state function
function resetGameState() {
    currentRoom = 'main-room';
    timeLeft = 600;
    lockerPuzzleSolved = false;
    skeletonPuzzleSolved = false;
    paintingPuzzleSolved = false;
    hallwayPuzzleSolved = false;
    basementPuzzleSolved = false;
    atticPuzzleSolved = false;
    keyFound = false;
    allPuzzlesSolved = false;
    cluesFound = [];

    document.getElementById('progress').innerHTML = '';
    document.getElementById('timer').innerText = 'Time Left: 10:00';
    document.getElementById('exit-button').style.display = 'none'; // Hide exit button
}

// Update progress function
function updateProgress() {
    const progressDisplay = document.getElementById('progress');
    const cluesList = cluesFound.map(clue => `<li>${clue}</li>`).join('');
    progressDisplay.innerHTML = `
        <h3>Progress:</h3>
        <ul>${cluesList}</ul>
        <p>Puzzles Solved: ${lockerPuzzleSolved && skeletonPuzzleSolved && paintingPuzzleSolved && hallwayPuzzleSolved && basementPuzzleSolved && atticPuzzleSolved ? 'All' : 'Some'}</p>
    `;

    // Show exit button if all puzzles are solved
    allPuzzlesSolved = lockerPuzzleSolved && skeletonPuzzleSolved && paintingPuzzleSolved && hallwayPuzzleSolved && basementPuzzleSolved && atticPuzzleSolved;
    document.getElementById('exit-button').style.display = allPuzzlesSolved ? 'block' : 'none';
}

// Game interaction functions
function checkBottle() {
    openPuzzleDialog("What has keys but can't open locks?");
}

function inspectSkeleton() {
    alert("The skeleton is missing a rib bone. Maybe it's in the basement?");
}

function inspectPainting() {
    if (!paintingPuzzleSolved) {
        openPuzzleDialog("What has a face and two hands but no arms or legs?");
    } else {
        alert("You already solved the painting puzzle.");
    }
}

function checkEasel() {
    alert("Nothing unusual here.");
}

function searchBookshelf() {
    openPuzzleDialog("I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?");
}

function inspectStudyTable() {
    alert("The table has a dusty old map, but nothing else of interest.");
}

function inspectMirror() {
    if (!keyFound) {
        alert("You found a key behind the mirror! This might open the hallway door.");
        keyFound = true;
        cluesFound.push("Key from Washroom");
        updateProgress();
    } else {
        alert("The mirror is cracked and eerie.");
    }
}

function checkToilet() {
    alert("Nothing unusual here.");
}

function inspectTable() {
    alert("An old, creaky table with nothing useful.");
}

function checkKitchen() {
    openPuzzleDialog("I can be hot, I can be cold, I can run and be still. What am I?");
}

function hallwayInteract() {
    if (!hallwayPuzzleSolved) {
        openPuzzleDialog("I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?");
    } else {
        alert("The lights are flickering.");
    }
}

function interactBasement() {
    if (!basementPuzzleSolved) {
        openPuzzleDialog("I am an odd number. Take away a letter, I become even. Who am I?");
    } else {
        alert("There is a rib bone lying on the floor.");
    }
}

function interactAttic() {
    if (!atticPuzzleSolved) {
        openPuzzleDialog("The more you take, the more you leave behind. What am I?");
    } else {
        alert("You already solved the attic puzzle.");
    }
}

function openPuzzleDialog(riddle) {
    document.getElementById('puzzle-text').innerText = riddle;
    document.getElementById('puzzle-dialog').style.display = 'block';
}

// Check puzzle answer function
function checkPuzzleAnswer() {
    const answer = document.getElementById('puzzle-input').value.toLowerCase().trim(); // Trim whitespace
    let puzzleSolved = false; // Flag to track if the puzzle was solved

    switch (currentRoom) {
        case 'science-lab':
            if (answer === 'keyboard') {
                puzzleSolved = true;
                lockerPuzzleSolved = true;
                cluesFound.push("Clue in Science Lab");
            }
            break;
        case 'art-room':
            if (answer === 'clock') {
                puzzleSolved = true;
                paintingPuzzleSolved = true;
                cluesFound.push("Clue in Art Room");
            }
            break;
        case 'library':
            if (answer === 'map') {
                puzzleSolved = true;
                lockerPuzzleSolved = true;
                cluesFound.push("Clue in Library");
            }
            break;
        case 'hallway':
            if (answer === 'echo') {
                puzzleSolved = true;
                hallwayPuzzleSolved = true;
                cluesFound.push("Hallway Clue");
            }
            break;
        case 'basement':
            if (answer === 'seven') {
                puzzleSolved = true;
                basementPuzzleSolved = true;
                cluesFound.push("Clue in Basement");
            }
            break;
        case 'attic':
            if (answer === 'footsteps') {
                puzzleSolved = true;
                atticPuzzleSolved = true;
                cluesFound.push("Clue in Attic");
            }
            break;
        case 'cafeteria':
            if (answer === 'water') {
                puzzleSolved = true;
                paintingPuzzleSolved = true;
                cluesFound.push("Clue in Cafeteria");
            }
            break;
        default:
            break;
    }

    // Handle the result of the answer check
    if (puzzleSolved) {
        alert("Puzzle solved! You found a clue!");
    } else {
        alert("Wrong answer! Try again.");
        timeLeft -= 60; // Subtract 1 minute for wrong answer
    }

    document.getElementById('puzzle-dialog').style.display = 'none';
    updateProgress();
    checkWinningCondition();
}

// Check winning condition function
function checkWinningCondition() {
    allPuzzlesSolved = lockerPuzzleSolved && skeletonPuzzleSolved && paintingPuzzleSolved && hallwayPuzzleSolved && basementPuzzleSolved && atticPuzzleSolved;
    
    // Check for hallway puzzle win condition
    if (hallwayPuzzleSolved) {
        alert("Congratulations! You've escaped the haunted high school!");
        if (confirm("Do you want to play again?")) {
            restartGame(); // Restart the game if the player chooses to play again
        } else {
            alert("Thanks for playing! Goodbye!");
            resetGameState(); // Reset game state for future play
        }
        return; // Exit the function after handling the win
    }

    if (allPuzzlesSolved) {
        alert("You've solved all puzzles!");
        document.getElementById('exit-button').style.display = 'block'; // Show exit button when all puzzles are solved
    }
}

// Restart game function
function restartGame() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    clearInterval(timer);
    resetGameState();
}

// Exit game function
function exitGame() {
    alert("You've escaped! Great job!");
    restartGame();
}
