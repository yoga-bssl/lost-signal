let playerPos = null;

navigator.geolocation.watchPosition(pos => {
    playerPos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    };
});

function distance(a, b) {
    const R = 6371e3;
    const toRad = x => x * Math.PI / 180;

    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);

    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const x =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLng/2)**2;

    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

const ACTIVATION_RADIUS = 80;

function getActiveNode() {
    if (!playerPos) return null;

    return NODES.find(n => distance(playerPos, n) < ACTIVATION_RADIUS);
}

let SIGNAL = [];
let NODE_HISTORY = [];

function getField() {
    return JSON.parse(localStorage.getItem("signal_field") || "{}");
}

function processNode(node, team) {

    if (NODE_HISTORY.includes(node.id)) return;

    const field = getField();
    const state = field[node.id];

    let fragment = node.fragment;

    if (state && state.visits.length > 1) {
        fragment = fragment.split("").reverse().join("");
    }

    if (node.expectedAction === "append") SIGNAL.push(fragment);
    if (node.expectedAction === "reverse") SIGNAL.reverse();

    NODE_HISTORY.push(node.id);

    updateField(team, node.id, fragment);
}

function decodeSignal() {
    return SIGNAL.join("");
}
