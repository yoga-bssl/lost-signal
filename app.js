// ----------------------------
// TEAM SETUP
// ----------------------------
const params = new URLSearchParams(window.location.search);
const team = params.get("team") || "unknown";

// ----------------------------
// MISSIONS
// ----------------------------
const missions = [
    {
        question: "Which planet rotates on its side?",
        answer: "uranus"
    },
    {
        question: "Which moon of Saturn has methane lakes?",
        answer: "titan"
    },
    {
        question: "What molecule is H₂O?",
        answer: "water"
    },
    {
        question: "Which famous telescope discovered thousands of exoplanets?",
        answer: "kepler"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "mars"
    }
];

// ----------------------------
// LOAD SAVED PROGRESS
// ----------------------------
let saved = localStorage.getItem(team + "_mission");
let currentMission = saved ? parseInt(saved) : 0;

// ----------------------------
// RENDER FUNCTION
// ----------------------------
function render() {

    const game = document.getElementById("game");

    let signal = Math.max(0, 100 - currentMission * 20);

    if (currentMission >= missions.length) {
        game.innerHTML = `
            <h2>Mission Complete 🚀</h2>
            <p>Signal fully recovered.</p>
            <p>Proceed to Mission Debrief (lunch).</p>
        `;
        return;
    }

    game.innerHTML = `
        <h2>Team: ${team.toUpperCase()}</h2>

        <p>Signal Strength: ${signal}%</p>

        <h3>Checkpoint ${currentMission + 1}</h3>

        <p>${missions[currentMission].question}</p>

        <input id="answer" placeholder="Enter answer..." />

        <br>

        <button onclick="check()">Submit</button>

        <p id="msg"></p>
    `;
}

// ----------------------------
// ANSWER CHECK
// ----------------------------
function check() {

    const input = document
        .getElementById("answer")
        .value
        .toLowerCase()
        .trim();

    if (input === missions[currentMission].answer) {

        currentMission++;

        localStorage.setItem(team + "_mission", currentMission);

        render();

    } else {

        document.getElementById("msg").innerText =
            "Incorrect signal. Try again.";

    }
}

// ----------------------------
// START GAME
// ----------------------------
render();
