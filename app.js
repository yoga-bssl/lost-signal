const params = new URLSearchParams(window.location.search);
const team = params.get("team");

const codes = {
    orion: "NEBULA7",
    polaris: "QUASAR4",
    cassiopeia: "PULSAR9",
    andromeda: "ORBIT2"
};

if (!team || !codes[team]) {
    document.body.innerHTML = "ACCESS DENIED";
}

let stage = "auth";
let currentNode = null;

setInterval(() => {
    currentNode = getActiveNode();
    render();
}, 1000);

function auth() {
    stage = "game";
    render();
}

function render() {

    const app = document.getElementById("app");

    if (stage === "auth") {
        app.innerHTML = `
            <div class="card">
                <h2>Mission Authentication</h2>
                <p>Team: ${team.toUpperCase()}</p>
                <button onclick="auth()">Enter Mission</button>
            </div>
        `;
        return;
    }

    if (!currentNode) {
        app.innerHTML = `
            <div class="card">
                <p>Searching for signal node...</p>
                <p>Move within range</p>
            </div>
        `;
        return;
    }

    processNode(currentNode, team);

    if (NODE_HISTORY.length >= NODES.length) {
        app.innerHTML = `
            <div class="cinema">
                <h1>SIGNAL RECONSTRUCTED</h1>
                <p>${decodeSignal()}</p>
                <p>Proceed to lunch node</p>
            </div>
        `;
        return;
    }

    app.innerHTML = `
        <div class="card">
            <h3>${currentNode.name}</h3>
            <p>${currentNode.instruction}</p>
            <p><b>Fragment:</b> ${currentNode.fragment}</p>
            <p><b>Signal:</b> ${SIGNAL.join("-")}</p>
        </div>
    `;
}

render();
