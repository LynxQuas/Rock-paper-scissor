const weapon = ["🪨", "📃", "✂️"];
let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const randomWeapon = Math.floor(Math.random() * 3);
    return weapon[randomWeapon];
}

function displaySelection(place, weapon) {
    place.textContent = weapon;
}

const computerWeapon = document.querySelector(".computer_weapon");
const playerWeapon = document.querySelector(".player_weapon");
const result = document.querySelector(".battle_result");

const clickHandler = function (e) {
    if (!e.target.classList.contains("btn")) return;

    const [playerSelection] = weapon.filter(
        (weapon) => weapon === e.target.textContent
    );

    const computerSelection = getComputerChoice();
    displaySelection(playerWeapon, playerSelection);
    displaySelection(computerWeapon, computerSelection);
    playRound(playerSelection, computerSelection);

    if (playerScore === 5) {
        displayResult("win");
    }
    if (computerScore === 5) {
        displayResult("lose");
    }
};

function displayResult(winOrLose) {
    result.classList.add(winOrLose);
    document.removeEventListener("click", clickHandler);
}

document.addEventListener("click", clickHandler);

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        result.textContent = `Tie ${playerSelection} , ${computerSelection}`;
        return;
    }

    if (
        (playerSelection === "🪨" && computerSelection === "📃") ||
        (playerSelection === "📃" && computerSelection === "✂️") ||
        (playerSelection === "✂️" && computerSelection === "🪨")
    ) {
        result.textContent = `You lose ${computerSelection} beats ${playerSelection}`;
        computerScore += 1;
        document.querySelector(".computer_score").textContent = computerScore;
        return;
    } else {
        playerScore += 1;
        document.querySelector(".player_score").textContent = playerScore;
        result.textContent = `You win ${playerSelection} beats ${computerSelection}`;
    }
}
