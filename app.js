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
}
];

let currentMission = 0;

function showMission() {

    if (currentMission >= missions.length) {
        document.getElementById("game").innerHTML =
            "<h2>Mission Complete 🚀</h2>";
        return;
    }

    document.getElementById("game").innerHTML = `
        <h2>Checkpoint ${currentMission + 1}</h2>

        <p>${missions[currentMission].question}</p>

        <input id="answer">

        <br><br>

        <button onclick="checkAnswer()">
            Submit
        </button>

        <p id="message"></p>
    `;
}

function checkAnswer() {

    let answer =
        document.getElementById("answer")
        .value
        .toLowerCase();

    if (answer === missions[currentMission].answer) {

        currentMission++;

        showMission();

    } else {

        document.getElementById("message")
            .innerText =
            "Incorrect. Try again.";

    }

}

showMission();
