const teams = ["orion", "polaris", "cassiopeia", "andromeda"];

function load(team) {
    let d = localStorage.getItem(team + "_m");
    return d ? parseInt(d) : 0;
}

function status(n) {
    if (n >= 5) return "COMPLETE";
    if (n >= 3) return "STABLE";
    if (n >= 1) return "DETECTED";
    return "NO SIGNAL";
}

function render() {

    const board = document.getElementById("board");

    let html = "";

    teams.forEach(t => {
        let p = load(t);

        html += `
            <div class="panel">
                <span class="live-dot"></span>
                <b>${t.toUpperCase()}</b>
                <div>Checkpoint: ${p}/5</div>
                <div>Status: ${status(p)}</div>
            </div>
        `;
    });

    board.innerHTML = html;
}

setInterval(render, 1200);
render();
