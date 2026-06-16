// ---------------- SECURITY ----------------
const params = new URLSearchParams(window.location.search);
const team = params.get("team");
const code = params.get("code");

const teamCodes = {
    orion: "NEBULA7",
    polaris: "QUASAR4",
    cassiopeia: "PULSAR9",
    andromeda: "ORBIT2"
};

if (!team || teamCodes[team] !== code) {
    document.body.innerHTML = "<h2>🚫 Access Denied</h2>";
    throw new Error("blocked");
}

// ---------------- STATE ----------------
let saved = localStorage.getItem(team + "_m");
let current = saved ? parseInt(saved) : 0;

let stage = "intro";

// ---------------- CINEMATIC START ----------------
setTimeout(() => {
    stage = "login";
    render();
}, 4500);

// ---------------- RENDER ----------------
function render() {

    const app = document.getElementById("app");

    // INTRO
    if (stage === "intro") {
        app.innerHTML = `
            <div class="cinema">
                <h1>🛰 BLUE SKIES SPACE</h1>
                <p class="glow">MISSION CONTROL INITIALISING</p>
                <p class="fade">A deep space signal has been detected...</p>
                <p class="fade">Fragments are appearing across London...</p>
                <p class="pulse">RECOVER THE LOST SIGNAL</p>
            </div>
        `;
        return;
    }

    // LOGIN
    if (stage === "login") {
        app.innerHTML = `
            <div class="card">
                <h2>Mission Authentication</h2>
                <p>Team: ${team.toUpperCase()}</p>

                <input id="code" placeholder="Access code" />
                <br>
                <button onclick="auth()">Enter Mission</button>

                <p id="msg"></p>
            </div>
        `;
        return;
    }

    // COMPLETE
    if (current >= missions.length) {
        app.innerHTML = `
            <div class="cinema">
                <h1>🛰 SIGNAL RECONSTRUCTED</h1>
                <p class="glow">Transmission restored</p>
                <p class="pulse">RENDEZVOUS FOR DEBRIEF</p>
            </div>
        `;
        return;
    }

    // GAME
    let signal = Math.max(0, 100 - current * 20);

    app.innerHTML = `
        <div class="card">

            <h3>TEAM ${team.toUpperCase()}</h3>

            <p>Signal Strength: ${signal}%</p>
            <div class="signal-bar"></div>

            <h2>Checkpoint ${current + 1}</h2>
            <p>${missions[current].q}</p>

            <input id="a" placeholder="answer" />
            <br>
            <button onclick="check()">Submit</button>

            <p id="msg"></p>

        </div>
    `;
}

// ---------------- LOGIN ----------------
function auth() {
    const v = document.getElementById("code").value;
    if (v === teamCodes[team]) {
        stage = "game";
        render();
    } else {
        document.getElementById("msg").innerText = "Incorrect code";
    }
}

// ---------------- CHECK ANSWER ----------------
function check() {
    const v = document.getElementById("a").value.toLowerCase().trim();

    if (v === missions[current].a) {
        current++;
        localStorage.setItem(team + "_m", current);
        render();
    } else {
        document.getElementById("msg").innerText = "Signal mismatch";
    }
}

render();
