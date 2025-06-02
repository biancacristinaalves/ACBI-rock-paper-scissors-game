let player1Name = '';
let player2Name = '';
let rounds = 0;
let currentRound = 1;
let scores = { player1: 0, player2: 0 };
let numPlayers = 0;

const choiceImages = {
    rock: {
        player1: 'images/rock_player1.png',
        player2: 'images/rock_player2.png'
    },
    paper: {
        player1: 'images/paper_player1.png',
        player2: 'images/paper_player2.png'
    },
    scissors: {
        player1: 'images/scissors_player1.png',
        player2: 'images/scissors_player2.png'
    }
};

function startGame(players) {
    numPlayers = players;
    document.getElementById('menu').classList.add('d-none');
    document.getElementById('setup').classList.remove('d-none');

    const playerNamesDiv = document.getElementById('player-names');
    playerNamesDiv.innerHTML = '';

    const howToPlay = document.getElementById('howToPlay');
    if (howToPlay) howToPlay.style.display = 'none';

    if (players === 1) {
        playerNamesDiv.innerHTML = `
            <input type="text" id="player1" placeholder="Player Name 1" class="form-control mb-2" />
        `;
        player1Name = 'Player 1';
        player2Name = 'Computer';
    } else {
        playerNamesDiv.innerHTML = `
            <input type="text" id="player1" placeholder="Player Name 1" class="form-control mb-2" />
            <input type="text" id="player2" placeholder="Player Name 2" class="form-control mb-2" />
        `;
    }
}

function startRounds() {
    player1Name = document.getElementById('player1').value.trim() || 'Player 1';
    if (numPlayers === 2) {
        player2Name = document.getElementById('player2').value.trim() || 'Player 2';
    }
    rounds = parseInt(document.getElementById('rounds').value, 10);
    currentRound = 1;
    scores = { player1: 0, player2: 0 };

    document.getElementById('setup').classList.add('d-none');
    document.getElementById('game').classList.remove('d-none');
    document.getElementById('round-info').innerText = `Round ${currentRound}`;
    document.getElementById('player1-name').innerText = player1Name;
    document.getElementById('player2-name').innerText = player2Name;

    if (player2Name === 'Computer') {
        document.getElementById('player2-choice').style.display = 'none';
    } else {
        document.getElementById('player2-choice').style.display = 'none'; // começa escondido até player 1 jogar
    }

    document.getElementById('choices').classList.remove('d-none');
    document.getElementById('reset-button').classList.add('d-none');
    clearChoices();
}

function clearChoices() {
    document.getElementById('player1-image').innerHTML = '';
    document.getElementById('player2-image').innerHTML = '';
    document.getElementById('player1-choice').dataset.choice = '';
    document.getElementById('player2-choice').dataset.choice = '';
    document.getElementById('player1-choice').style.display = 'block';
    document.getElementById('player2-choice').style.display = 'none';
    document.getElementById('results').innerHTML = '';
}

function makeChoice(player, choice) {
    if (player === 1) {
        document.getElementById('player1-choice').dataset.choice = choice;
        document.getElementById('player1-image').innerHTML = `<img src="${choiceImages[choice].player1}" alt="${choice} Player 1" />`;
        document.getElementById('player1-choice').style.display = 'none';

        if (player2Name === 'Computer') {
            const choicesArray = ['rock', 'paper', 'scissors'];
            const randomChoice = choicesArray[Math.floor(Math.random() * choicesArray.length)];
            document.getElementById('player2-image').innerHTML = `<img src="${choiceImages[randomChoice].player2}" alt="${randomChoice} Computer" />`;
            determineWinner(randomChoice);
        } else {
            document.getElementById('player2-choice').style.display = 'block';
        }
    } else {
        document.getElementById('player2-choice').dataset.choice = choice;
        document.getElementById('player2-image').innerHTML = `<img src="${choiceImages[choice].player2}" alt="${choice} Player 2" />`;
        document.getElementById('player2-choice').style.display = 'none';
        determineWinner();
    }
}

function determineWinner(computerChoice = '') {
    const player1Choice = document.getElementById('player1-choice').dataset.choice;
    let player2Choice = '';

    if (player2Name === 'Computer') {
        player2Choice = computerChoice;
    } else {
        player2Choice = document.getElementById('player2-choice').dataset.choice;
    }

    let winnerText = '';
    if (player1Choice === player2Choice) {
        winnerText = "Draw!";
    } else if (
        (player1Choice === 'rock' && player2Choice === 'scissors') ||
        (player1Choice === 'paper' && player2Choice === 'rock') ||
        (player1Choice === 'scissors' && player2Choice === 'paper')
    ) {
        winnerText = `${player1Name} Won!`;
        scores.player1++;
    } else {
        winnerText = `${player2Name} Won!`;
        scores.player2++;
    }

    document.getElementById('results').innerHTML = `
        <p>${player1Name}: ${scores.player1} | ${player2Name}: ${scores.player2}</p>
        <div class="choice-images">
            <div>
                <h4>${player1Name} chose:</h4>
                <img src="${choiceImages[player1Choice].player1}" alt="${player1Choice} Player 1" />
            </div>
            <div>
                <h4>${player2Name} chose:</h4>
                <img src="${choiceImages[player2Choice].player2}" alt="${player2Choice} Player 2" />
            </div>
        </div>
        <h3>${winnerText}</h3>
    `;

    currentRound++;
    if (currentRound > rounds) {
        endGame();
    } else {
        setTimeout(() => {
            clearChoices();
            document.getElementById('round-info').innerText = `Round ${currentRound}`;
        }, 2000);
    }
}

function endGame() {
    let finalMessage = '';
    if (scores.player1 > scores.player2) {
        finalMessage = `${player1Name} wins the game! 🎉`;
    } else if (scores.player2 > scores.player1) {
        finalMessage = `${player2Name} wins the game! 🎉`;
    } else {
        finalMessage = "It's a tie game!";
    }

    document.getElementById('results').innerHTML += `<h2>${finalMessage}</h2>`;
    document.getElementById('reset-button').classList.remove('d-none');
    document.getElementById('choices').classList.add('d-none');
}

function resetGame() {
    currentRound = 1;
    scores = { player1: 0, player2: 0 };
    document.getElementById('results').innerHTML = '';
    document.getElementById('reset-button').classList.add('d-none');
    document.getElementById('menu').classList.remove('d-none');
    document.getElementById('game').classList.add('d-none');
    document.getElementById('setup').classList.add('d-none');

    const howToPlay = document.getElementById('howToPlay');
    if (howToPlay) howToPlay.style.display = 'block';
}
