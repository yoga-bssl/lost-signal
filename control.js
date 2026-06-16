function render() {

    const board = document.getElementById("board");

    board.innerHTML = NODES.map(n => `
        <div class="panel">
            <b>${n.name}</b>
            <div>Fragment: ${n.fragment}</div>
        </div>
    `).join("");
}

setInterval(render, 1500);
render();
